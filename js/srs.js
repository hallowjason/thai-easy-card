// SM-2 間隔重複演算法（Spaced Repetition System）
const SRS_STORAGE_KEY = 'thaiEasyCard_srs';
const SETTINGS_KEY = 'thaiEasyCard_settings';
const MS_DAY = 86400000;

const DEFAULT_SETTINGS = {
  dailyNewCards: 10,
  cardTypes: ['zh2th', 'th2zh', 'blind_read', 'blind_listen'],
  imageEnabled: true,
};

// ── 輕量 SRS 快取（避免重複 JSON.parse） ──────────────────────────
let _srsCache = null;

function getSRSData() {
  if (_srsCache) return _srsCache;
  try {
    _srsCache = JSON.parse(localStorage.getItem(SRS_STORAGE_KEY) || '{}');
  } catch {
    _srsCache = {};
  }
  return _srsCache;
}

function saveSRSData(data) {
  _srsCache = data;
  localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
}

function getSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ── 工具函式 ──────────────────────────────────────────────────────
function generateCardId(vocabId, type) {
  return `${vocabId}__${type}`;
}

function getTodayNewKey() {
  return `newToday_${new Date().toDateString()}`;
}

function getStoredInt(key) {
  return parseInt(localStorage.getItem(key) || '0', 10);
}

// ── SRS 核心 ──────────────────────────────────────────────────────
function initCardState() {
  return {
    ef: 2.5,
    interval: 0,
    reps: 0,
    due: Date.now(),
    lastReview: null,
  };
}

// grade: 0=Again, 1=Hard, 2=Good, 3=Easy
function applyGrade(state, grade) {
  const now = Date.now();
  let { ef, interval, reps } = state;

  if (grade === 0) {
    return { ...state, ef, interval: 0, reps: 0, due: now + 10 * 60 * 1000, lastReview: now };
  }

  if (grade === 1) {
    reps = Math.max(0, reps - 1);
    interval = Math.max(1, Math.floor(interval * 0.8));
    ef = Math.max(1.3, ef - 0.15);
  } else if (grade === 2) {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 3;
    else interval = Math.round(interval * ef);
    reps += 1;
  } else {
    if (reps === 0) interval = 3;
    else if (reps === 1) interval = 7;
    else interval = Math.round(interval * ef * 1.3);
    ef = Math.min(2.65, ef + 0.15);
    reps += 1;
  }

  return {
    ...state,
    ef: Math.max(1.3, ef),
    interval,
    reps,
    due: now + interval * MS_DAY,
    lastReview: now,
  };
}

// 取得今日應複習的卡片（含新卡）
function getTodayQueue(vocabList, settings) {
  const srsData = getSRSData();
  const now = Date.now();
  const due = [];
  const newCards = [];

  for (const vocab of vocabList) {
    for (const type of settings.cardTypes) {
      const id = generateCardId(vocab.id, type);
      const entry = srsData[id];
      if (entry) {
        if (entry.due <= now) due.push({ ...vocab, cardType: type, cardId: id, srs: entry });
      } else {
        newCards.push({ ...vocab, cardType: type, cardId: id, srs: null });
      }
    }
  }

  const todayNewKey = getTodayNewKey();
  const newCountToday = getStoredInt(todayNewKey);
  const newToAdd = newCards.slice(0, Math.max(0, settings.dailyNewCards - newCountToday));

  return [...shuffle(due), ...shuffle(newToAdd)];
}

function recordGrade(cardId, grade) {
  const srsData = getSRSData();
  const current = srsData[cardId] || initCardState();
  srsData[cardId] = applyGrade(current, grade);
  saveSRSData(srsData);

  if (!current.lastReview) {
    const key = getTodayNewKey();
    localStorage.setItem(key, getStoredInt(key) + 1);
  }
}

function getStats() {
  const srsData = getSRSData();
  const now = Date.now();
  let total = 0, due = 0, learned = 0;

  for (const state of Object.values(srsData)) {
    total++;
    if (state.due <= now) due++;
    if (state.reps > 0) learned++;
  }

  return { total, due, learned };
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
