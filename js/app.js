// Thai Easy Card — 主程式
'use strict';

// ── 狀態 ──────────────────────────────────────────────────────────
let queue = [];
let currentIdx = 0;
let isFlipped = false;
let currentCard = null;
let imageCache = {};
let settings = getSettings();

// ── DOM ───────────────────────────────────────────────────────────
const el = {
  screen: {
    study:    document.getElementById('screen-study'),
    stats:    document.getElementById('screen-stats'),
    settings: document.getElementById('screen-settings'),
  },
  card:        document.getElementById('card'),
  cardFront:   document.getElementById('front-content'),
  cardBack:    document.getElementById('back-content'),
  cardImage:   document.getElementById('card-image'),
  cardType:    document.getElementById('card-type-label'),
  progress:    document.getElementById('progress'),
  progressBar: document.getElementById('progress-bar'),
  btnFlip:     document.getElementById('btn-flip'),
  btnAudio:    document.getElementById('btn-audio'),
  gradeRow:    document.getElementById('grade-row'),
  emptyState:  document.getElementById('empty-state'),
  navBtns:     document.querySelectorAll('[data-nav]'),
  // 統計
  statTotal:   document.getElementById('stat-total'),
  statDue:     document.getElementById('stat-due'),
  statLearned: document.getElementById('stat-learned'),
  // 設定
  settingDailyNew: document.getElementById('setting-daily-new'),
  settingImage:    document.getElementById('setting-image'),
  settingCardTypes: document.querySelectorAll('[name="cardType"]'),
  btnSaveSettings:  document.getElementById('btn-save-settings'),
  btnResetAll:      document.getElementById('btn-reset-all'),
};

// 卡片類型中文標籤
const CARD_TYPE_LABEL = {
  zh2th:        '中 → 泰',
  th2zh:        '泰 → 中',
  blind_read:   '盲讀卡',
  blind_listen: '盲聽卡',
};

// ── 初始化 ────────────────────────────────────────────────────────
async function init() {
  await TTS.init();
  loadStudyScreen();
  bindEvents();
  showScreen('study');
}

function loadStudyScreen() {
  settings = getSettings();
  queue = getTodayQueue(VOCABULARY, settings);
  currentIdx = 0;
  renderCard();
  renderProgress();
}

// ── 渲染卡片 ──────────────────────────────────────────────────────
function renderCard() {
  if (currentIdx >= queue.length) {
    showEmptyState(true);
    return;
  }
  showEmptyState(false);
  isFlipped = false;
  currentCard = queue[currentIdx];
  el.card.classList.remove('flipped');
  el.gradeRow.classList.add('hidden');
  el.btnFlip.classList.remove('hidden');

  el.cardType.textContent = CARD_TYPE_LABEL[currentCard.cardType] || '';

  renderFront(currentCard);
  renderBack(currentCard);
  loadImage(currentCard);
}

function renderFront(card) {
  el.cardFront.innerHTML = '';
  const type = card.cardType;

  if (type === 'zh2th') {
    el.cardFront.innerHTML = `
      <div class="card-chinese">${card.chinese}</div>
      <div class="card-pos">${card.pos}</div>`;
  } else if (type === 'th2zh') {
    el.cardFront.innerHTML = `
      <div class="card-thai">${card.thai}</div>`;
    setTimeout(() => TTS.speak(card.thai), 300);
  } else if (type === 'blind_read') {
    el.cardFront.innerHTML = `
      <div class="card-thai">${card.thai}</div>
      <div class="card-hint">看著泰文，試著在心中發音</div>`;
  } else if (type === 'blind_listen') {
    el.cardFront.innerHTML = `
      <div class="card-blind-listen">
        <div class="listen-icon">🔊</div>
        <div class="card-hint">仔細聆聽，辨識是哪個泰文字</div>
      </div>`;
    setTimeout(() => TTS.speak(card.thai), 500);
  }
}

function renderBack(card) {
  el.cardBack.innerHTML = '';
  const type = card.cardType;

  if (type === 'zh2th') {
    el.cardBack.innerHTML = `
      <div class="card-thai">${card.thai}</div>
      <div class="card-example">
        <span class="example-thai">${card.example.thai}</span>
        <span class="example-zh">${card.example.chinese}</span>
      </div>`;
  } else if (type === 'th2zh') {
    el.cardBack.innerHTML = `
      <div class="card-chinese">${card.chinese}</div>
      <div class="card-pos">${card.pos}</div>
      <div class="card-example">
        <span class="example-thai">${card.example.thai}</span>
        <span class="example-zh">${card.example.chinese}</span>
      </div>`;
  } else if (type === 'blind_read') {
    el.cardBack.innerHTML = `
      <div class="card-audio-prompt">翻面後請大聲跟讀 ↓</div>
      <div class="card-chinese">${card.chinese}</div>
      <div class="card-pos">${card.pos}</div>`;
  } else if (type === 'blind_listen') {
    el.cardBack.innerHTML = `
      <div class="card-thai">${card.thai}</div>
      <div class="card-chinese">${card.chinese}</div>`;
  }
}

