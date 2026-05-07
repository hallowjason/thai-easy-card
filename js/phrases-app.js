// 短句畫面邏輯
'use strict';

let phraseTopicId = null;
let phraseIdx = 0;
let phraseAnswerShown = false;

// 語音辨識狀態
let phraseRecognition = null;
let phraseRecognitionRole = null;  // 'q' | 'a' | null

const elP = {
  topicList:    document.getElementById('phrases-topic-list'),
  dialogue:     document.getElementById('phrases-dialogue'),
  backBtn:      document.getElementById('btn-phrases-back'),
  topicTitle:   document.getElementById('phrases-topic-title'),
  progress:     document.getElementById('phrases-progress'),
  progressBar:  document.getElementById('phrases-progress-bar'),
  situation:    document.getElementById('phrases-situation'),
  qThai:        document.getElementById('phrases-q-thai'),
  qChinese:     document.getElementById('phrases-q-zh'),
  btnQAudio:    document.getElementById('btn-phrases-q-audio'),
  btnQMic:      document.getElementById('btn-phrases-q-mic'),
  qMicResult:   document.getElementById('phrases-q-mic-result'),
  answerBlock:  document.getElementById('phrases-answer-block'),
  aThai:        document.getElementById('phrases-a-thai'),
  aChinese:     document.getElementById('phrases-a-zh'),
  btnAAudio:    document.getElementById('btn-phrases-a-audio'),
  btnAMic:      document.getElementById('btn-phrases-a-mic'),
  aMicResult:   document.getElementById('phrases-a-mic-result'),
  btnReveal:    document.getElementById('btn-phrases-reveal'),
  btnNext:      document.getElementById('btn-phrases-next'),
  topicGrid:    document.getElementById('phrases-topic-grid'),
};

function initPhrases() {
  renderPhraseTopics();
  bindPhraseEvents();
}

function renderPhraseTopics() {
  const done = getCompletedTopics();
  elP.topicGrid.innerHTML = PHRASE_TOPICS.map(topic => {
    const isDone = done.includes(topic.id);
    return `
    <div class="topic-card phrase-topic-card${isDone ? ' topic-done' : ''}" data-phrase-topic="${topic.id}">
      <div class="topic-emoji">${topic.icon}</div>
      <div class="topic-name">${topic.title}</div>
      <div class="topic-count">${isDone ? '✅ 已完成' : topic.dialogues.length + ' 句對話'}</div>
      <div class="topic-progress-bar"><div class="topic-progress-fill" style="width:${isDone ? 100 : 0}%"></div></div>
    </div>
  `}).join('');

  elP.topicGrid.querySelectorAll('[data-phrase-topic]').forEach(card => {
    card.addEventListener('click', () => startPhraseTopic(card.dataset.phraseTopic));
  });
}

function startPhraseTopic(topicId) {
  phraseTopicId = topicId;
  phraseIdx = 0;
  phraseAnswerShown = false;

  const topic = PHRASE_TOPICS.find(t => t.id === topicId);
  if (!topic) return;

  elP.topicTitle.textContent = `${topic.icon} ${topic.title}`;
  elP.topicList.classList.add('hidden');
  elP.dialogue.classList.remove('hidden');
  renderPhraseCard();
}

