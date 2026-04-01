// 泰語 TTS 模組（Web Speech API 為主，Google Translate 備援）
const TTS = (() => {
  let thaiVoice = null;

  function init() {
    return new Promise((resolve) => {
      function pickThaiVoice() {
        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) return false; // 還沒載入
        thaiVoice = voices.find(v => v.lang.startsWith('th')) || null;
        resolve(thaiVoice);
        return true;
      }

      if (!pickThaiVoice()) {
        // Chrome 非同步載入語音清單，等待 voiceschanged
        speechSynthesis.addEventListener('voiceschanged', pickThaiVoice, { once: true });
        // 安全保底：3 秒後若仍未觸發則直接啟動（不含泰語語音）
        setTimeout(() => { if (!thaiVoice) resolve(null); }, 3000);
      }
    });
  }

  function speakViaGoogleTTS(text, onEnd) {
    // Google TTS 收到 Referer header 會回 404，需先建 Audio 再設 referrerPolicy
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
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'th-TH';
    utter.rate = 0.85;
    if (thaiVoice) utter.voice = thaiVoice;
    if (onEnd) utter.onend = onEnd;
    // 當 speechSynthesis 沒有泰語語音包（中國 Android 常見），onerror 觸發後改走 Google TTS
    utter.onerror = () => speakViaGoogleTTS(text, onEnd);
    speechSynthesis.speak(utter);
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  return { init, speak, isAvailable };
})();
