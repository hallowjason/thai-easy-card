// 泰語 TTS 模組（Web Speech API）
const TTS = (() => {
  let thaiVoice = null;

  function init() {
    return new Promise((resolve) => {
      let resolved = false;

      function pickThaiVoice() {
        const v = speechSynthesis.getVoices().find(v => v.lang.startsWith('th')) || null;
        if (!resolved) { resolved = true; thaiVoice = v; resolve(v); }
      }

      speechSynthesis.addEventListener('voiceschanged', pickThaiVoice, { once: true });
      pickThaiVoice(); // 若瀏覽器已載入語音清單則立即完成
    });
  }

  function speak(text, onEnd) {
    if (!text) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'th-TH';
    utter.rate = 0.85;
    if (thaiVoice) utter.voice = thaiVoice;
    if (onEnd) utter.onend = onEnd;
    speechSynthesis.speak(utter);
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  return { init, speak, isAvailable };
})();
