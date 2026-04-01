// 泰語 TTS 模組（Web Speech API + Google Translate 備援）
const TTS = (() => {
  let thaiVoice = null;
  let voiceChecked = false;

  function init() {
    return new Promise((resolve) => {
      let resolved = false;

      function pickThaiVoice() {
        const v = speechSynthesis.getVoices().find(v => v.lang.startsWith('th')) || null;
        if (!resolved) { resolved = true; thaiVoice = v; voiceChecked = true; resolve(v); }
      }

      speechSynthesis.addEventListener('voiceschanged', pickThaiVoice, { once: true });
      pickThaiVoice(); // 若瀏覽器已載入語音清單則立即完成

      // 2 秒後強制 resolve（部分 Android 不觸發 voiceschanged）
      setTimeout(() => {
        if (!resolved) { resolved = true; voiceChecked = true; resolve(null); }
      }, 2000);
    });
  }

  function speakViaGoogleTTS(text, onEnd) {
    const url = 'https://translate.googleapis.com/translate_tts?ie=UTF-8' +
                '&q=' + encodeURIComponent(text) +
                '&tl=th&client=gtx&ttsspeed=0.9';
    const audio = new Audio(url);
    if (onEnd) audio.onended = onEnd;
    audio.onerror = () => { if (onEnd) onEnd(); };
    audio.play().catch(() => { if (onEnd) onEnd(); });
  }

  function speak(text, onEnd) {
    if (!text) return;

    // 有原生泰語語音 → 用 Web Speech API
    if (thaiVoice) {
      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'th-TH';
      utter.rate = 0.85;
      utter.voice = thaiVoice;
      if (onEnd) utter.onend = onEnd;
      speechSynthesis.speak(utter);
      return;
    }

    // 無原生泰語語音（中國 Android 手機常見）→ Google Translate TTS
    speakViaGoogleTTS(text, onEnd);
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  return { init, speak, isAvailable };
})();
