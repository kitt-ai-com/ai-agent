require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// CLI 인자 파싱
const args = process.argv.slice(2);
const filePath = args[0];

if (!filePath) {
  console.error('❌ 파일 경로를 지정해주세요.');
  console.error('사용법: node upload-notion.js <파일경로>');
  console.error('예시: node upload-notion.js output/에어로웨이_메타광고_성과리포트_202602.md');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`❌ 파일을 찾을 수 없습니다: ${filePath}`);
  process.exit(1);
}

// Notion 클라이언트 초기화
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// 파일 경로/이름으로 문서 타입 감지
function detectDocumentType(filePath) {
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);

  // 제안서 패턴
  if (dirName.includes('proposal') ||
      fileName.includes('제안서') ||
      fileName.includes('견적서')) {
    return 'proposal';
  }

  // 마케팅/광고 리포트 패턴
  if (dirName.includes('report') ||
      fileName.includes('광고') ||
      fileName.includes('리포트') ||
      fileName.includes('메타') ||
      fileName.includes('성과')) {
    return 'marketing';
  }

  // 기본값: marketing (리포트가 더 빈번할 것으로 예상)
  console.warn('⚠️  문서 타입을 자동 감지하지 못했습니다. marketing으로 간주합니다.');
  return 'marketing';
}

// 마크다운에서 첫 번째 H1 제목 추출
function extractTitle(markdown, fallbackFileName) {
  const lines = markdown.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.replace(/^#\s*/, '').trim();
    }
  }
  // H1이 없으면 파일명 사용
  return fallbackFileName.replace(/_/g, ' ');
}

// 마크다운 파일을 노션 블록으로 변환
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

    // 코드 블록 처리
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
            rich_text: [{
              type: 'text',
              text: { content: codeContent.join('\n') }
            }],
            language: codeLanguage
          }
        });
        codeContent = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }

    // 표 처리 (간단하게 code 블록으로 변환)
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      tableRows.push(line);
      continue;
    } else if (inTable) {
      // 표 종료
      inTable = false;
      blocks.push({
        object: 'block',
        type: 'code',
        code: {
          rich_text: [{
            type: 'text',
            text: { content: tableRows.join('\n') }
          }],
          language: 'plain text'
        }
      });
      tableRows = [];
    }

    // 빈 줄
    if (line.trim() === '') {
      continue;
    }

    // 제목 처리
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, '').trim();

      // 이모지 제거 (노션이 자동으로 처리)
      const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();

      let headingType = 'heading_2';
      if (level === 1) headingType = 'heading_1';
      else if (level === 2) headingType = 'heading_2';
      else headingType = 'heading_3';

      blocks.push({
        object: 'block',
        type: headingType,
        [headingType]: {
          rich_text: [{
            type: 'text',
            text: { content: cleanText }
          }]
        }
      });
      continue;
    }

    // 인용구 처리
    if (line.startsWith('>')) {
      const text = line.replace(/^>\s*/, '').trim();
      blocks.push({
        object: 'block',
        type: 'quote',
        quote: {
          rich_text: [{
            type: 'text',
            text: { content: text }
          }]
        }
      });
      continue;
    }

    // 구분선 처리
    if (line.trim() === '---') {
      blocks.push({
        object: 'block',
        type: 'divider',
        divider: {}
      });
      continue;
    }

    // 체크리스트 처리
    if (line.match(/^[-*]\s*\[\s*\]/)) {
      const text = line.replace(/^[-*]\s*\[\s*\]\s*/, '').trim();
      blocks.push({
        object: 'block',
        type: 'to_do',
        to_do: {
          rich_text: [{
            type: 'text',
            text: { content: text }
          }],
          checked: false
        }
      });
      continue;
    }

    // 리스트 처리
    if (line.match(/^[-*]\s+/)) {
      const text = line.replace(/^[-*]\s+/, '').trim();
      blocks.push({
        object: 'block',
        type: 'bulleted_list_item',
        bulleted_list_item: {
          rich_text: [{
            type: 'text',
            text: { content: text }
          }]
        }
      });
      continue;
    }

    // 일반 텍스트 (paragraph)
    if (line.trim()) {
      // 볼드 처리 (**text** -> bold)
      const text = line.trim();
      blocks.push({
        object: 'block',
        type: 'paragraph',
        paragraph: {
          rich_text: [{
            type: 'text',
            text: { content: text }
          }]
        }
      });
    }
  }

  // 마지막 표 처리
  if (inTable && tableRows.length > 0) {
    blocks.push({
      object: 'block',
      type: 'code',
      code: {
        rich_text: [{
          type: 'text',
          text: { content: tableRows.join('\n') }
        }],
        language: 'plain text'
      }
    });
  }

  return blocks;
}

// 블록을 100개씩 나누기 (Notion API 제한)
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// 메인 함수
async function uploadToNotion(filePath) {
  try {
    // 마크다운 파일 읽기
    const markdown = fs.readFileSync(filePath, 'utf-8');
    console.log('📖 마크다운 파일 읽기 완료');

    // 문서 타입 감지
    const docType = detectDocumentType(filePath);
    console.log(`📂 문서 타입: ${docType === 'proposal' ? '제안서' : '마케팅 리포트'}`);

    // 페이지 ID 선택
    const parentPageId = docType === 'proposal'
      ? process.env.NOTION_PAGE_ID_PROPOSAL
      : process.env.NOTION_PAGE_ID_MARKETING;

    if (!parentPageId) {
      throw new Error(`환경 변수가 설정되지 않았습니다: NOTION_PAGE_ID_${docType.toUpperCase()}`);
    }

    // 파일명에서 제목 추출
    const fileName = path.basename(filePath, '.md');
    const pageTitle = extractTitle(markdown, fileName);

    console.log(`📝 제목: ${pageTitle}`);

    // 마크다운을 노션 블록으로 변환
    const blocks = parseMarkdownToBlocks(markdown);
    console.log(`📝 ${blocks.length}개 블록 생성 완료`);

    console.log('🚀 노션 페이지 생성 중...');

    const response = await notion.pages.create({
      parent: {
        type: 'page_id',
        page_id: parentPageId
      },
      properties: {
        title: [
          {
            type: 'text',
            text: {
              content: pageTitle
            }
          }
        ]
      }
    });

    const pageId = response.id;
    console.log('✅ 페이지 생성 완료:', response.url);

    // 블록을 100개씩 나눠서 추가 (API 제한)
    const blockChunks = chunkArray(blocks, 100);

    for (let i = 0; i < blockChunks.length; i++) {
      console.log(`📦 블록 추가 중... (${i + 1}/${blockChunks.length})`);
      await notion.blocks.children.append({
        block_id: pageId,
        children: blockChunks[i]
      });
    }

    console.log('✨ 업로드 완료!');
    console.log('🔗 페이지 링크:', response.url);

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.code === 'object_not_found') {
      console.error('\n⚠️  페이지를 찾을 수 없습니다.');
      console.error('해결 방법:');
      console.error('1. 노션 페이지에서 우측 상단 ··· 메뉴 클릭');
      console.error('2. "Connections" 선택');
      console.error('3. 생성한 Integration 연결');
    }
    if (error.code === 'unauthorized') {
      console.error('\n⚠️  인증 실패');
      console.error('API Token이 올바른지 확인하세요.');
    }
    process.exit(1);
  }
}

// 실행
uploadToNotion(filePath);
