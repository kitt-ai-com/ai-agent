#!/usr/bin/env node
/**
 * ROAS OFF 분석 리포트를 업체별/일자별로 노션에 업로드
 *
 * 구조:
 *   [메인 페이지] (32c926438fe780788e41de04365c1ac5)
 *   ├── 독점마켓
 *   │   ├── 2026-03-24 일일 리포트
 *   │   ├── 2026-03-25 일일 리포트
 *   │   └── ...
 *   ├── 씨앤씨에어코리아
 *   │   ├── 2026-03-24 일일 리포트
 *   │   └── ...
 *   └── ...
 *
 * 사용법:
 *   node scripts/upload_notion_roas_by_client.js --report "output/meta-ad/_roas_daily/ROAS_OFF_일일_TEST_20260324.md"
 */

require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const MAIN_PAGE_ID = process.env.NOTION_PAGE_ID_ROAS;

// 마크다운 → 노션 블록 변환 함수들
function parseMarkdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let inCodeBlock = false;
  let codeContent = [];
  let codeLanguage = '';

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
          object: 'block',
          type: 'code',
          code: {
            rich_text: [{ type: 'text', text: { content: codeContent.join('\n') } }],
            language: codeLanguage
          }
        });
      }
      continue;
    }
    if (inCodeBlock) {
      codeContent.push(line);
      continue;
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
        object: 'block',
        type: headingType,
        [headingType]: { rich_text: [{ type: 'text', text: { content: text } }] }
      });
      continue;
    }

    if (line.match(/^[-*]\s*\[\s*\]/)) {
      const text = line.replace(/^[-*]\s*\[\s*\]\s*/, '').trim();
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: [{ type: 'text', text: { content: text } }], checked: false }
      });
      continue;
    }

    if (line.match(/^[-*]\s*\[[xX]\]/)) {
      const text = line.replace(/^[-*]\s*\[[xX]\]\s*/, '').trim();
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: [{ type: 'text', text: { content: text } }], checked: true }
      });
      continue;
    }

    if (line.startsWith('>')) {
      blocks.push({
        object: 'block',
        type: 'quote',
        quote: { rich_text: [{ type: 'text', text: { content: line.replace(/^>\s*/, '').trim() } }] }
      });
      continue;
    }

    if (line.match(/^[-*]\s+/)) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.replace(/^[-*]\s+/, '').trim() } }] }
      });
      continue;
    }

    if (line.match(/^\d+\.\s+/)) {
      blocks.push({
        object: 'block',
        type: 'numbered_list_item',
        numbered_list_item: { rich_text: [{ type: 'text', text: { content: line.replace(/^\d+\.\s+/, '').trim() } }] }
      });
      continue;
    }

    const richText = parseInlineFormatting(line);
    blocks.push({
      object: 'block',
      type: 'paragraph',
      paragraph: { rich_text: richText }
    });
  }

  return blocks;
}

function parseInlineFormatting(text) {
  const parts = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        text: { content: text.substring(lastIndex, match.index) }
      });
    }

    const content = match[0];

    if (content.startsWith('**') && content.endsWith('**')) {
      parts.push({
        type: 'text',
        text: { content: content.slice(2, -2) },
        annotations: { bold: true }
      });
    } else if (content.startsWith('*') && content.endsWith('*')) {
      parts.push({
        type: 'text',
        text: { content: content.slice(1, -1) },
        annotations: { italic: true }
      });
    } else if (content.startsWith('`') && content.endsWith('`')) {
      parts.push({
        type: 'text',
        text: { content: content.slice(1, -1) },
        annotations: { code: true }
      });
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      text: { content: text.substring(lastIndex) }
    });
  }

  return parts.length > 0 ? parts : [{ type: 'text', text: { content: text } }];
}

// 업체별 폴더 페이지 찾기 또는 생성
async function findOrCreateClientPage(clientName) {
  try {
    // 메인 페이지의 자식 페이지들 검색
    const response = await notion.blocks.children.list({
      block_id: MAIN_PAGE_ID,
      page_size: 100
    });

    // 기존 업체 페이지 찾기
    for (const block of response.results) {
      if (block.type === 'child_page' && block.child_page.title === clientName) {
        return block.id;
      }
    }

    // 없으면 새로 생성
    console.log(`📁 업체 페이지 생성: ${clientName}`);
    const newPage = await notion.pages.create({
      parent: { page_id: MAIN_PAGE_ID },
      properties: {
        title: {
          title: [{ text: { content: clientName } }]
        }
      }
    });

    return newPage.id;
  } catch (error) {
    console.error(`❌ 업체 페이지 처리 실패 (${clientName}):`, error.message);
    throw error;
  }
}

