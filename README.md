# 🌤 양재1동 2025년 날씨 달력

**기상 예보 vs 실제 날씨** 비교 달력 — GitHub Pages 웹사이트

🔗 **라이브 데모**: `https://<your-username>.github.io/weather-calendar`

---

## 📋 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 지역 | 서울 양재1동 (격자 61_125) |
| 기간 | 2025년 1월 1일 ~ 12월 31일 |
| 예보 데이터 | 기상청 강수확률 예보 (매일 02시 발표, +6~+29시간) |
| 실측 데이터 | Open-Meteo 일별 강수량 관측값 |

### 날씨 분류 기준

| 코드 | 날씨 | 예보 기준 | 실측 기준 |
|---|---|---|---|
| **A** | 맑음 | 강수확률 0% | 강수량 0mm |
| **B** | 흐림 | 강수확률 1~50% | 강수량 0~5mm |
| **C** | 비 | 강수확률 51%+ | 강수량 5mm 초과 |

---

## 🗂 파일 구조

```
weather-calendar/
├── index.html   # 메인 페이지
├── style.css    # 스타일
├── app.js       # 달력 렌더링 로직
├── data.js      # 365일 날씨 데이터 (JS 배열)
└── README.md    # 이 파일
```

---

## 🚀 GitHub Pages 배포 방법

### 1단계 — 저장소 만들기

1. [github.com](https://github.com) 로그인
2. 우측 상단 **+** → **New repository** 클릭
3. Repository name: `weather-calendar`
4. Public 선택 → **Create repository** 클릭

### 2단계 — 파일 업로드

**방법 A: 웹 브라우저에서 직접 업로드**
1. 저장소 페이지에서 **Add file** → **Upload files** 클릭
2. `index.html`, `style.css`, `app.js`, `data.js`, `README.md` 를 모두 드래그 앤 드롭
3. **Commit changes** 클릭

**방법 B: Git 명령어 사용**
```bash
git clone https://github.com/<your-username>/weather-calendar.git
# 파일들을 폴더에 복사한 뒤
cd weather-calendar
git add .
git commit -m "Add weather calendar 2025"
git push origin main
```

### 3단계 — GitHub Pages 활성화

1. 저장소 페이지 → **Settings** 탭 클릭
2. 왼쪽 메뉴 **Pages** 클릭
3. **Source** → `Deploy from a branch` 선택
4. **Branch** → `main` / `/ (root)` 선택 후 **Save**
5. 1~2분 후 `https://<your-username>.github.io/weather-calendar` 접속!

---

## ✨ 기능

- 📅 **월별 달력** — 1월~12월 전체 또는 개별 월 보기
- 🎯 **예보 vs 실측** — 날짜별 A/B/C 코드로 나란히 비교
- ✅ **일치/불일치 표시** — 초록 테두리(일치) / 빨간 테두리(불일치)
- 🔍 **필터** — 전체 / 일치만 / 불일치만
- 📊 **통계 카드** — 연간 예보 정확도, 날씨별 일수, 총강수량
- 📱 **반응형** — 모바일/태블릿/데스크탑 모두 지원

---

## 📊 2025년 결과 요약

| 항목 | 값 |
|---|---|
| 예보 정확도 | **41.9%** (153일 일치 / 212일 불일치) |
| 연간 총강수량 | **1,327.5mm** |
| 예보 맑음(A) | 56일 |
| 예보 흐림(B) | 180일 |
| 예보 비(C) | 129일 |
| 실측 맑음(A) | 185일 |
| 실측 흐림(B) | 116일 |
| 실측 비(C) | 64일 |
