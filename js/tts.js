// 泰語 TTS
// 策略：init() 等 voiceschanged 確認有無泰語語音
//       有泰語語音 → Web Speech API（iOS/macOS/有語音包的 Android）
//       無泰語語音 → Google Translate TTS（中國手機 / 無語音包裝置）
const TTS = (() => {
  let thaiVoice = null;

  function init() {
    return new Promise((resolve) => {
      function tryLoad() {
        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) return false; // 尚未載入，等待
        thaiVoice = voices.find(v => v.lang.startsWith('th')) || null;
        resolve(thaiVoice);
        return true;
      }

      if (!tryLoad()) {
        // Chrome 非同步載入語音清單，等 voiceschanged
        speechSynthesis.addEventListener('voiceschanged', tryLoad, { once: true });
        // 3 秒保底（voiceschanged 永不觸發時），thaiVoice 維持 null → Google TTS
        setTimeout(() => resolve(null), 3000);
      }
    });
  }

  function speakViaGoogleTTS(text, onEnd) {
    // Google TTS 收到 Referer header 會回 404；須先建 Audio 再設 referrerPolicy 才有效
    const url = 'https://translate.googleapis.com/translate_tts?ie=UTF-8' +
                '&q=' + encodeURIComponent(text) +
                '&tl=th&client=gtx&ttsspeed=0.9';
    const audio = new Audio();
    audio.referrerPolicy = 'no-referrer';
    audio.src = url;
    if (onEnd) audio.onended = onEnd;
    audio.onerror = () => { if (onEnd) onEnd(); };
    audio.play().catch(() => { if (onEnd) onEnd(); });
  }

  function speak(text, onEnd) {
    if (!text) return;

    // 無泰語語音包（中國手機常見）→ 直接 Google TTS，不走 speechSynthesis
    // 原因：speechSynthesis 在無泰語語音時不觸發 onerror，而是靜默 onend，無法偵測失敗
    if (!thaiVoice) {
      speakViaGoogleTTS(text, onEnd);
      return;
    }

    // 有泰語語音 → Web Speech API（onend 可靠，iOS 不需 user gesture）
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'th-TH';
    utter.rate = 0.85;
    utter.voice = thaiVoice;
    if (onEnd) utter.onend = onEnd;
    utter.onerror = () => speakViaGoogleTTS(text, onEnd); // 邊緣情況保底
    speechSynthesis.speak(utter);
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  return { init, speak, isAvailable };
})();
