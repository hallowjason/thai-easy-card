// Thai Easy Card — 主程式
'use strict';

// ── 卡片類型常數 ──────────────────────────────────────────────────
const CARD_TYPES = { ZH2TH: 'zh2th', TH2ZH: 'th2zh', BLIND_READ: 'blind_read', BLIND_LISTEN: 'blind_listen' };
// Topic practice always uses ZH2TH — one card type keeps the session focused
const TOPIC_CARD_TYPE = CARD_TYPES.ZH2TH;
const CARD_TYPE_LABEL = {
  [CARD_TYPES.ZH2TH]:       '中 → 泰',
  [CARD_TYPES.TH2ZH]:       '泰 → 中',
  [CARD_TYPES.BLIND_READ]:  '盲讀卡',
  [CARD_TYPES.BLIND_LISTEN]:'盲聽卡',
};

// ── 狀態 ──────────────────────────────────────────────────────────
let queue = [];
let currentIdx = 0;
let isFlipped = false;
let currentCard = null;
let imageCache = {};
let settings;

// ── 主題練習狀態 ──────────────────────────────────────────────────
let topicQueue = [];
let topicIdx = 0;
let topicFlipped = false;
let topicCard = null;

// ── 字母頁狀態 ────────────────────────────────────────────────────
let alphaFilter = 'all';

