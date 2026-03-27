#!/usr/bin/env node
/**
 * 업체별/날짜별 메타광고 리포트를 노션에 업로드
 *
 * 구조:
 *   메타광고 자동 수집 (부모 페이지)
 *   ├── 미친특가_카이
 *   │   ├── 2026-03-24 일일 리포트
 *   │   ├── 2026-03-24 주간 리포트
 *   │   └── ...
 *   ├── 독점마켓
 *   │   └── 2026-03-24 주간 리포트
 *   └── ...
 *
 * 사용법:
 *   node scripts/upload_notion_report.js --client "미친특가_카이" --report-dir "output/meta-ad/미친특가_카이/일일" --label "일일"
 *   node scripts/upload_notion_report.js --client "미친특가_카이" --report-dir "output/meta-ad/미친특가_카이/주간" --label "주간"
 *   node scripts/upload_notion_report.js --all   # clients.json 전체 업체 업로드
 */

require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
// 메타광고 리포트는 ROAS 페이지에 업로드
const PARENT_PAGE_ID = process.env.NOTION_PAGE_ID_ROAS || process.env.NOTION_PAGE_ID_MARKETING;
const PROJECT_ROOT = path.dirname(__dirname);

// ── 마크다운 → 노션 블록 변환 ──

function parseMarkdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let inCodeBlock = false;
  let codeContent = [];
  let codeLanguage = '';
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim() || 'plain text';
        codeContent = [];
      } else {
        inCodeBlock = false;
        blocks.push({
          object: 'block', type: 'code',
          code: { rich_text: [{ type: 'text', text: { content: codeContent.join('\n') } }], language: codeLanguage }
        });
      }
      continue;
    }
    if (inCodeBlock) { codeContent.push(line); continue; }

    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) { inTable = true; tableRows = []; }
      tableRows.push(line);
      continue;
    } else if (inTable) {
      inTable = false;
      blocks.push({
        object: 'block', type: 'code',
        code: { rich_text: [{ type: 'text', text: { content: tableRows.join('\n') } }], language: 'plain text' }
      });
      tableRows = [];
    }

    if (line.trim() === '') continue;

    if (line.trim() === '---') {
      blocks.push({ object: 'block', type: 'divider', divider: {} });
      continue;
    }

    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, '').trim();
      const headingType = level === 1 ? 'heading_1' : level === 2 ? 'heading_2' : 'heading_3';
      blocks.push({
        object: 'block', type: headingType,
        [headingType]: { rich_text: [{ type: 'text', text: { content: text } }] }
      });
      continue;
    }

    if (line.startsWith('>')) {
      blocks.push({
        object: 'block', type: 'quote',
        quote: { rich_text: [{ type: 'text', text: { content: line.replace(/^>\s*/, '').trim() } }] }
      });
      continue;
    }

    if (line.match(/^[-*]\s*\[\s*\]/)) {
      blocks.push({
        object: 'block', type: 'to_do',
        to_do: { rich_text: [{ type: 'text', text: { content: line.replace(/^[-*]\s*\[\s*\]\s*/, '').trim() } }], checked: false }
      });
      continue;
    }

    if (line.match(/^[-*]\s+/)) {
      blocks.push({
        object: 'block', type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.replace(/^[-*]\s+/, '').trim() } }] }
      });
      continue;
    }

    if (line.trim()) {
      blocks.push({
        object: 'block', type: 'paragraph',
        paragraph: { rich_text: [{ type: 'text', text: { content: line.trim() } }] }
      });
    }
  }

  if (inTable && tableRows.length > 0) {
    blocks.push({
      object: 'block', type: 'code',
      code: { rich_text: [{ type: 'text', text: { content: tableRows.join('\n') } }], language: 'plain text' }
    });
  }

  return blocks;
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

// ── 업체 서브페이지 찾기/생성 ──

async function findOrCreateClientPage(clientName) {
  // 기존 하위 페이지 검색
  const children = await notion.blocks.children.list({ block_id: PARENT_PAGE_ID, page_size: 100 });

  for (const block of children.results) {
    if (block.type === 'child_page' && block.child_page.title === clientName) {
      console.log(`  📁 기존 업체 페이지 발견: ${clientName}`);
      return block.id;
    }
  }

  // 없으면 새로 생성
  console.log(`  📁 업체 페이지 생성: ${clientName}`);
  const response = await notion.pages.create({
    parent: { type: 'page_id', page_id: PARENT_PAGE_ID },
    properties: {
      title: [{ type: 'text', text: { content: clientName } }]
    }
  });
  return response.id;
}

