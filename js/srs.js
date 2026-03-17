// SM-2 間隔重複演算法（Spaced Repetition System）
const SRS_STORAGE_KEY = 'thaiEasyCard_srs';
const SETTINGS_KEY = 'thaiEasyCard_settings';

const DEFAULT_SETTINGS = {
  dailyNewCards: 10,
  cardTypes: ['zh2th', 'th2zh', 'blind_read', 'blind_listen'],
  imageEnabled: true,
  ttsVoice: 'th-TH',
};

// 卡片模板生成：每個詞彙 × 啟用的卡片類型
function generateCardId(vocabId, type) {
  return `${vocabId}__${type}`;
}

function getSRSData() {
  try {
    return JSON.parse(localStorage.getItem(SRS_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveSRSData(data) {
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

// 初始化一張卡片的 SRS 狀態
function initCardState() {
  return {
    ef: 2.5,        // 熟悉度因子（Easiness Factor）
    interval: 0,    // 下次複習間隔（天）
    reps: 0,        // 連續正確次數
    due: Date.now(),// 到期時間（timestamp）
    lastReview: null,
  };
}

// SM-2 評分計算
// grade: 0=Again, 1=Hard, 2=Good, 3=Easy
function applyGrade(state, grade) {
  const now = Date.now();
  const MS_DAY = 86400000;
  let { ef, interval, reps } = state;

  if (grade === 0) {
    // Again：立刻再出現（10分鐘後）
    reps = 0;
    interval = 0;
    return { ...state, ef, interval, reps, due: now + 10 * 60 * 1000, lastReview: now };
  }

  if (grade === 1) {
    // Hard：今天內再出現
    reps = Math.max(0, reps - 1);
    interval = Math.max(1, Math.floor(interval * 0.8));
    ef = Math.max(1.3, ef - 0.15);
  } else if (grade === 2) {
    // Good
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 3;
    else interval = Math.round(interval * ef);
    reps += 1;
  } else {
    // Easy
    if (reps === 0) interval = 3;
    else if (reps === 1) interval = 7;
    else interval = Math.round(interval * ef * 1.3);
    ef = Math.min(2.5 + 0.15, ef + 0.15);
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

// 取得今日應複習的卡片（包含新卡）
function getTodayQueue(vocabList, settings) {
  const srsData = getSRSData();
  const now = Date.now();
  const enabledTypes = settings.cardTypes;
  const due = [];
  const newCards = [];

  for (const vocab of vocabList) {
    for (const type of enabledTypes) {
      const id = generateCardId(vocab.id, type);
      if (srsData[id]) {
        if (srsData[id].due <= now) {
          due.push({ ...vocab, cardType: type, cardId: id, srs: srsData[id] });
        }
      } else {
        newCards.push({ ...vocab, cardType: type, cardId: id, srs: null });
      }
    }
  }

  // 限制新卡數量
  const todayNewKey = `newToday_${new Date().toDateString()}`;
  let newCountToday = parseInt(localStorage.getItem(todayNewKey) || '0');
  const newToAdd = newCards.slice(0, Math.max(0, settings.dailyNewCards - newCountToday));

  return [...shuffle(due), ...shuffle(newToAdd)];
}

function recordGrade(cardId, grade) {
  const srsData = getSRSData();
  const current = srsData[cardId] || initCardState();
  srsData[cardId] = applyGrade(current, grade);
  saveSRSData(srsData);

  // 記錄今日新卡數
  if (!current.lastReview) {
    const todayNewKey = `newToday_${new Date().toDateString()}`;
    const count = parseInt(localStorage.getItem(todayNewKey) || '0');
    localStorage.setItem(todayNewKey, count + 1);
  }
}

function getStats() {
  const srsData = getSRSData();
  const now = Date.now();
  const MS_DAY = 86400000;
  let total = 0, due = 0, learned = 0;

  for (const [, state] of Object.entries(srsData)) {
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