// ── DOM ───────────────────────────────────────────────────────────
const el = {
  screen: {
    study:    document.getElementById('screen-study'),
    stats:    document.getElementById('screen-stats'),
    alphabet: document.getElementById('screen-alphabet'),
    topics:   document.getElementById('screen-topics'),
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
  emptySub:    document.getElementById('empty-sub'),
  navBtns:     document.querySelectorAll('[data-nav]'),
  statTotal:   document.getElementById('stat-total'),
  statDue:     document.getElementById('stat-due'),
  statLearned: document.getElementById('stat-learned'),
  settingDailyNew:  document.getElementById('setting-daily-new'),
  settingImage:     document.getElementById('setting-image'),
  settingCardTypes: document.querySelectorAll('[name="cardType"]'),
  btnSaveSettings:  document.getElementById('btn-save-settings'),
  btnResetAll:      document.getElementById('btn-reset-all'),
  // 里程進度
  milestoneBar:   document.getElementById('milestone-bar'),
  milestoneText:  document.getElementById('milestone-text'),
  milestonePct:   document.getElementById('milestone-pct'),
  streakCurrent:  document.getElementById('streak-current'),
  streakLongest:  document.getElementById('streak-longest'),
  streakToday:    document.getElementById('streak-today'),
  // 通知設定
  settingNotif:        document.getElementById('setting-notification'),
  notifTimeRow:        document.getElementById('notification-time-row'),
  settingNotifHour:    document.getElementById('setting-notif-hour'),
  settingNotifMinute:  document.getElementById('setting-notif-minute'),
  btnRequestPerm:      document.getElementById('btn-request-permission'),
  // 字母頁
  alphaGrid:   document.getElementById('alpha-grid'),
  alphaFilter: document.getElementById('alpha-filter'),
  // 主題
  topicGrid:       document.getElementById('topic-grid'),
  topicList:       document.getElementById('topic-list'),
  topicPractice:   document.getElementById('topic-practice'),
  topicPracticeTitle: document.getElementById('topic-practice-title'),
  topicCard:       document.getElementById('topic-card'),
  topicFront:      document.getElementById('topic-front-content'),
  topicBack:       document.getElementById('topic-back-content'),
  topicCardType:   document.getElementById('topic-card-type-label'),
  topicProgress:   document.getElementById('topic-progress'),
  topicProgressBar:document.getElementById('topic-progress-bar'),
  topicEmpty:      document.getElementById('topic-empty'),
  topicActionRow:  document.getElementById('topic-action-row'),
  topicGradeRow:   document.getElementById('topic-grade-row'),
  btnTopicFlip:    document.getElementById('btn-topic-flip'),
  btnTopicAudio:   document.getElementById('btn-topic-audio'),
  btnTopicBack:    document.getElementById('btn-topic-back'),
  // 自訂詞彙
  customVocabCount: document.getElementById('custom-vocab-count'),
  btnShowCvForm:    document.getElementById('btn-show-cv-form'),
  cvFormPanel:      document.getElementById('cv-form-panel'),
  cvThai:           document.getElementById('cv-thai'),
  cvChinese:        document.getElementById('cv-chinese'),
  cvPos:            document.getElementById('cv-pos'),
  cvCategory:       document.getElementById('cv-category'),
  cvExampleThai:    document.getElementById('cv-example-thai'),
  cvExampleZh:      document.getElementById('cv-example-zh'),
  btnCvSave:        document.getElementById('btn-cv-save'),
  btnCvCancel:      document.getElementById('btn-cv-cancel'),
  cvList:           document.getElementById('cv-list'),
};

// ── 合併詞彙（內建 + 自訂）───────────────────────────────────────
function getAllVocab() {
  return [...VOCABULARY, ...getCustomVocab()];
}

// ── 初始化 ────────────────────────────────────────────────────────
async function init() {
  await TTS.init();
  settings = getSettings();
  populateCvCategorySelect();
  loadStudyScreen();
  bindEvents();
  showScreen('study');
  NotificationManager.init(settings);
}

function loadStudyScreen() {
  settings = getSettings();
  queue = getTodayQueue(getAllVocab(), settings);
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

  // 瞬間重置卡片位置，避免前一張背面在動畫中閃過
  el.card.style.transition = 'none';
  el.card.classList.remove('flipped');
  void el.card.offsetWidth; // force reflow
  el.card.style.transition = '';

  el.gradeRow.classList.add('hidden');
  el.btnFlip.classList.remove('hidden');
  el.cardType.textContent = CARD_TYPE_LABEL[currentCard.cardType] || '';
  renderFront(currentCard);
  renderBack(currentCard);
  loadImage(currentCard);
}

function exampleHTML(card) {
  if (!card.example || (!card.example.thai && !card.example.chinese)) return '';
  return `<div class="card-example">
    <span class="example-thai">${card.example.thai}</span>
    <span class="example-zh">${card.example.chinese}</span>
  </div>`;
}

function renderFront(card) {
  const { ZH2TH, TH2ZH, BLIND_READ, BLIND_LISTEN } = CARD_TYPES;
  const t = card.cardType;

  if (t === ZH2TH) {
    el.cardFront.innerHTML = `<div class="card-chinese">${card.chinese}</div><div class="card-pos">${card.pos}</div>`;
  } else if (t === TH2ZH) {
    el.cardFront.innerHTML = `<div class="card-thai">${card.thai}</div>`;
    setTimeout(() => TTS.speak(card.thai, card.id), 300);
  } else if (t === BLIND_READ) {
    el.cardFront.innerHTML = `<div class="card-thai">${card.thai}</div><div class="card-hint">看著泰文，試著在心中發音</div>`;
  } else if (t === BLIND_LISTEN) {
    el.cardFront.innerHTML = `<div class="card-blind-listen"><div class="listen-icon">🔊</div><div class="card-hint">仔細聆聽，辨識是哪個泰文字</div></div>`;
    setTimeout(() => TTS.speak(card.thai, card.id), 500);
  }
}

function renderBack(card) {
  const { ZH2TH, TH2ZH, BLIND_READ, BLIND_LISTEN } = CARD_TYPES;
  const t = card.cardType;

  if (t === ZH2TH) {
    el.cardBack.innerHTML = `<div class="card-thai">${card.thai}</div>${exampleHTML(card)}`;
  } else if (t === TH2ZH) {
    el.cardBack.innerHTML = `<div class="card-chinese">${card.chinese}</div><div class="card-pos">${card.pos}</div>${exampleHTML(card)}`;
  } else if (t === BLIND_READ) {
    el.cardBack.innerHTML = `<div class="card-audio-prompt">翻面後請大聲跟讀 ↓</div><div class="card-chinese">${card.chinese}</div><div class="card-pos">${card.pos}</div>`;
  } else if (t === BLIND_LISTEN) {
    el.cardBack.innerHTML = `<div class="card-thai">${card.thai}</div><div class="card-chinese">${card.chinese}</div>`;
  }
}

function flipCard() {
  if (isFlipped) return;
  isFlipped = true;
  el.card.classList.add('flipped');
  el.gradeRow.classList.remove('hidden');
  el.btnFlip.classList.add('hidden');

  const { ZH2TH, BLIND_READ } = CARD_TYPES;
  if (currentCard.cardType === ZH2TH || currentCard.cardType === BLIND_READ) {
    TTS.speak(currentCard.thai, currentCard.id);
  }
}

// ── 評分 ──────────────────────────────────────────────────────────
function gradeCard(grade) {
  recordGrade(currentCard.cardId, grade);
  if (grade === 0) {
    queue.splice(Math.min(currentIdx + 3, queue.length), 0, { ...currentCard });
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
  if (imageCache[card.id]) {
    el.cardImage.src = imageCache[card.id];
    el.cardImage.style.display = 'block';
    return;
  }
  el.cardImage.style.display = 'none';
  const url = `https://source.unsplash.com/400x220/?${encodeURIComponent(card.imageQuery)}`;
  const img = new Image();
  img.onload = () => {
    imageCache[card.id] = url;
    if (currentCard?.id === card.id) {
      el.cardImage.src = url;
      el.cardImage.style.display = 'block';
    }
  };
  img.src = url;
}

// ── 進度條 ────────────────────────────────────────────────────────
function renderProgress() {
  const total = new Set(queue.map(c => c.cardId)).size;
  const done = Math.min(currentIdx, total);
  el.progress.textContent = `${done} / ${total}`;
  el.progressBar.style.width = total > 0 ? `${(done / total) * 100}%` : '0%';
}

// ── 統計 ──────────────────────────────────────────────────────────
function renderStats() {
  const stats = getStats();
  el.statTotal.textContent = stats.total;
  el.statDue.textContent = stats.due;
  el.statLearned.textContent = stats.learned;

  const vocabTotal = stats.vocabTotal + getCustomVocab().length;
  const pct = vocabTotal > 0 ? Math.round((stats.vocabLearned / vocabTotal) * 100) : 0;
  el.milestoneBar.style.width = `${pct}%`;
  el.milestoneText.textContent = `${stats.vocabLearned} / ${vocabTotal} 詞彙`;
  el.milestonePct.textContent = `${pct}%`;

  el.streakCurrent.textContent = stats.streak;
  el.streakLongest.textContent = stats.longestStreak;
  el.streakToday.textContent = stats.todayReviewed;
}

// ── 設定 ──────────────────────────────────────────────────────────
function renderSettingsUI() {
  el.settingDailyNew.value = settings.dailyNewCards;
  el.settingImage.checked = settings.imageEnabled;
  el.settingCardTypes.forEach(cb => {
    cb.checked = settings.cardTypes.includes(cb.value);
  });
  el.settingNotif.checked = settings.notificationEnabled || false;
  el.settingNotifHour.value = settings.notificationHour ?? 20;
  el.settingNotifMinute.value = settings.notificationMinute ?? 0;
  el.notifTimeRow.classList.toggle('hidden', !settings.notificationEnabled);
}

function saveSettingsUI() {
  const cardTypes = [...el.settingCardTypes].filter(cb => cb.checked).map(cb => cb.value);
  if (cardTypes.length === 0) { alert('請至少選擇一種卡片類型'); return; }
  settings = {
    ...settings,
    dailyNewCards: parseInt(el.settingDailyNew.value, 10) || 10,
    imageEnabled: el.settingImage.checked,
    cardTypes,
    notificationEnabled: el.settingNotif.checked,
    notificationHour: parseInt(el.settingNotifHour.value, 10) || 20,
    notificationMinute: parseInt(el.settingNotifMinute.value, 10) || 0,
  };
  saveSettings(settings);
  NotificationManager.init(settings);
  showScreen('study');
  loadStudyScreen();
}

// ── 畫面切換 ──────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(el.screen).forEach(s => s.classList.add('hidden'));
  el.screen[name].classList.remove('hidden');
  el.navBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.nav === name));
  if (name === 'stats')    renderStats();
  if (name === 'settings') renderSettingsUI();
  if (name === 'alphabet') renderAlphabet();
  if (name === 'topics')   renderTopicList();
}