// ── 리포트 페이지 생성 ──

async function createReportPage(parentPageId, title, markdownContent) {
  const blocks = parseMarkdownToBlocks(markdownContent);

  const response = await notion.pages.create({
    parent: { type: 'page_id', page_id: parentPageId },
    properties: {
      title: [{ type: 'text', text: { content: title } }]
    }
  });

  const pageId = response.id;
  const blockChunks = chunkArray(blocks, 100);

  for (let i = 0; i < blockChunks.length; i++) {
    await notion.blocks.children.append({
      block_id: pageId,
      children: blockChunks[i]
    });
  }

  return response.url;
}

// ── 업체 리포트 업로드 ──

async function uploadClientReport(clientName, reportDir, label) {
  const absDir = path.resolve(PROJECT_ROOT, reportDir);

  if (!fs.existsSync(absDir)) {
    console.log(`  ⚠️  리포트 디렉토리 없음: ${reportDir}`);
    return false;
  }

  const today = new Date().toISOString().split('T')[0];
  const reportTitle = `${today} ${label} 리포트`;

  console.log(`\n  [${clientName}] ${reportTitle}`);

  // 업체 서브페이지 찾기/생성
  const clientPageId = await findOrCreateClientPage(clientName);

  // 분석 리포트 + 1페이지 요약을 합쳐서 하나의 페이지로
  let combinedMd = '';

  const summaryPath = path.join(absDir, '1페이지_요약.md');
  const reportPath = path.join(absDir, '분석_리포트.md');
  const checklistPath = path.join(absDir, '실행_체크리스트.md');

  if (fs.existsSync(summaryPath)) {
    combinedMd += fs.readFileSync(summaryPath, 'utf-8') + '\n\n---\n\n';
  }
  if (fs.existsSync(reportPath)) {
    combinedMd += fs.readFileSync(reportPath, 'utf-8') + '\n\n---\n\n';
  }
  if (fs.existsSync(checklistPath)) {
    combinedMd += fs.readFileSync(checklistPath, 'utf-8');
  }

  if (!combinedMd) {
    console.log(`  ⚠️  리포트 파일 없음`);
    return false;
  }

  const url = await createReportPage(clientPageId, reportTitle, combinedMd);
  console.log(`  ✅ 노션 업로드 완료: ${url}`);
  return true;
}

// ── 메인 ──

async function main() {
  const args = process.argv.slice(2);

  if (!PARENT_PAGE_ID) {
    console.error('NOTION_PAGE_ID_MARKETING이 .env에 설정되지 않았습니다.');
    process.exit(1);
  }

  // --all: clients.json의 모든 업체
  if (args.includes('--all')) {
    const configPath = path.join(PROJECT_ROOT, 'config', 'clients.json');
    const clients = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    console.log('=' .repeat(60));
    console.log('  노션 업로드 - 전체 업체');
    console.log('=' .repeat(60));

    for (const client of clients) {
      if (!client.enabled) continue;
      const reportDir = client.output_dir;
      if (fs.existsSync(path.resolve(PROJECT_ROOT, reportDir))) {
        await uploadClientReport(client.name, reportDir, '주간');
      }
    }
    return;
  }

  // --client + --report-dir + --label
  const clientIdx = args.indexOf('--client');
  const dirIdx = args.indexOf('--report-dir');
  const labelIdx = args.indexOf('--label');

  if (clientIdx === -1 || dirIdx === -1) {
    console.log('사용법:');
    console.log('  node scripts/upload_notion_report.js --client "업체명" --report-dir "output/..." --label "일일"');
    console.log('  node scripts/upload_notion_report.js --all');
    process.exit(1);
  }

  const clientName = args[clientIdx + 1];
  const reportDir = args[dirIdx + 1];
  const label = labelIdx !== -1 ? args[labelIdx + 1] : '리포트';

  console.log('=' .repeat(60));
  console.log(`  노션 업로드 - ${clientName}`);
  console.log('=' .repeat(60));

  await uploadClientReport(clientName, reportDir, label);
}

main().catch(err => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
