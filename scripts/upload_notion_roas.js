#!/usr/bin/env node
/**
 * ROAS OFF 분석 리포트를 노션에 업로드
 *
 * 구조:
 *   [노션 상위 업체 공용] - ROAS 일일 리포트
 *   ├── 2026-03-24 ROAS OFF 분석
 *   ├── 2026-03-25 ROAS OFF 분석
 *   └── ...
 *
 * 사용법:
 *   node scripts/upload_notion_roas.js --report "output/meta-ad/_roas_daily/ROAS_OFF_20260324.md"
 */

require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PARENT_PAGE_ID = process.env.NOTION_PAGE_ID_ROAS || process.env.NOTION_PAGE_ID_MARKETING;

// ── 마크다운 → 노션 블록 변환 ──

function parseMarkdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let inCodeBlock = false;
  let codeContent = [];
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 코드 블록
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

    // 빈 줄
    if (line.trim() === '') continue;

    // 구분선
    if (line.trim() === '---') {
      blocks.push({ object: 'block', type: 'divider', divider: {} });
      continue;
    }

    // 헤딩
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

    // 체크박스
    if (line.match(/^[-*]\s*\[\s*\]/)) {
      const text = line.replace(/^[-*]\s*\[\s*\]\s*/, '').trim();
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: [{ type: 'text', text: { content: text } }], checked: false }
      });
      continue;
    }

    // 체크박스 (완료)
    if (line.match(/^[-*]\s*\[[xX]\]/)) {
      const text = line.replace(/^[-*]\s*\[[xX]\]\s*/, '').trim();
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: { rich_text: [{ type: 'text', text: { content: text } }], checked: true }
      });
      continue;
    }

    // 인용
    if (line.startsWith('>')) {
      blocks.push({
        object: 'block',
        type: 'quote',
        quote: { rich_text: [{ type: 'text', text: { content: line.replace(/^>\s*/, '').trim() } }] }
      });
      continue;
    }

    // 불릿 리스트
    if (line.match(/^[-*]\s+/)) {
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: { rich_text: [{ type: 'text', text: { content: line.replace(/^[-*]\s+/, '').trim() } }] }
      });
      continue;
    }

    // 번호 리스트
    if (line.match(/^\d+\.\s+/)) {
      blocks.push({
        object: 'block',
        type: 'numbered_list_item',
        numbered_list_item: { rich_text: [{ type: 'text', text: { content: line.replace(/^\d+\.\s+/, '').trim() } }] }
      });
      continue;
    }

    // 일반 텍스트 (bold 처리)
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
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // 앞부분
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        text: { content: text.substring(lastIndex, match.index) }
      });
    }

    const content = match[0];

    // Bold
    if (content.startsWith('**') && content.endsWith('**')) {
      parts.push({
        type: 'text',
        text: { content: content.slice(2, -2) },
        annotations: { bold: true }
      });
    }
    // Italic
    else if (content.startsWith('*') && content.endsWith('*')) {
      parts.push({
        type: 'text',
        text: { content: content.slice(1, -1) },
        annotations: { italic: true }
      });
    }
    // Code
    else if (content.startsWith('`') && content.endsWith('`')) {
      parts.push({
        type: 'text',
        text: { content: content.slice(1, -1) },
        annotations: { code: true }
      });
    }
    // Link
    else if (content.match(/\[(.*?)\]\((.*?)\)/)) {
      const linkMatch = content.match(/\[(.*?)\]\((.*?)\)/);
      parts.push({
        type: 'text',
        text: { content: linkMatch[1], link: { url: linkMatch[2] } }
      });
    }

    lastIndex = regex.lastIndex;
  }

  // 나머지
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      text: { content: text.substring(lastIndex) }
    });
  }

  return parts.length > 0 ? parts : [{ type: 'text', text: { content: text } }];
}

// ── 노션 업로드 ──

async function uploadROASReport(reportPath) {
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ 리포트 파일 없음: ${reportPath}`);
    process.exit(1);
  }

  const markdown = fs.readFileSync(reportPath, 'utf-8');
  const blocks = parseMarkdownToBlocks(markdown);

  // 파일명에서 기간 추출 (ROAS_OFF_일일_20260324.md)
  const filename = path.basename(reportPath);
  const periodMatch = filename.match(/ROAS_OFF_(일일|주간|월간)_/);
  const period = periodMatch ? periodMatch[1] : '분석';

  // 제목: "YYYY-MM-DD ROAS OFF 일일/주간/월간 리포트"
  const today = new Date().toISOString().split('T')[0];
  const title = `${today} ROAS OFF ${period} 리포트`;

  console.log(`📤 Notion 업로드 중: ${title}`);

  try {
    const response = await notion.pages.create({
      parent: { page_id: PARENT_PAGE_ID },
      properties: {
        title: {
          title: [{ text: { content: title } }]
        }
      },
      children: blocks.slice(0, 100) // Notion API 제한 (100 블록)
    });

    console.log(`✅ 페이지 생성 완료: ${response.url}`);

    // 100개 초과 블록 추가
    if (blocks.length > 100) {
      for (let i = 100; i < blocks.length; i += 100) {
        await notion.blocks.children.append({
          block_id: response.id,
          children: blocks.slice(i, i + 100)
        });
      }
      console.log(`   추가 블록 업로드 완료 (총 ${blocks.length}개)`);
    }

    return response;
  } catch (error) {
    console.error('❌ Notion 업로드 실패:', error.message);
    if (error.body) {
      console.error('상세:', JSON.stringify(error.body, null, 2));
    }
    process.exit(1);
  }
}

// ── CLI ──

const args = process.argv.slice(2);
const reportIndex = args.indexOf('--report');

if (reportIndex === -1 || !args[reportIndex + 1]) {
  console.error('사용법: node upload_notion_roas.js --report <파일경로>');
  process.exit(1);
}

const reportPath = path.resolve(args[reportIndex + 1]);
uploadROASReport(reportPath);