function showEmptyState(show) {
  el.emptyState.classList.toggle('hidden', !show);
  el.card.classList.toggle('hidden', show);
  el.btnFlip.classList.toggle('hidden', show);
  el.gradeRow.classList.add('hidden');
  if (show) {
    el.progress.textContent = '完成 🎉';
    markTodayCompleted();
    const stats = getStats();
    el.emptySub.textContent = `今日複習 ${stats.todayReviewed} 張 ・ 連續 ${stats.streak} 天`;
  }
}

// ── 字母頁 ────────────────────────────────────────────────────────
function renderAlphabet() {
  el.alphaGrid.innerHTML = '';
  const list = alphaFilter === 'all' ? ALPHABET : ALPHABET.filter(a => a.toneClass === alphaFilter);

  list.forEach(a => {
    const card = document.createElement('div');
    card.className = 'alpha-card';

    const toneLabel = { mid: '中音', low: '低音', high: '高音' }[a.toneClass] || '';
    card.innerHTML = `
      <button class="alpha-tts">🔊</button>
      <span class="alpha-tone-badge ${a.toneClass}">${toneLabel}</span>
      <span class="alpha-char tone-${a.toneClass}">${a.thai}</span>
      <div class="alpha-sound">${a.sound}</div>
      <div class="alpha-name">${a.name}</div>
      <div class="alpha-mascot">${a.mascot}</div>
      <div class="alpha-tip">${a.tip}</div>
    `;

    card.querySelector('.alpha-tts').addEventListener('click', e => {
      e.stopPropagation();
      TTS.speak(a.thai);
    });
    card.addEventListener('click', () => card.classList.toggle('expanded'));

    el.alphaGrid.appendChild(card);
  });
}

