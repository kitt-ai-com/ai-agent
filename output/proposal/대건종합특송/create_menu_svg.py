#!/usr/bin/env python3
"""대건종합특송 메뉴 구조도 SVG 생성 (Figma 임포트용)"""

# ─── 색상 ───
NAVY = "#0D274D"
BLUE = "#1E40AF"
BLUE_MED = "#2563EB"
BLUE_LT = "#3B82F6"
BLUE_ACC = "#60A5FA"
BLUE_BG = "#EFF6FF"
WHITE = "#FFFFFF"
GRAY = "#6B7280"
GRAY_LT = "#D1D5DB"
GRAY_BG = "#F3F4F6"
GREEN = "#059669"
ORANGE = "#EA580C"

# ─── 메뉴 데이터 ───
MENU = [
    {
        "icon": "📊", "title": "대시보드", "color": BLUE,
        "items": [
            "오늘의 배차 현황",
            "플랫폼별 이용 통계",
            "고객사 현황",
            "견적서 발행 현황",
            "AI 챗봇 활용도",
        ]
    },
    {
        "icon": "👥", "title": "사용자 관리", "color": BLUE, "badge": "관리자",
        "groups": [
            {"name": "계정 관리", "items": ["직원 계정 목록", "계정 등록", "계정 수정/삭제", "계정 일괄 등록 (CSV)"]},
            {"name": "권한 관리", "items": ["역할 관리 (4단계)", "메뉴별 접근 권한", "CRUD 권한 설정", "데이터 범위 권한"]},
            {"name": "부서 관리", "items": ["부서 목록", "부서 등록/수정/삭제", "부서별 권한 설정"]},
        ]
    },
    {
        "icon": "🏢", "title": "고객사 관리", "color": BLUE_MED,
        "groups": [
            {"name": "고객사 목록", "items": ["전체 고객사 조회", "통합 검색", "필터링 (등급/상태/태그)", "정렬 (가나다/거래액)"]},
            {"name": "고객사 등록", "items": ["기본 정보 입력", "주소 검색 (카카오 API)", "담당자 정보 등록", "거래 정보 설정"]},
            {"name": "고객사 상세", "items": ["기본 정보 조회/수정", "담당자 관리", "특이사항 메모", "파일 첨부", "거래 이력"]},
            {"name": "고객사 대시보드", "items": ["총 고객사 현황", "등급별 분포", "신규 고객사", "거래 TOP 10"]},
        ]
    },
    {
        "icon": "🚚", "title": "배차 관리", "color": BLUE_MED,
        "groups": [
            {"name": "파일 업로드", "items": ["견적 요청 파일 업로드", "업로드 파일 목록", "파일 검색", "처리 상태 관리"]},
            {"name": "4개 플랫폼 조회", "items": ["통합 입력 폼", "전국24시콜화물", "화물맨", "원콜", "인성데이타", "실시간 견적 비교"]},
            {"name": "견적 비교", "items": ["4개 플랫폼 동시 표시", "가격 오름차순 정렬", "조건별 필터링", "견적 상세 정보"]},
        ]
    },
    {
        "icon": "📄", "title": "견적서 관리", "color": BLUE_LT,
        "groups": [
            {"name": "견적서 발행", "items": ["고객사 선택 (CRM)", "견적 정보 입력", "템플릿 선택", "자동 계산", "PDF 생성", "이메일 발송"]},
            {"name": "견적서 목록", "items": ["전체 견적서 조회", "검색 (고객사/번호/날짜)", "필터링 (상태/기간)", "견적서 재발행"]},
            {"name": "템플릿 관리", "items": ["기본 템플릿 관리", "고객사별 설정", "템플릿 미리보기"]},
            {"name": "견적서 이력", "items": ["발행 이력 조회", "승인/거부 상태", "계약 전환 추적"]},
        ]
    },
    {
        "icon": "🤖", "title": "AI 챗봇", "color": BLUE_LT,
        "groups": [
            {"name": "메뉴얼 질의응답", "items": ["실시간 채팅", "부서별 필터링", "자주 묻는 질문", "출처 표시"]},
            {"name": "질문 히스토리", "items": ["내 질문 내역", "답변 유용성 평가", "인기 질문 TOP 10"]},
        ]
    },
    {
        "icon": "📈", "title": "통계/리포트", "color": GREEN,
        "groups": [
            {"name": "배차 통계", "items": ["일별/주별/월별 건수", "플랫폼별 이용 통계", "담당자별 현황"]},
            {"name": "고객사 통계", "items": ["고객사별 거래 현황", "등급별 매출 분석", "신규/휴면 추이"]},
            {"name": "견적서 통계", "items": ["발행 건수 추이", "승인율 분석", "평균 견적 금액"]},
            {"name": "데이터 내보내기", "items": ["Excel 다운로드", "CSV 다운로드", "PDF 리포트"]},
        ]
    },
    {
        "icon": "⚙️", "title": "시스템 설정", "color": GRAY, "badge": "슈퍼관리자",
        "groups": [
            {"name": "환경 설정", "items": ["회사 정보 관리", "로고 업로드", "브랜드 컬러"]},
            {"name": "API 설정", "items": ["ChatGPT API Key", "Gemini API Key", "주소 검색 API"]},
            {"name": "알림 설정", "items": ["이메일 알림", "SMS 알림 (선택)", "알림 템플릿"]},
        ]
    },
    {
        "icon": "📋", "title": "감사 로그", "color": GRAY, "badge": "관리자",
        "groups": [
            {"name": "로그인 이력", "items": ["사용자별 기록", "IP 주소 추적", "실패한 시도"]},
            {"name": "데이터 변경 이력", "items": ["생성/수정/삭제", "변경 전/후 데이터", "변경한 사용자"]},
            {"name": "중요 작업 로그", "items": ["견적서 발행 기록", "고객사 정보 수정", "권한 변경 기록"]},
            {"name": "로그 분석", "items": ["사용자별 활동", "날짜별/작업별 필터", "CSV 내보내기"]},
        ]
    },
]


def escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def generate_svg():
    # ─── 레이아웃 계산 ───
    CARD_W = 280
    CARD_MARGIN = 24
    COLS = 3
    PAGE_PAD = 60
    HEADER_H = 120
    TITLE_BAR_H = 80

    # 각 카드 높이 계산
    card_heights = []
    for menu in MENU:
        h = 70  # 헤더 영역
        if "items" in menu:
            h += len(menu["items"]) * 26 + 16
        if "groups" in menu:
            for g in menu["groups"]:
                h += 34  # 그룹 타이틀
                h += len(g["items"]) * 24
                h += 12  # 간격
        h += 20  # 하단 패딩
        card_heights.append(h)

    # 3열 레이아웃 - 각 열 높이 계산
    col_items = [[], [], []]
    col_heights = [0, 0, 0]

    for i, menu in enumerate(MENU):
        # 가장 짧은 열에 배치
        min_col = col_heights.index(min(col_heights))
        col_items[min_col].append((i, menu, card_heights[i]))
        col_heights[min_col] += card_heights[i] + CARD_MARGIN

    total_w = PAGE_PAD * 2 + COLS * CARD_W + (COLS - 1) * CARD_MARGIN
    total_h = HEADER_H + TITLE_BAR_H + max(col_heights) + PAGE_PAD * 2

    svg_parts = []

    # ─── SVG 시작 ───
    svg_parts.append(f'''<svg xmlns="http://www.w3.org/2000/svg" width="{total_w}" height="{total_h}" viewBox="0 0 {total_w} {total_h}">
  <defs>
    <filter id="shadow" x="-4%" y="-4%" width="108%" height="108%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.08"/>
    </filter>
    <filter id="shadow-sm" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000000" flood-opacity="0.06"/>
    </filter>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="{NAVY}"/>
      <stop offset="100%" stop-color="{BLUE}"/>
    </linearGradient>
  </defs>

  <!-- 배경 -->
  <rect width="{total_w}" height="{total_h}" fill="{WHITE}"/>
''')

    # ─── 헤더 ───
    svg_parts.append(f'''
  <!-- 헤더 -->
  <rect x="0" y="0" width="{total_w}" height="{HEADER_H}" fill="url(#headerGrad)"/>
  <rect x="0" y="0" width="4" height="{HEADER_H}" fill="{BLUE_ACC}"/>
  <text x="{PAGE_PAD}" y="45" font-family="Arial, sans-serif" font-size="14" fill="{BLUE_ACC}" font-weight="600">SYSTEM MENU STRUCTURE</text>
  <text x="{PAGE_PAD}" y="80" font-family="Arial, sans-serif" font-size="28" fill="{WHITE}" font-weight="700">대건종합특송 스마트 배차 관리 시스템 — 전체 메뉴 구조도</text>
  <text x="{PAGE_PAD}" y="105" font-family="Arial, sans-serif" font-size="13" fill="{BLUE_ACC}">9개 대메뉴 · 27개 하위 그룹 · 85+ 세부 기능</text>
''')

    # ─── 타이틀 바 (중앙 루트) ───
    bar_y = HEADER_H
    svg_parts.append(f'''
  <!-- 루트 타이틀 바 -->
  <rect x="0" y="{bar_y}" width="{total_w}" height="{TITLE_BAR_H}" fill="{BLUE_BG}"/>
  <rect x="{total_w//2 - 180}" y="{bar_y + 15}" width="360" height="50" rx="25" fill="{BLUE}" filter="url(#shadow)"/>
  <text x="{total_w//2}" y="{bar_y + 47}" font-family="Arial, sans-serif" font-size="16" fill="{WHITE}" font-weight="700" text-anchor="middle">📊  대건종합특송 배차 관리 시스템</text>
''')

    # 연결선 (루트 → 각 열 상단)
    content_y = HEADER_H + TITLE_BAR_H
    center_x = total_w // 2
    svg_parts.append(f'  <line x1="{center_x}" y1="{bar_y + 65}" x2="{center_x}" y2="{content_y + 10}" stroke="{GRAY_LT}" stroke-width="2" stroke-dasharray="6,4"/>')

    for col in range(COLS):
        col_center = PAGE_PAD + col * (CARD_W + CARD_MARGIN) + CARD_W // 2
        svg_parts.append(f'  <line x1="{center_x}" y1="{content_y + 10}" x2="{col_center}" y2="{content_y + 10}" stroke="{GRAY_LT}" stroke-width="2" stroke-dasharray="6,4"/>')
        svg_parts.append(f'  <line x1="{col_center}" y1="{content_y + 10}" x2="{col_center}" y2="{content_y + 20}" stroke="{GRAY_LT}" stroke-width="2" stroke-dasharray="6,4"/>')

    # ─── 카드 렌더링 ───
    for col in range(COLS):
        x = PAGE_PAD + col * (CARD_W + CARD_MARGIN)
        y_offset = content_y + 24

        for idx, menu, card_h in col_items[col]:
            y = y_offset
            color = menu["color"]

            # 카드 배경
            svg_parts.append(f'''
  <!-- {menu["title"]} -->
  <g filter="url(#shadow)">
    <rect x="{x}" y="{y}" width="{CARD_W}" height="{card_h}" rx="8" fill="{WHITE}" stroke="{GRAY_LT}" stroke-width="1"/>
    <rect x="{x}" y="{y}" width="{CARD_W}" height="4" rx="8" fill="{color}"/>
    <rect x="{x}" y="{y+2}" width="{CARD_W}" height="2" fill="{color}"/>
  </g>''')

            # 아이콘 + 제목
            svg_parts.append(f'''
  <circle cx="{x + 28}" cy="{y + 32}" r="18" fill="{color}"/>
  <text x="{x + 28}" y="{y + 38}" font-family="Arial, sans-serif" font-size="14" fill="{WHITE}" text-anchor="middle">{menu["icon"]}</text>
  <text x="{x + 56}" y="{y + 37}" font-family="Arial, sans-serif" font-size="15" fill="{NAVY}" font-weight="700">{escape(menu["title"])}</text>''')

            # 배지
            if "badge" in menu:
                badge = menu["badge"]
                bw = len(badge) * 10 + 16
                svg_parts.append(f'''
  <rect x="{x + CARD_W - bw - 12}" y="{y + 18}" width="{bw}" height="22" rx="11" fill="{ORANGE}"/>
  <text x="{x + CARD_W - bw//2 - 12}" y="{y + 33}" font-family="Arial, sans-serif" font-size="10" fill="{WHITE}" font-weight="600" text-anchor="middle">{escape(badge)}</text>''')

            # 구분선
            svg_parts.append(f'  <line x1="{x + 12}" y1="{y + 56}" x2="{x + CARD_W - 12}" y2="{y + 56}" stroke="{GRAY_LT}" stroke-width="1"/>')

            cy = y + 70

            # 단일 items (대시보드)
            if "items" in menu and "groups" not in menu:
                for item in menu["items"]:
                    svg_parts.append(f'''
  <circle cx="{x + 22}" cy="{cy}" r="3" fill="{BLUE_ACC}"/>
  <text x="{x + 34}" y="{cy + 4}" font-family="Arial, sans-serif" font-size="12" fill="{GRAY}">{escape(item)}</text>''')
                    cy += 26

            # 그룹 items
            if "groups" in menu:
                for g in menu["groups"]:
                    # 그룹 헤더
                    svg_parts.append(f'''
  <rect x="{x + 12}" y="{cy - 4}" width="{CARD_W - 24}" height="26" rx="4" fill="{BLUE_BG}"/>
  <rect x="{x + 12}" y="{cy - 4}" width="3" height="26" rx="1" fill="{color}"/>
  <text x="{x + 24}" y="{cy + 12}" font-family="Arial, sans-serif" font-size="11" fill="{BLUE}" font-weight="600">{escape(g["name"])}</text>''')
                    cy += 34

                    for item in g["items"]:
                        svg_parts.append(f'''
  <circle cx="{x + 26}" cy="{cy}" r="2.5" fill="{GRAY_LT}"/>
  <text x="{x + 36}" y="{cy + 4}" font-family="Arial, sans-serif" font-size="11" fill="{GRAY}">{escape(item)}</text>''')
                        cy += 24
                    cy += 12

            y_offset += card_h + CARD_MARGIN

    # ─── 하단 범례 ───
    legend_y = total_h - 50
    svg_parts.append(f'''
  <!-- 범례 -->
  <rect x="0" y="{legend_y - 10}" width="{total_w}" height="60" fill="{GRAY_BG}"/>
  <text x="{PAGE_PAD}" y="{legend_y + 15}" font-family="Arial, sans-serif" font-size="11" fill="{GRAY}">
    <tspan font-weight="600">범례:</tspan>
    <tspan dx="15">●</tspan><tspan dx="5" fill="{BLUE}">우선순위 1 (사용자/권한/고객사)</tspan>
    <tspan dx="20">●</tspan><tspan dx="5" fill="{BLUE_MED}">핵심 기능 (배차/고객사)</tspan>
    <tspan dx="20">●</tspan><tspan dx="5" fill="{BLUE_LT}">지원 기능 (견적서/AI)</tspan>
    <tspan dx="20">●</tspan><tspan dx="5" fill="{GREEN}">분석 (통계/리포트)</tspan>
    <tspan dx="20">●</tspan><tspan dx="5" fill="{GRAY}">관리 (설정/로그)</tspan>
  </text>
  <text x="{total_w - PAGE_PAD}" y="{legend_y + 15}" font-family="Arial, sans-serif" font-size="10" fill="{GRAY_LT}" text-anchor="end">대건종합특송 스마트 배차 관리 시스템 · 2026.03</text>
''')

    # ─── SVG 닫기 ───
    svg_parts.append('</svg>')

    return '\n'.join(svg_parts)


if __name__ == "__main__":
    svg_content = generate_svg()
    output_path = "/Users/jasonmac/kitt_agent/ai-agent/output/proposal/대건종합특송_메뉴구조도.svg"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"✅ SVG 메뉴 구조도 생성 완료: {output_path}")