// 將 thai 拆字成 HTML（每個詞包成 .phrase-word），無 segments 時 fallback 純文字
function renderSegmentsHtml(textObj) {
  const segments = textObj.segments;
  if (!segments || !segments.length) {
    return escapeHtml(textObj.thai);
  }
  return segments.map(seg => {
    if (seg === ' ' || /^\s+$/.test(seg)) {
      return '<span class="phrase-word-space"></span>';
    }
    return `<span class="phrase-word" data-word="${escapeAttr(seg)}">${escapeHtml(seg)}</span>`;
  }).join('');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function escapeAttr(s) {
  return escapeHtml(s);
}

// 點 .phrase-word：朗讀單詞
function bindWordClicks(container) {
  container.querySelectorAll('.phrase-word').forEach(span => {
    span.addEventListener('click', e => {
      e.stopPropagation();
      const word = span.dataset.word;
      if (!word) return;
      // 視覺回饋
      span.classList.add('is-speaking');
      setTimeout(() => span.classList.remove('is-speaking'), 800);
      try {
        TTS.speak(word, null);
      } catch (err) {
        console.warn('[phrases] word TTS failed', err);
      }
    });
  });
}

function renderPhraseCard() {
  const topic = PHRASE_TOPICS.find(t => t.id === phraseTopicId);
  if (!topic) return;

  const total = topic.dialogues.length;
  if (phraseIdx >= total) {
    showPhraseDone();
    return;
  }

  phraseAnswerShown = false;
  const d = topic.dialogues[phraseIdx];

  // 取消任何進行中的語音辨識
  cancelPhraseRecognition(true);

  elP.situation.textContent = d.situation;
  elP.qThai.innerHTML = renderSegmentsHtml(d.q);
  elP.qChinese.textContent = d.q.chinese;
  elP.aThai.innerHTML = renderSegmentsHtml(d.a);
  elP.aChinese.textContent = d.a.chinese;

  bindWordClicks(elP.qThai);
  bindWordClicks(elP.aThai);

  // 重置 mic 結果區
  hideMicResult('q');
  hideMicResult('a');

  elP.answerBlock.classList.add('hidden');
  elP.btnReveal.classList.remove('hidden');
  elP.btnNext.classList.add('hidden');

  const pct = (phraseIdx / total) * 100;
  elP.progress.textContent = `${phraseIdx + 1} / ${total}`;
  elP.progressBar.style.width = pct + '%';

  // 自動播放問句
  setTimeout(() => TTS.speak(d.q.thai, null), 300);
}

function revealAnswer() {
  phraseAnswerShown = true;
  elP.answerBlock.classList.remove('hidden');
  elP.btnReveal.classList.add('hidden');
  elP.btnNext.classList.remove('hidden');

  const topic = PHRASE_TOPICS.find(t => t.id === phraseTopicId);
  const d = topic.dialogues[phraseIdx];
  setTimeout(() => TTS.speak(d.a.thai, null), 200);
}

function nextPhraseCard() {
  phraseIdx++;
  renderPhraseCard();
}

function showPhraseDone() {
  markTopicDone(phraseTopicId);
  const done = getCompletedTopics();
  const total = PHRASE_TOPICS.length;
  const doneCount = done.length;

  elP.situation.textContent = '全部完成！';
  elP.qThai.textContent = '🎉';
  elP.qChinese.textContent = `本組對話已練習完畢　${doneCount} / ${total} 個主題完成`;
  elP.answerBlock.classList.add('hidden');
  elP.btnReveal.classList.add('hidden');
  elP.btnNext.classList.add('hidden');
  elP.progress.textContent = '完成 ✅';
  elP.progressBar.style.width = '100%';
}

// ── 語音辨識（Web Speech API） ────────────────────

function getSpeechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// ── Thai number normalization ─────────────────────────────────────
// 語音辨識會把泰文數字口說轉成阿拉伯數字，需還原以便比對

const THAI_ONES = ['ศูนย์','หนึ่ง','สอง','สาม','สี่','ห้า','หก','เจ็ด','แปด','เก้า'];

function numToThai(n) {
  if (n === 0) return 'ศูนย์';
  let result = '';
  if (n >= 1000) {
    const k = Math.floor(n / 1000);
    result += (k === 1 ? 'หนึ่ง' : THAI_ONES[k]) + 'พัน';
    n %= 1000;
  }
  if (n >= 100) {
    const h = Math.floor(n / 100);
    result += (h === 1 ? 'หนึ่ง' : THAI_ONES[h]) + 'ร้อย';
    n %= 100;
  }
  if (n >= 10) {
    const t = Math.floor(n / 10);
    if (t === 1) result += 'สิบ';
    else if (t === 2) result += 'ยี่สิบ';
    else result += THAI_ONES[t] + 'สิบ';
    n %= 10;
  }
  if (n >= 1) {
    const afterTens = result.includes('สิบ');
    result += (n === 1 && afterTens) ? 'เอ็ด' : THAI_ONES[n];
  }
  return result;
}

function normalizeRecognized(text) {
  // Replace Arabic digit sequences with Thai words
  return text.replace(/\d+/g, m => numToThai(parseInt(m, 10)));
}

// ── Segment diff: highlight wrong segments in recognized result ───

function segmentDiffHtml(recognized, segments) {
  if (!segments || !segments.length) return escapeHtml(recognized);
  const normRecog = normalizeThaiText(normalizeRecognized(recognized));
  return segments
    .filter(s => s !== ' ' && !/^\s+$/.test(s))
    .map(seg => {
      const found = normRecog.includes(normalizeThaiText(seg));
      return found
        ? `<span class="diff-ok">${escapeHtml(seg)}</span>`
        : `<span class="diff-err">${escapeHtml(seg)}</span>`;
    })
    .join(' ');
}

// ── Completion tracking ───────────────────────────────────────────
const PHRASE_DONE_KEY = 'thaiEasyCard_phraseDone';

function getCompletedTopics() {
  try { return JSON.parse(localStorage.getItem(PHRASE_DONE_KEY) || '[]'); } catch { return []; }
}

function markTopicDone(topicId) {
  const done = getCompletedTopics();
  if (!done.includes(topicId)) {
    done.push(topicId);
    localStorage.setItem(PHRASE_DONE_KEY, JSON.stringify(done));
  }
}

// Levenshtein 距離（純泰文比對用）
function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const arrA = Array.from(a);
  const arrB = Array.from(b);
  const m = arrA.length, n = arrB.length;
  let prev = new Array(n + 1);
  let curr = new Array(n + 1);
  for (let j = 0; j <= n; j++) prev[j] = j;
  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = arrA[i - 1] === arrB[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[n];
}

// 純化字串：移除空白與標點，只留泰文字元/碼位
function normalizeThaiText(s) {
  if (!s) return '';
  // 移除空白與常見中英標點，保留泰文字元
  return s.replace(/[\s -/:-@[-`{-~　-〿＀-￯？，。！、]/g, '');
}

function similarityScore(recognized, target) {
  const a = normalizeThaiText(recognized);
  const b = normalizeThaiText(target);
  if (!a.length && !b.length) return 1;
  if (!a.length || !b.length) return 0;
  const arrA = Array.from(a);
  const arrB = Array.from(b);
  const dist = levenshtein(arrA.join(''), arrB.join(''));
  const maxLen = Math.max(arrA.length, arrB.length);
  return 1 - dist / maxLen;
}

function bestMatchScore(alternatives, target) {
  let best = { score: 0, transcript: '' };
  for (const alt of alternatives) {
    const normalized = normalizeRecognized(alt);
    const s = similarityScore(normalized, target);
    if (s > best.score) best = { score: s, transcript: alt, normalized };
  }
  return best;
}

function getMicElements(role) {
  return role === 'q'
    ? { btn: elP.btnQMic, result: elP.qMicResult }
    : { btn: elP.btnAMic, result: elP.aMicResult };
}

function showMicResult(role, kind, html) {
  const { result } = getMicElements(role);
  if (!result) return;
  result.className = `phrase-mic-result ${kind}`;
  result.innerHTML = html;
  result.classList.remove('hidden');
}
function hideMicResult(role) {
  const { result } = getMicElements(role);
  if (!result) return;
  result.className = 'phrase-mic-result hidden';
  result.textContent = '';
}

function setMicRecording(role, recording) {
  const { btn } = getMicElements(role);
  if (!btn) return;
  if (recording) {
    btn.classList.add('recording');
    btn.textContent = '🔴';
    btn.title = '點擊停止';
  } else {
    btn.classList.remove('recording');
    btn.textContent = '🎤';
    btn.title = '跟我唸';
  }
}

function cancelPhraseRecognition(silent) {
  if (phraseRecognition) {
    try { phraseRecognition.abort(); } catch (_) {}
    phraseRecognition = null;
  }
  const role = phraseRecognitionRole;
  phraseRecognitionRole = null;
  if (role) {
    setMicRecording(role, false);
    if (!silent) {
      showMicResult(role, 'info', '已取消');
    }
  }
}

function startPhraseRecognition(role) {
  const Ctor = getSpeechRecognitionCtor();
  if (!Ctor) {
    showMicResult(role, 'error', '您的瀏覽器不支援語音辨識（請用 Chrome / Edge）');
    const { btn } = getMicElements(role);
    if (btn) btn.disabled = true;
    return;
  }

  // 已在錄音中：再點一次 = 中止
  if (phraseRecognition && phraseRecognitionRole === role) {
    cancelPhraseRecognition(false);
    return;
  }
  // 換一個 role 開錄：先取消舊的
  if (phraseRecognition) {
    cancelPhraseRecognition(true);
  }

  const topic = PHRASE_TOPICS.find(t => t.id === phraseTopicId);
  if (!topic) return;
  const d = topic.dialogues[phraseIdx];
  if (!d) return;
  const target = role === 'q' ? d.q.thai : d.a.thai;
  const targetSegments = role === 'q' ? d.q.segments : d.a.segments;

  const recog = new Ctor();
  recog.lang = 'th-TH';
  recog.interimResults = false;
  recog.maxAlternatives = 3;
  recog.continuous = false;

  phraseRecognition = recog;
  phraseRecognitionRole = role;
  setMicRecording(role, true);
  showMicResult(role, 'info', '🎙 請開始說泰文…');

  recog.onresult = (event) => {
    const alternatives = [];
    if (event.results && event.results[0]) {
      for (let i = 0; i < event.results[0].length; i++) {
        alternatives.push(event.results[0][i].transcript || '');
      }
    }
    if (!alternatives.length) {
      showMicResult(role, 'error', '❌ 沒有辨識到任何聲音，請再試一次');
      return;
    }
    const { score, transcript } = bestMatchScore(alternatives, target);
    const pct = Math.round(score * 100);
    if (score >= 0.9) {
      showMicResult(role, 'success', `✅ 唸得很準！(相似度 ${pct}%)`);
    } else if (score >= 0.7) {
      const diffHtml = segmentDiffHtml(normalizeRecognized(transcript), targetSegments);
      showMicResult(role, 'warn', `👍 大致正確 (${pct}%)，再試試：<br><span class="mic-diff">${diffHtml}</span>`);
    } else {
      const diffHtml = segmentDiffHtml(normalizeRecognized(transcript), targetSegments);
      showMicResult(role, 'error', `❌ 發音差距較大 (${pct}%)，錯誤詞標紅：<br><span class="mic-diff">${diffHtml}</span>`);
    }
  };

  recog.onerror = (event) => {
    const code = event && event.error ? event.error : 'unknown';
    let msg = '辨識失敗';
    if (code === 'not-allowed' || code === 'service-not-allowed') {
      msg = '麥克風權限被拒，請到瀏覽器設定開啟';
    } else if (code === 'no-speech') {
      msg = '沒有聽到聲音，請再試一次';
    } else if (code === 'audio-capture') {
      msg = '找不到麥克風，請檢查裝置';
    } else if (code === 'language-not-supported') {
      msg = '此瀏覽器不支援泰文辨識（請用 Chrome / Edge）';
    } else if (code === 'aborted') {
      // 主動取消，已在 cancelPhraseRecognition 顯示，避免覆蓋
      return;
    } else {
      msg = `辨識失敗：${code}`;
    }
    showMicResult(role, 'error', msg);
  };

  recog.onend = () => {
    // 結束（無論成功失敗或中止）：恢復按鈕狀態
    if (phraseRecognition === recog) {
      phraseRecognition = null;
      phraseRecognitionRole = null;
    }
    setMicRecording(role, false);
  };

  try {
    recog.start();
  } catch (err) {
    console.warn('[phrases] recognition.start failed', err);
    showMicResult(role, 'error', `啟動失敗：${err && err.message ? err.message : err}`);
    setMicRecording(role, false);
    phraseRecognition = null;
    phraseRecognitionRole = null;
  }
}

// ── 事件綁定 ─────────────────────────────────────

function bindPhraseEvents() {
  elP.backBtn.addEventListener('click', () => {
    cancelPhraseRecognition(true);
    elP.dialogue.classList.add('hidden');
    elP.topicList.classList.remove('hidden');
  });

  elP.btnReveal.addEventListener('click', revealAnswer);
  elP.btnNext.addEventListener('click', nextPhraseCard);

  elP.btnQAudio.addEventListener('click', () => {
    const topic = PHRASE_TOPICS.find(t => t.id === phraseTopicId);
    if (!topic) return;
    TTS.speak(topic.dialogues[phraseIdx].q.thai, null);
  });

  elP.btnAAudio.addEventListener('click', () => {
    const topic = PHRASE_TOPICS.find(t => t.id === phraseTopicId);
    if (!topic) return;
    TTS.speak(topic.dialogues[phraseIdx].a.thai, null);
  });

  if (elP.btnQMic) {
    elP.btnQMic.addEventListener('click', () => startPhraseRecognition('q'));
  }
  if (elP.btnAMic) {
    elP.btnAMic.addEventListener('click', () => startPhraseRecognition('a'));
  }

  // 不支援時直接 disable 按鈕（hover title 提示）
  if (!getSpeechRecognitionCtor()) {
    [elP.btnQMic, elP.btnAMic].forEach(b => {
      if (!b) return;
      b.title = '您的瀏覽器不支援語音辨識（請用 Chrome / Edge）';
    });
  }
}