// ── 主題分頁 ──────────────────────────────────────────────────────
function renderTopicList() {
  el.topicList.classList.remove('hidden');
  el.topicPractice.classList.add('hidden');
  el.topicGrid.innerHTML = '';

  const allVocab = getAllVocab();
  const srsData = getSRSData();

  // 更新自訂詞彙計數
  const customCount = getCustomVocab().length;
  el.customVocabCount.textContent = `自訂詞彙 ${customCount} 個`;

  // 渲染自訂詞彙列表（若表單已展開）
  renderCustomVocabList();

  CATEGORIES.forEach(cat => {
    const vocabs = allVocab.filter(v => v.category === cat.id);
    if (vocabs.length === 0) return;

    const learnedCount = vocabs.filter(v =>
      settings.cardTypes.some(t => {
        const id = generateCardId(v.id, t);
        return srsData[id] && srsData[id].lastReview;
      })
    ).length;
    const pct = vocabs.length > 0 ? Math.round((learnedCount / vocabs.length) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'topic-card';
    card.innerHTML = `
      <div class="topic-emoji">${cat.emoji}</div>
      <div class="topic-name">${cat.label}</div>
      <div class="topic-count">${learnedCount}/${vocabs.length} 已學</div>
      <div class="topic-progress-bar">
        <div class="topic-progress-fill" style="width:${pct}%"></div>
      </div>
    `;
    card.addEventListener('click', () => startTopicPractice(cat.id, `${cat.emoji} ${cat.label}`));
    el.topicGrid.appendChild(card);
  });
}

function startTopicPractice(categoryId, label) {
  const vocabs = getAllVocab().filter(v => v.category === categoryId);
  topicQueue = shuffle([...vocabs]);
  topicIdx = 0;
  topicFlipped = false;
  topicCard = null;

  el.topicPracticeTitle.textContent = label;
  el.topicList.classList.add('hidden');
  el.topicPractice.classList.remove('hidden');

  renderTopicCard();
}

function renderTopicCard() {
  if (topicIdx >= topicQueue.length) {
    el.topicEmpty.classList.remove('hidden');
    el.topicCard.classList.add('hidden');
    el.topicActionRow.classList.add('hidden');
    el.topicGradeRow.classList.add('hidden');
    el.topicProgress.textContent = '完成 ✅';
    return;
  }
  el.topicEmpty.classList.add('hidden');
  el.topicCard.classList.remove('hidden');
  el.topicActionRow.classList.remove('hidden');

  topicFlipped = false;
  topicCard = topicQueue[topicIdx];

  // 瞬間重置主題卡片位置，避免前一張背面閃過
  el.topicCard.style.transition = 'none';
  el.topicCard.classList.remove('flipped');
  void el.topicCard.offsetWidth; // force reflow
  el.topicCard.style.transition = '';

  el.topicGradeRow.classList.add('hidden');
  el.btnTopicFlip.classList.remove('hidden');
  el.topicCardType.textContent = '中 → 泰';
  renderTopicFront();
  renderTopicBack();

  const total = topicQueue.length;
  el.topicProgress.textContent = `${topicIdx} / ${total}`;
  el.topicProgressBar.style.width = `${(topicIdx / total) * 100}%`;
}

function renderTopicFront() {
  el.topicFront.innerHTML = `<div class="card-chinese">${topicCard.chinese}</div><div class="card-pos">${topicCard.pos}</div>`;
}

function renderTopicBack() {
  el.topicBack.innerHTML = `<div class="card-thai">${topicCard.thai}</div>${exampleHTML(topicCard)}`;
}

function flipTopicCard() {
  if (topicFlipped) return;
  topicFlipped = true;
  el.topicCard.classList.add('flipped');
  el.topicGradeRow.classList.remove('hidden');
  el.btnTopicFlip.classList.add('hidden');
  TTS.speak(topicCard.thai, topicCard.id);
}

function gradeTopicCard(grade) {
  const cardId = generateCardId(topicCard.id, TOPIC_CARD_TYPE);
  recordGrade(cardId, grade);
  if (grade === 0) {
    topicQueue.splice(Math.min(topicIdx + 3, topicQueue.length), 0, { ...topicCard });
  }
  topicIdx++;
  renderTopicCard();
}

// ── 自訂詞彙 ──────────────────────────────────────────────────────
function populateCvCategorySelect() {
  el.cvCategory.innerHTML = CATEGORIES.map(c =>
    `<option value="${c.id}">${c.emoji} ${c.label}</option>`
  ).join('');
}

function renderCustomVocabList() {
  const list = getCustomVocab();
  if (!el.cvList) return;
  if (list.length === 0) {
    el.cvList.innerHTML = '';
    return;
  }
  el.cvList.innerHTML = list.map(w => `
    <div class="cv-list-item">
      <div class="cv-word-info">
        <div class="cv-word-thai">${w.thai}</div>
        <div class="cv-word-zh">${w.chinese} · ${w.pos}</div>
      </div>
      <button class="cv-delete" data-cv-id="${w.id}" title="刪除">✕</button>
    </div>
  `).join('');

  el.cvList.querySelectorAll('[data-cv-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteCustomWord(btn.dataset.cvId);
      renderTopicList();
    });
  });
}

