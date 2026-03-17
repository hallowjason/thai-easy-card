// 泰語 TTS 模組（Web Speech API）
const TTS = (() => {
  let voices = [];
  let thaiVoice = null;

  function init() {
    return new Promise((resolve) => {
      function loadVoices() {
        voices = speechSynthesis.getVoices();
        thaiVoice = voices.find(v => v.lang.startsWith('th')) || null;
        resolve(thaiVoice);
      }
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
      }
      loadVoices();
    });
  }

  function speak(text, onEnd) {
    if (!text) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'th-TH';
    utter.rate = 0.85;
    utter.pitch = 1.0;
    if (thaiVoice) utter.voice = thaiVoice;
    if (onEnd) utter.onend = onEnd;
    speechSynthesis.speak(utter);
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  return { init, speak, isAvailable };
})();
