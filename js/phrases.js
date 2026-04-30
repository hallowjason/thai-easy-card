// 短句資料庫：生活情境一問一答
// 每條 dialogue: { id, situation, q: {thai, chinese, segments}, a: {thai, chinese, segments} }
// segments 是按詞手動切分的陣列（join('') 必等於 thai）

const PHRASE_TOPICS = [
  {
    id: 'market',
    title: '市場買東西',
    icon: '🛒',
    dialogues: [
      {
        id: 'mkt01',
        situation: '問價格',
        q: { thai: 'ราคาเท่าไหร่ครับ', chinese: '多少錢？', segments: ['ราคา', 'เท่าไหร่', 'ครับ'] },
        a: { thai: 'ห้าสิบบาทครับ', chinese: '五十泰銖', segments: ['ห้าสิบ', 'บาท', 'ครับ'] },
      },
      {
        id: 'mkt02',
        situation: '問有沒有',
        q: { thai: 'มีมะม่วงไหมครับ', chinese: '有芒果嗎？', segments: ['มี', 'มะม่วง', 'ไหม', 'ครับ'] },
        a: { thai: 'มีครับ สดมากเลย', chinese: '有，很新鮮喔', segments: ['มี', 'ครับ', ' ', 'สด', 'มาก', 'เลย'] },
      },
      {
        id: 'mkt03',
        situation: '殺價',
        q: { thai: 'ลดราคาได้ไหมครับ', chinese: '可以便宜一點嗎？', segments: ['ลด', 'ราคา', 'ได้', 'ไหม', 'ครับ'] },
        a: { thai: 'ลดให้ได้สิบบาทนะครับ', chinese: '可以便宜十泰銖', segments: ['ลด', 'ให้', 'ได้', 'สิบ', 'บาท', 'นะ', 'ครับ'] },
      },
      {
        id: 'mkt04',
        situation: '要看看',
        q: { thai: 'ขอดูได้ไหมครับ', chinese: '可以看一下嗎？', segments: ['ขอ', 'ดู', 'ได้', 'ไหม', 'ครับ'] },
        a: { thai: 'ได้เลยครับ', chinese: '當然可以', segments: ['ได้', 'เลย', 'ครับ'] },
      },
      {
        id: 'mkt05',
        situation: '要幾個',
        q: { thai: 'เอาสักกี่อันดีครับ', chinese: '您要幾個呢？', segments: ['เอา', 'สัก', 'กี่', 'อัน', 'ดี', 'ครับ'] },
        a: { thai: 'เอาสองอันก็พอครับ', chinese: '兩個就夠了', segments: ['เอา', 'สอง', 'อัน', 'ก็', 'พอ', 'ครับ'] },
      },
      {
        id: 'mkt06',
        situation: '算總價',
        q: { thai: 'รวมเท่าไหร่ครับ', chinese: '總共多少錢？', segments: ['รวม', 'เท่าไหร่', 'ครับ'] },
        a: { thai: 'หนึ่งร้อยบาทครับ', chinese: '一百泰銖', segments: ['หนึ่งร้อย', 'บาท', 'ครับ'] },
      },
      {
        id: 'mkt07',
        situation: '幫我包',
        q: { thai: 'ห่อให้หน่อยได้ไหมครับ', chinese: '可以幫我包起來嗎？', segments: ['ห่อ', 'ให้', 'หน่อย', 'ได้', 'ไหม', 'ครับ'] },
        a: { thai: 'ได้ครับ รอแป๊บนึงนะครับ', chinese: '好的，稍等一下', segments: ['ได้', 'ครับ', ' ', 'รอ', 'แป๊บ', 'นึง', 'นะ', 'ครับ'] },
      },
      {
        id: 'mkt08',
        situation: '問新鮮度',
        q: { thai: 'ของสดไหมครับ', chinese: '東西新鮮嗎？', segments: ['ของ', 'สด', 'ไหม', 'ครับ'] },
        a: { thai: 'สดมากครับ เพิ่งมาเช้านี้เลย', chinese: '很新鮮，今早才到的', segments: ['สด', 'มาก', 'ครับ', ' ', 'เพิ่ง', 'มา', 'เช้านี้', 'เลย'] },
      },
    ],
  },
  {
    id: 'convenience',
    title: '便利商店',
    icon: '🏪',
    dialogues: [
      {
        id: 'cvs01',
        situation: '找東西',
        q: { thai: 'ขนมอยู่ที่ไหนครับ', chinese: '零食在哪裡？', segments: ['ขนม', 'อยู่', 'ที่ไหน', 'ครับ'] },
        a: { thai: 'อยู่แถวชั้นสองครับ', chinese: '在第二排那邊', segments: ['อยู่', 'แถว', 'ชั้น', 'สอง', 'ครับ'] },
      },
      {
        id: 'cvs02',
        situation: '微波加熱',
        q: { thai: 'อุ่นในไมโครเวฟได้ไหมครับ', chinese: '可以幫我微波嗎？', segments: ['อุ่น', 'ใน', 'ไมโครเวฟ', 'ได้', 'ไหม', 'ครับ'] },
        a: { thai: 'ได้ครับ ประมาณนาทีนึงนะครับ', chinese: '可以，大約一分鐘', segments: ['ได้', 'ครับ', ' ', 'ประมาณ', 'นาที', 'นึง', 'นะ', 'ครับ'] },
      },
      {
        id: 'cvs03',
        situation: '要袋子',
        q: { thai: 'ขอถุงด้วยได้ไหมครับ', chinese: '可以給我袋子嗎？', segments: ['ขอ', 'ถุง', 'ด้วย', 'ได้', 'ไหม', 'ครับ'] },
        a: { thai: 'ได้ครับ นี่เลย', chinese: '好的，給您', segments: ['ได้', 'ครับ', ' ', 'นี่', 'เลย'] },
      },
      {
        id: 'cvs04',
        situation: '刷卡',
        q: { thai: 'จ่ายด้วยบัตรได้ไหมครับ', chinese: '可以刷卡嗎？', segments: ['จ่าย', 'ด้วย', 'บัตร', 'ได้', 'ไหม', 'ครับ'] },
        a: { thai: 'ได้ครับ ขั้นต่ำร้อยบาทนะครับ', chinese: '可以，最低消費一百泰銖', segments: ['ได้', 'ครับ', ' ', 'ขั้นต่ำ', 'ร้อย', 'บาท', 'นะ', 'ครับ'] },
      },
      {
        id: 'cvs05',
        situation: '要收據',
        q: { thai: 'ขอใบเสร็จด้วยครับ', chinese: '請給我收據', segments: ['ขอ', 'ใบเสร็จ', 'ด้วย', 'ครับ'] },
        a: { thai: 'ครับ นี่ใบเสร็จครับ ขอบคุณครับ', chinese: '好的，這是收據，謝謝', segments: ['ครับ', ' ', 'นี่', 'ใบเสร็จ', 'ครับ', ' ', 'ขอบคุณ', 'ครับ'] },
      },
      {
        id: 'cvs06',
        situation: '找零錢',
        q: { thai: 'มีแบงก์ย่อยไหมครับ', chinese: '您有零錢嗎？', segments: ['มี', 'แบงก์', 'ย่อย', 'ไหม', 'ครับ'] },
        a: { thai: 'มีครับ ทอนให้ได้เลย', chinese: '有，可以找給您', segments: ['มี', 'ครับ', ' ', 'ทอน', 'ให้', 'ได้', 'เลย'] },
      },
      {
        id: 'cvs07',
        situation: '找不到',
        q: { thai: 'หาไม่เจอครับ ช่วยได้ไหมครับ', chinese: '找不到，可以幫我嗎？', segments: ['หา', 'ไม่', 'เจอ', 'ครับ', ' ', 'ช่วย', 'ได้', 'ไหม', 'ครับ'] },
        a: { thai: 'ตามมาครับ จะพาไปดู', chinese: '跟我來，我帶您去看', segments: ['ตาม', 'มา', 'ครับ', ' ', 'จะ', 'พา', 'ไป', 'ดู'] },
      },
    ],
  },
];

// 驗證：segments.join('') 必等於 thai（debug 用，console 警告）
(function verifyPhraseSegments() {
  if (typeof console === 'undefined') return;
  for (const topic of PHRASE_TOPICS) {
    for (const d of topic.dialogues) {
      for (const role of ['q', 'a']) {
        const obj = d[role];
        if (!obj.segments) continue;
        const joined = obj.segments.join('');
        if (joined !== obj.thai) {
          console.warn(`[phrases] segments mismatch ${d.id}.${role}: "${joined}" vs "${obj.thai}"`);
        }
      }
    }
  }
})();
