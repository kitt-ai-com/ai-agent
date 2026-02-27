# Marp 프레젠테이션 사용법

## 파일
- `presentation.md` - Marp 마크다운 프레젠테이션

## PDF/PPTX 변환 방법

### 방법 1: VS Code Extension (추천)
1. VS Code 설치
2. "Marp for VS Code" 확장 설치
3. presentation.md 파일 열기
4. ⌘+K, V (미리보기)
5. 우클릭 → "Marp: Export Slide Deck..." → PDF/PPTX 선택

### 방법 2: Marp CLI
```bash
# 설치
npm install -g @marp-team/marp-cli

# PDF 변환
cd output/proposal/20260227_네놈마켓/
marp presentation.md --pdf

# PPTX 변환
marp presentation.md --pptx
```

### 방법 3: 웹사이트
1. https://web.marp.app 접속
2. presentation.md 내용 복사 붙여넣기
3. Export 버튼 → PDF/PPTX 선택

## 구글 슬라이드로 가져오기
1. PDF/PPTX로 변환
2. 구글 드라이브에 업로드
3. 파일 우클릭 → "연결 앱" → "Google 슬라이드"
4. 편집 가능!

## 슬라이드 구성
- 총 약 20개 슬라이드
- 커버, 목차, 5개 섹션, 마무리
- 전문적인 디자인 (파란색 테마)
- 표, 다이어그램, 하이라이트 포함
