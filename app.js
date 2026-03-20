/* ── 상수 ── */
const MONTHS   = ['전체','1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
const DAYS_KR  = ['월','화','수','목','금','토','일'];
const DIM      = [0,31,28,31,30,31,30,31,31,30,31,30,31];

let currentMonth  = 0;   // 0 = 전체
let currentFilter = 'all';

/* ── 유틸 ── */
function byMonth(m) {
  return m === 0 ? WEATHER_DATA : WEATHER_DATA.filter(r => r.m === m);
}
function applyFilter(rows, filter) {
  if (filter === 'O') return rows.filter(r => r.ok);
  if (filter === 'X') return rows.filter(r => !r.ok);
  return rows;
}
function getFirstDow(m) {
  return new Date(2025, m - 1, 1).getDay(); // 0=일
}
function dowToCol(dow) {
  // 일=6, 월=0 … 토=5 → 달력 열(0=월 기준)
  return (dow + 6) % 7;
}

/* ── 연간 통계 카드 ── */
function renderStats() {
  const all = WEATHER_DATA;
  const ok  = all.filter(r => r.ok).length;
  const acc = Math.round(ok / all.length * 100);
  const fcA = all.filter(r => r.fc  === 'A').length;
  const fcB = all.filter(r => r.fc  === 'B').length;
  const fcC = all.filter(r => r.fc  === 'C').length;
  const acA = all.filter(r => r.act === 'A').length;
  const acB = all.filter(r => r.act === 'B').length;
  const acC = all.filter(r => r.act === 'C').length;
  const mm  = all.reduce((s, r) => s + r.mm, 0).toFixed(0);

  const cards = [
    { cls:'',      num: `${acc}%`,   label: '연간 예보 정확도' },
    { cls:'match', num: ok,          label: `✅ 일치 (${all.length-ok}일 불일치)` },
    { cls:'a',     num: `${fcA}일`,  label: '예보 A 맑음' },
    { cls:'b',     num: `${fcB}일`,  label: '예보 B 흐림' },
    { cls:'c',     num: `${fcC}일`,  label: '예보 C 비' },
    { cls:'a',     num: `${acA}일`,  label: '실측 A 맑음' },
    { cls:'b',     num: `${acB}일`,  label: '실측 B 흐림' },
    { cls:'c',     num: `${acC}일`,  label: '실측 C 비' },
    { cls:'',      num: `${mm}mm`,   label: '연간 총강수량' },
  ];

  document.getElementById('statsGrid').innerHTML = cards.map(c =>
    `<div class="stat-card ${c.cls}">
       <div class="stat-num">${c.num}</div>
       <div class="stat-label">${c.label}</div>
     </div>`
  ).join('');
}

/* ── 월 탭 ── */
function renderMonthTabs() {
  const wrap = document.getElementById('monthTabs');
  wrap.innerHTML = MONTHS.map((name, i) =>
    `<button class="month-tab ${i === currentMonth ? 'active' : ''}"
             data-m="${i}">${name}</button>`
  ).join('');
  wrap.querySelectorAll('.month-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMonth = +btn.dataset.m;
      render();
    });
  });
}

/* ── 필터 버튼 ── */
function renderFilterBtns() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      render();
    });
  });
}

