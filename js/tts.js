// 泰語 TTS
// 策略：
//   1. 優先用同源 audio/ 目錄的預錄 MP3（id 對應，無 CORS / 跨域問題）
//   2. 找不到本地檔（自訂詞彙 / 未預錄）→ 偵測泰語語音後決定走 Web Speech API 或 Google TTS
const TTS = (() => {
  let thaiVoice = null;
  let initDone = false;

  function init() {
    return new Promise((resolve) => {
      function tryLoad() {
        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) return false;
        thaiVoice = voices.find(v => v.lang.startsWith('th')) || null;
        initDone = true;
        resolve(thaiVoice);
        return true;
      }
      if (!tryLoad()) {
        speechSynthesis.addEventListener('voiceschanged', tryLoad, { once: true });
        setTimeout(() => { initDone = true; resolve(null); }, 3000);
      }
    });
  }

  // 播放同源預錄 MP3（id: v001…v153），任何裝置皆可用
  function speakLocal(id, onEnd) {
    const audio = new Audio('./audio/' + id + '.mp3');
    if (onEnd) audio.onended = onEnd;
    audio.onerror = () => speakRemote(null, onEnd); // 找不到 → remote fallback
    audio.play().catch(() => { if (onEnd) onEnd(); });
  }

  // 無預錄時的備援（自訂詞彙等）
  function speakRemote(text, onEnd) {
    if (!text) { if (onEnd) onEnd(); return; }

    if (thaiVoice) {
      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'th-TH';
      utter.rate = 0.85;
      utter.voice = thaiVoice;
      if (onEnd) utter.onend = onEnd;
      utter.onerror = () => speakGoogleTTS(text, onEnd);
      speechSynthesis.speak(utter);
      return;
    }

    speakGoogleTTS(text, onEnd);
  }

  function speakGoogleTTS(text, onEnd) {
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

  // 主入口：card 帶 id（v001…）→ local MP3；純文字（自訂詞彙）→ remote
  function speak(textOrId, onEnd, id) {
    if (!textOrId) return;

    // 若有 id 且是 v 開頭 → 用預錄 MP3
    const cardId = id || (typeof textOrId === 'string' && /^v\d{3}/.test(textOrId) ? textOrId : null);
    if (cardId) {
      speakLocal(cardId, onEnd);
      return;
    }

    speakRemote(textOrId, onEnd);
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  return { init, speak, isAvailable };
})();
