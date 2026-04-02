// 泰語 TTS — 三層策略：本地 MP3 → Web Speech API → Google TTS
const TTS = (() => {
  let thaiVoice = null;
  let currentAudio = null;

  function init() {
    return new Promise((resolve) => {
      function tryLoad() {
        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) return false;
        thaiVoice = voices.find(v => v.lang.startsWith('th')) || null;
        resolve(thaiVoice);
        return true;
      }
      if (!tryLoad()) {
        speechSynthesis.addEventListener('voiceschanged', tryLoad, { once: true });
        setTimeout(() => resolve(null), 3000);
      }
    });
  }

  function stopCurrent() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    speechSynthesis.cancel();
  }

  function speakLocal(id, onEnd) {
    stopCurrent();
    const audio = new Audio('./audio/' + id + '.mp3');
    currentAudio = audio;
    if (onEnd) audio.onended = onEnd;
    audio.onerror = () => speakRemote(null, null, onEnd);
    audio.play().catch(() => { if (onEnd) onEnd(); });
  }

  function speakRemote(text, id, onEnd) {
    if (!text) { if (onEnd) onEnd(); return; }

    if (thaiVoice) {
      stopCurrent();
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
    stopCurrent();
    const url = 'https://translate.googleapis.com/translate_tts?ie=UTF-8' +
                '&q=' + encodeURIComponent(text) +
                '&tl=th&client=gtx&ttsspeed=0.9';
    const audio = new Audio();
    currentAudio = audio;
    audio.referrerPolicy = 'no-referrer';
    audio.src = url;
    if (onEnd) audio.onended = onEnd;
    audio.onerror = () => { if (onEnd) onEnd(); };
    audio.play().catch(() => { if (onEnd) onEnd(); });
  }

  // id (v001…v153) → 本地 MP3；純文字（自訂詞彙）→ speakRemote
  function speak(text, id, onEnd) {
    if (!text) return;
    if (id) {
      speakLocal(id, onEnd);
      return;
    }
    speakRemote(text, null, onEnd);
  }

  function isAvailable() {
    return 'speechSynthesis' in window;
  }

  return { init, speak, isAvailable };
})();