/* ── 월별 통계 바 ── */
function renderMonthStats() {
  const months = currentMonth === 0 ? [1,2,3,4,5,6,7,8,9,10,11,12] : [currentMonth];
  const el = document.getElementById('monthStats');

  if (currentMonth !== 0) {
    const md  = byMonth(currentMonth);
    const ok  = md.filter(r => r.ok).length;
    const acc = md.length ? Math.round(ok / md.length * 100) : 0;
    const fcA = md.filter(r => r.fc === 'A').length;
    const fcB = md.filter(r => r.fc === 'B').length;
    const fcC = md.filter(r => r.fc === 'C').length;
    const acA = md.filter(r => r.act === 'A').length;
    const acB = md.filter(r => r.act === 'B').length;
    const acC = md.filter(r => r.act === 'C').length;
    const mm  = md.reduce((s,r)=>s+r.mm,0).toFixed(1);

    el.innerHTML = `
      <span style="font-weight:700;color:#1F4E79">${MONTHS[currentMonth]}</span>
      <span class="ms-sep">|</span>
      <span class="ms-item">예보 <span class="ms-badge A">A</span>${fcA}일
        <span class="ms-badge B">B</span>${fcB}일
        <span class="ms-badge C">C</span>${fcC}일</span>
      <span class="ms-sep">|</span>
      <span class="ms-item">실측 <span class="ms-badge A">A</span>${acA}일
        <span class="ms-badge B">B</span>${acB}일
        <span class="ms-badge C">C</span>${acC}일</span>
      <span class="ms-sep">|</span>
      <span class="ms-item">강수량 <strong>${mm}mm</strong></span>
      <span class="ms-sep">|</span>
      <span class="acc-bar-wrap">
        <span style="font-size:.8rem;color:#555">정확도</span>
        <div class="acc-bar-bg"><div class="acc-bar-fill" style="width:${acc}%"></div></div>
        <span class="acc-label">${acc}%</span>
      </span>`;
  } else {
    el.innerHTML = `<span style="font-size:.85rem;color:#555">월을 선택하면 해당 월 상세 통계가 표시됩니다.</span>`;
  }
}

/* ── 달력 1개월 HTML ── */
function buildMonthHtml(m) {
  const md      = byMonth(m);
  const byDay   = {};
  md.forEach(r => { byDay[r.d] = r; });

  const dim      = DIM[m];
  const firstDow = dowToCol(new Date(2025, m - 1, 1).getDay()); // 0=월 기준
  const ok       = md.filter(r => r.ok).length;
  const acc      = Math.round(ok / md.length * 100);
  const mm       = md.reduce((s,r)=>s+r.mm,0).toFixed(1);

  // 달력 셀 배열 (null = 빈 칸)
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  let weeksHtml = '';
  for (let w = 0; w < cells.length / 7; w++) {
    weeksHtml += '<div class="week-row">';
    for (let i = 0; i < 7; i++) {
      const day  = cells[w * 7 + i];
      const isSat = (i === 5), isSun = (i === 6);
      if (!day) {
        weeksHtml += '<div class="day-cell empty"></div>';
        continue;
      }
      const r = byDay[day];
      let cls = 'day-cell';
      if (isSat) cls += ' sat';
      if (isSun) cls += ' sun';

      if (r) {
        const shouldFade = (currentFilter === 'O' && !r.ok) || (currentFilter === 'X' && r.ok);
        cls += r.ok ? ' match' : ' miss';
        if (shouldFade) cls += ' faded';

        weeksHtml += `<div class="${cls}">
          <div class="day-num-bar">
            <span class="day-num">${day}</span>
            <span class="match-icon">${r.ok ? '✅' : '❌'}</span>
          </div>
          <div class="wx-rows">
            <div class="wx-row">
              <span class="wx-lbl">예)</span>
              <span class="wx-badge ${r.fc}">${r.fc}</span>
            </div>
            <div class="wx-row">
              <span class="wx-lbl">실)</span>
              <span class="wx-badge ${r.act}">${r.act}</span>
            </div>
          </div>
          <div class="day-val">${r.prob}% / ${r.mm}mm</div>
        </div>`;
      } else {
        weeksHtml += `<div class="${cls}">
          <div class="day-num-bar"><span class="day-num">${day}</span></div>
        </div>`;
      }
    }
    weeksHtml += '</div>';
  }

  return `
    <div class="month-block">
      <div class="month-title-bar">
        2025년 ${MONTHS[m]}
        <span>정확도 ${acc}% · 강수량 ${mm}mm · 일치 ${ok}일 / 불일치 ${md.length - ok}일</span>
      </div>
      <div class="cal-grid">
        <div class="dow-header">
          ${DAYS_KR.map(d => `<div>${d}</div>`).join('')}
        </div>
        ${weeksHtml}
      </div>
    </div>`;
}

/* ── 전체 렌더 ── */
function render() {
  renderMonthTabs();
  renderFilterBtns();
  renderMonthStats();

  const months = currentMonth === 0
    ? [1,2,3,4,5,6,7,8,9,10,11,12]
    : [currentMonth];

  document.getElementById('calendarWrap').innerHTML =
    months.map(m => buildMonthHtml(m)).join('');
}

/* ── 초기화 ── */
renderStats();
render();