function saveCvForm() {
  const thai = el.cvThai.value.trim();
  const chinese = el.cvChinese.value.trim();
  if (!thai || !chinese) { alert('泰文和中文意思為必填欄位'); return; }

  addCustomWord({
    thai,
    chinese,
    pos: el.cvPos.value,
    category: el.cvCategory.value,
    exampleThai: el.cvExampleThai.value.trim(),
    exampleChinese: el.cvExampleZh.value.trim(),
  });

  // 清空表單
  el.cvThai.value = '';
  el.cvChinese.value = '';
  el.cvExampleThai.value = '';
  el.cvExampleZh.value = '';

  loadStudyScreen(); // 重建今日佇列以加入新詞
  renderTopicList();
}

// ── 事件綁定 ──────────────────────────────────────────────────────
function bindEvents() {
  // 學習頁
  el.btnFlip.addEventListener('click', flipCard);
  el.card.addEventListener('click', () => { if (!isFlipped) flipCard(); });
  el.btnAudio.addEventListener('click', () => { if (currentCard) TTS.speak(currentCard.thai, currentCard.id); });

  // 左右滑動手勢
  let touchStartX = 0;
  el.card.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  el.card.addEventListener('touchend', e => {
    if (!isFlipped) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 60) return;
    gradeCard(dx > 0 ? 3 : 0);
  });

  document.querySelectorAll('[data-grade]').forEach(btn => {
    btn.addEventListener('click', () => gradeCard(parseInt(btn.dataset.grade, 10)));
  });

  el.navBtns.forEach(btn => btn.addEventListener('click', () => showScreen(btn.dataset.nav)));
  el.btnSaveSettings.addEventListener('click', saveSettingsUI);

  el.btnResetAll.addEventListener('click', () => {
    if (confirm('確定要清除所有學習記錄嗎？此操作無法復原。')) {
      localStorage.removeItem(SRS_STORAGE_KEY);
      loadStudyScreen();
      showScreen('study');
    }
  });

  // 通知設定
  el.settingNotif.addEventListener('change', () => {
    el.notifTimeRow.classList.toggle('hidden', !el.settingNotif.checked);
  });
  el.btnRequestPerm.addEventListener('click', async () => {
    const result = await NotificationManager.requestPermission();
    alert(result === 'granted' ? '通知授權成功！儲存設定後將在指定時間提醒您。' : '通知授權被拒絕，請在瀏覽器設定中手動允許通知。');
  });

  // 字母頁篩選
  el.alphaFilter.addEventListener('click', e => {
    const btn = e.target.closest('.alpha-filter-btn');
    if (!btn) return;
    el.alphaFilter.querySelectorAll('.alpha-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    alphaFilter = btn.dataset.tone;
    renderAlphabet();
  });

  // 主題練習
  el.btnTopicBack.addEventListener('click', () => {
    el.topicList.classList.remove('hidden');
    el.topicPractice.classList.add('hidden');
    renderTopicList();
  });
  el.btnTopicFlip.addEventListener('click', flipTopicCard);
  el.topicCard.addEventListener('click', () => { if (!topicFlipped) flipTopicCard(); });
  el.btnTopicAudio.addEventListener('click', () => { if (topicCard) TTS.speak(topicCard.thai, topicCard.id); });

  document.querySelectorAll('[data-tgrade]').forEach(btn => {
    btn.addEventListener('click', () => gradeTopicCard(parseInt(btn.dataset.tgrade, 10)));
  });

  // 自訂詞彙
  el.btnShowCvForm.addEventListener('click', () => {
    const isOpen = !el.cvFormPanel.classList.contains('hidden');
    el.cvFormPanel.classList.toggle('hidden', isOpen);
    el.btnShowCvForm.textContent = isOpen ? '＋ 新增詞彙' : '✕ 收起';
    if (!isOpen) renderCustomVocabList();
  });
  el.btnCvSave.addEventListener('click', saveCvForm);
  el.btnCvCancel.addEventListener('click', () => {
    el.cvFormPanel.classList.add('hidden');
    el.btnShowCvForm.textContent = '＋ 新增詞彙';
  });

  // 鍵盤快捷鍵
  document.addEventListener('keydown', (e) => {
    const [name] = Object.entries(el.screen).find(([, s]) => !s.classList.contains('hidden')) || [];
    if (name !== 'study') return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      if (!isFlipped) flipCard();
    }
    if (isFlipped) {
      const gradeMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
      if (e.key in gradeMap) gradeCard(gradeMap[e.key]);
    }
    if (e.key === 'r' || e.key === 'R') {
      if (currentCard) TTS.speak(currentCard.thai, currentCard.id);
    }
  });
}

// ── 啟動 ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
