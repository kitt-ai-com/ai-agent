require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function checkConnection() {
  console.log('🔍 노션 Integration 연결 확인 중...\n');

  try {
    // 제안서 페이지 접근 확인
    console.log('📋 제안서 페이지 접근 테스트');
    console.log('페이지 ID:', process.env.NOTION_PAGE_ID_PROPOSAL);

    try {
      const proposalPage = await notion.pages.retrieve({
        page_id: process.env.NOTION_PAGE_ID_PROPOSAL
      });
      console.log('✅ 제안서 페이지 접근 가능!');
      console.log('   제목:', proposalPage.properties.title?.title?.[0]?.plain_text || '(제목 없음)');
    } catch (error) {
      console.log('❌ 제안서 페이지 접근 불가');
      console.log('   오류:', error.code);
      console.log('   → Integration 연결 필요!');
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // 마케팅 페이지 접근 확인
    console.log('📊 마케팅 페이지 접근 테스트');
    console.log('페이지 ID:', process.env.NOTION_PAGE_ID_MARKETING);

    try {
      const marketingPage = await notion.pages.retrieve({
        page_id: process.env.NOTION_PAGE_ID_MARKETING
      });
      console.log('✅ 마케팅 페이지 접근 가능!');
      console.log('   제목:', marketingPage.properties.title?.title?.[0]?.plain_text || '(제목 없음)');
    } catch (error) {
      console.log('❌ 마케팅 페이지 접근 불가');
      console.log('   오류:', error.code);
      console.log('   → Integration 연결 필요!');
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Integration 정보
    console.log('🔑 Integration 정보');
    console.log('토큰:', process.env.NOTION_TOKEN.substring(0, 20) + '...');

    // Search API로 접근 가능한 페이지 확인
    console.log('\n📂 접근 가능한 페이지 목록:');
    const searchResult = await notion.search({
      filter: { property: 'object', value: 'page' },
      page_size: 10
    });

    if (searchResult.results.length === 0) {
      console.log('⚠️  접근 가능한 페이지가 없습니다.');
      console.log('   → 노션에서 Integration을 페이지에 연결해주세요.');
    } else {
      console.log(`✅ 총 ${searchResult.results.length}개 페이지 접근 가능:\n`);
      searchResult.results.forEach((page, index) => {
        const title = page.properties.title?.title?.[0]?.plain_text || '(제목 없음)';
        console.log(`   ${index + 1}. ${title}`);
        console.log(`      ID: ${page.id}`);
      });
    }

  } catch (error) {
    console.error('❌ 오류 발생:', error.message);
    if (error.code === 'unauthorized') {
      console.error('\n⚠️  토큰이 유효하지 않습니다.');
    }
  }
}

checkConnection();