function flipCard() {
  if (isFlipped) return;
  isFlipped = true;
  el.card.classList.add('flipped');
  el.gradeRow.classList.remove('hidden');
  el.btnFlip.classList.add('hidden');

  // 翻面後的動作
  const type = currentCard.cardType;
  if (type === 'zh2th' || type === 'blind_read') {
    TTS.speak(currentCard.thai);
  } else if (type === 'blind_listen') {
    // 不再重播，等用戶確認
  }
}

// ── 評分 ──────────────────────────────────────────────────────────
function gradeCard(grade) {
  recordGrade(currentCard.cardId, grade);

  // grade=0 → 把卡插回隊列後段
  if (grade === 0) {
    const insertAt = Math.min(currentIdx + 3, queue.length);
    queue.splice(insertAt, 0, { ...currentCard });
  }

  currentIdx++;
  renderCard();
  renderProgress();
}

// ── 圖片 ──────────────────────────────────────────────────────────
function loadImage(card) {
  if (!settings.imageEnabled || !card.imageQuery) {
    el.cardImage.style.display = 'none';
    return;
  }
  const query = encodeURIComponent(card.imageQuery);
  const url = `https://source.unsplash.com/400x220/?${query}`;

  if (imageCache[card.id]) {
    el.cardImage.src = imageCache[card.id];
    el.cardImage.style.display = 'block';
    return;
  }

  el.cardImage.style.display = 'none';
  const img = new Image();
  img.onload = () => {
    imageCache[card.id] = url;
    if (currentCard && currentCard.id === card.id) {
      el.cardImage.src = url;
      el.cardImage.style.display = 'block';
    }
  };
  img.src = url;
}

// ── 進度條 ────────────────────────────────────────────────────────
function renderProgress() {
  const total = queue.filter((c, i) => {
    // 計算不重複的卡片數（排除 Again 重插的）
    return !queue.slice(0, i).some(prev => prev.cardId === c.cardId);
  }).length;
  const done = Math.min(currentIdx, total);
  el.progress.textContent = `${done} / ${total}`;
  el.progressBar.style.width = total > 0 ? `${(done / total) * 100}%` : '0%';
}

// ── 統計頁面 ──────────────────────────────────────────────────────
function renderStats() {
  const stats = getStats();
  el.statTotal.textContent = stats.total;
  el.statDue.textContent = stats.due;
  el.statLearned.textContent = stats.learned;
}

// ── 設定頁面 ──────────────────────────────────────────────────────
function renderSettingsUI() {
  el.settingDailyNew.value = settings.dailyNewCards;
  el.settingImage.checked = settings.imageEnabled;
  el.settingCardTypes.forEach(cb => {
    cb.checked = settings.cardTypes.includes(cb.value);
  });
}

function saveSettingsUI() {
  const cardTypes = [...el.settingCardTypes]
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  if (cardTypes.length === 0) {
    alert('請至少選擇一種卡片類型');
    return;
  }
  settings = {
    ...settings,
    dailyNewCards: parseInt(el.settingDailyNew.value) || 10,
    imageEnabled: el.settingImage.checked,
    cardTypes,
  };
  saveSettings(settings);
  showScreen('study');
  loadStudyScreen();
}

// ── 畫面切換 ──────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(el.screen).forEach(s => s.classList.add('hidden'));
  el.screen[name].classList.remove('hidden');
  el.navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.nav === name);
  });

  if (name === 'stats') renderStats();
  if (name === 'settings') renderSettingsUI();
}

function showEmptyState(show) {
  el.emptyState.classList.toggle('hidden', !show);
  el.card.classList.toggle('hidden', show);
  el.btnFlip.classList.toggle('hidden', show);
  el.gradeRow.classList.add('hidden');
  el.progress.textContent = show ? '完成 🎉' : '';
}

// ── 事件綁定 ──────────────────────────────────────────────────────
function bindEvents() {
  // 翻牌
  el.btnFlip.addEventListener('click', flipCard);
  el.card.addEventListener('click', () => { if (!isFlipped) flipCard(); });

  // 音頻按鈕
  el.btnAudio.addEventListener('click', () => {
    if (currentCard) TTS.speak(currentCard.thai);
  });

  // 評分按鈕
  document.querySelectorAll('[data-grade]').forEach(btn => {
    btn.addEventListener('click', () => gradeCard(parseInt(btn.dataset.grade)));
  });

  // 導航
  el.navBtns.forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.nav));
  });

  // 設定儲存
  el.btnSaveSettings.addEventListener('click', saveSettingsUI);

  // 重置所有資料
  el.btnResetAll.addEventListener('click', () => {
    if (confirm('確定要清除所有學習記錄嗎？此操作無法復原。')) {
      localStorage.removeItem(SRS_STORAGE_KEY);
      loadStudyScreen();
      showScreen('study');
    }
  });

  // 鍵盤快捷鍵
  document.addEventListener('keydown', (e) => {
    const screen = Object.entries(el.screen).find(([, s]) => !s.classList.contains('hidden'));
    if (!screen || screen[0] !== 'study') return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (!isFlipped) flipCard();
    }
    if (isFlipped) {
      if (e.key === '1') gradeCard(0); // Again
      if (e.key === '2') gradeCard(1); // Hard
      if (e.key === '3') gradeCard(2); // Good
      if (e.key === '4') gradeCard(3); // Easy
    }
    if (e.key === 'r' || e.key === 'R') {
      if (currentCard) TTS.speak(currentCard.thai);
    }
  });
}

// ── 啟動 ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