// 리포트에서 업체 목록 추출
function extractClientsFromReport(markdown) {
  const clients = [];
  const lines = markdown.split('\n');

  let inClientSection = false;
  for (const line of lines) {
    if (line.includes('## 📊 업체별 요약')) {
      inClientSection = true;
      continue;
    }
    if (inClientSection && line.startsWith('### ')) {
      const clientName = line.replace('### ', '').trim();
      if (clientName && !line.includes('개선 권장') && !line.includes('즉시 조치')) {
        clients.push(clientName);
      }
    }
    if (inClientSection && line.startsWith('## ')) {
      break;
    }
  }

  return clients;
}

// 업체별 리포트 분할
function splitReportByClient(markdown, clientName) {
  const lines = markdown.split('\n');
  const clientSections = [];

  // 헤더 부분
  let header = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('## 🎯 개선 권장 광고 목록')) {
      header = lines.slice(0, i);
      break;
    }
  }

  // 해당 업체 섹션 추출
  let inTargetClient = false;
  let clientContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('## 🎯 개선 권장 광고 목록')) {
      inTargetClient = false;
    }

    if (line === `### ${clientName}` && !inTargetClient) {
      inTargetClient = true;
      continue;
    }

    if (inTargetClient) {
      if (line.startsWith('### ') && !line.includes(clientName)) {
        break;
      }
      clientContent.push(line);
    }
  }

  // 통합 리포트 생성
  const today = new Date().toISOString().split('T')[0];
  let report = `# 📅 ${clientName} - 일일 ROAS 리포트\n`;
  report += `**생성일**: ${today}\n\n`;
  report += `---\n\n`;
  report += clientContent.join('\n');
  report += `\n\n---\n\n`;
  report += `**🤖 자동 생성**: KITT Agent AI\n`;
  report += `**리포트 주기**: 일일\n`;

  return report;
}

// 노션 업로드
async function uploadROASReportByClient(reportPath) {
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ 리포트 파일 없음: ${reportPath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(reportPath, 'utf-8');

  // 업체 목록 추출
  const clients = extractClientsFromReport(markdown);
  console.log(`\n📊 발견된 업체: ${clients.length}개`);
  console.log(`   ${clients.join(', ')}\n`);

  const today = new Date().toISOString().split('T')[0];

  // 각 업체별로 페이지 생성
  for (const clientName of clients) {
    try {
      console.log(`\n[${clientName}]`);

      // 1. 업체 페이지 찾기/생성
      const clientPageId = await findOrCreateClientPage(clientName);
      console.log(`   ✅ 업체 페이지 ID: ${clientPageId.slice(0, 8)}...`);

      // 2. 업체별 리포트 분할
      const clientReport = splitReportByClient(markdown, clientName);
      const blocks = parseMarkdownToBlocks(clientReport);

      // 3. 일자별 리포트 페이지 생성
      const reportTitle = `${today} 일일 리포트`;
      console.log(`   📄 리포트 생성: ${reportTitle}`);

      const reportPage = await notion.pages.create({
        parent: { page_id: clientPageId },
        properties: {
          title: {
            title: [{ text: { content: reportTitle } }]
          }
        },
        children: blocks.slice(0, 100)
      });

      console.log(`   ✅ 페이지 생성 완료: ${reportPage.url}`);

      // 4. 100개 초과 블록 추가
      if (blocks.length > 100) {
        for (let i = 100; i < blocks.length; i += 100) {
          await notion.blocks.children.append({
            block_id: reportPage.id,
            children: blocks.slice(i, i + 100)
          });
        }
        console.log(`   📝 추가 블록 업로드 (총 ${blocks.length}개)`);
      }

    } catch (error) {
      console.error(`   ❌ ${clientName} 업로드 실패:`, error.message);
    }
  }

  console.log(`\n✅ 전체 업로드 완료!`);
}

// CLI
const args = process.argv.slice(2);
const reportIndex = args.indexOf('--report');

if (reportIndex === -1 || !args[reportIndex + 1]) {
  console.error('사용법: node upload_notion_roas_by_client.js --report <파일경로>');
  process.exit(1);
}

const reportPath = path.resolve(args[reportIndex + 1]);
uploadROASReportByClient(reportPath);
