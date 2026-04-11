// 短句畫面邏輯
'use strict';

let phraseTopicId = null;
let phraseIdx = 0;
let phraseAnswerShown = false;

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
  answerBlock:  document.getElementById('phrases-answer-block'),
  aThai:        document.getElementById('phrases-a-thai'),
  aChinese:     document.getElementById('phrases-a-zh'),
  btnAAudio:    document.getElementById('btn-phrases-a-audio'),
  btnReveal:    document.getElementById('btn-phrases-reveal'),
  btnNext:      document.getElementById('btn-phrases-next'),
  topicGrid:    document.getElementById('phrases-topic-grid'),
};

function initPhrases() {
  renderPhraseTopics();
  bindPhraseEvents();
}

function renderPhraseTopics() {
  elP.topicGrid.innerHTML = PHRASE_TOPICS.map(topic => `
    <div class="topic-card phrase-topic-card" data-phrase-topic="${topic.id}">
      <div class="topic-emoji">${topic.icon}</div>
      <div class="topic-name">${topic.title}</div>
      <div class="topic-count">${topic.dialogues.length} 句對話</div>
      <div class="topic-progress-bar"><div class="topic-progress-fill" style="width:0%"></div></div>
    </div>
  `).join('');

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

  elP.situation.textContent = d.situation;
  elP.qThai.textContent = d.q.thai;
  elP.qChinese.textContent = d.q.chinese;
  elP.aThai.textContent = d.a.thai;
  elP.aChinese.textContent = d.a.chinese;

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
  elP.situation.textContent = '全部完成！';
  elP.qThai.textContent = '🎉';
  elP.qChinese.textContent = '本組對話已練習完畢';
  elP.answerBlock.classList.add('hidden');
  elP.btnReveal.classList.add('hidden');
  elP.btnNext.classList.add('hidden');
  elP.progress.textContent = '完成 ✅';
  elP.progressBar.style.width = '100%';
}

function bindPhraseEvents() {
  elP.backBtn.addEventListener('click', () => {
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
}
