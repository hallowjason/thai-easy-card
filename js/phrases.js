// 短句資料庫：生活情境一問一答
// 每條 dialogue: { id, situation, q: {thai, chinese}, a: {thai, chinese} }

const PHRASE_TOPICS = [
  {
    id: 'market',
    title: '市場買東西',
    icon: '🛒',
    dialogues: [
      {
        id: 'mkt01',
        situation: '問價格',
        q: { thai: 'ราคาเท่าไหร่ครับ', chinese: '多少錢？' },
        a: { thai: 'ห้าสิบบาทครับ', chinese: '五十泰銖' },
      },
      {
        id: 'mkt02',
        situation: '問有沒有',
        q: { thai: 'มีมะม่วงไหมครับ', chinese: '有芒果嗎？' },
        a: { thai: 'มีครับ สดมากเลย', chinese: '有，很新鮮喔' },
      },
      {
        id: 'mkt03',
        situation: '殺價',
        q: { thai: 'ลดราคาได้ไหมครับ', chinese: '可以便宜一點嗎？' },
        a: { thai: 'ลดให้ได้สิบบาทนะครับ', chinese: '可以便宜十泰銖' },
      },
      {
        id: 'mkt04',
        situation: '要看看',
        q: { thai: 'ขอดูได้ไหมครับ', chinese: '可以看一下嗎？' },
        a: { thai: 'ได้เลยครับ', chinese: '當然可以' },
      },
      {
        id: 'mkt05',
        situation: '要幾個',
        q: { thai: 'เอาสักกี่อันดีครับ', chinese: '您要幾個呢？' },
        a: { thai: 'เอาสองอันก็พอครับ', chinese: '兩個就夠了' },
      },
      {
        id: 'mkt06',
        situation: '算總價',
        q: { thai: 'รวมเท่าไหร่ครับ', chinese: '總共多少錢？' },
        a: { thai: 'หนึ่งร้อยบาทครับ', chinese: '一百泰銖' },
      },
      {
        id: 'mkt07',
        situation: '幫我包',
        q: { thai: 'ห่อให้หน่อยได้ไหมครับ', chinese: '可以幫我包起來嗎？' },
        a: { thai: 'ได้ครับ รอแป๊บนึงนะครับ', chinese: '好的，稍等一下' },
      },
      {
        id: 'mkt08',
        situation: '問新鮮度',
        q: { thai: 'ของสดไหมครับ', chinese: '東西新鮮嗎？' },
        a: { thai: 'สดมากครับ เพิ่งมาเช้านี้เลย', chinese: '很新鮮，今早才到的' },
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
        q: { thai: 'ขนมอยู่ที่ไหนครับ', chinese: '零食在哪裡？' },
        a: { thai: 'อยู่แถวชั้นสองครับ', chinese: '在第二排那邊' },
      },
      {
        id: 'cvs02',
        situation: '微波加熱',
        q: { thai: 'อุ่นในไมโครเวฟได้ไหมครับ', chinese: '可以幫我微波嗎？' },
        a: { thai: 'ได้ครับ ประมาณนาทีนึงนะครับ', chinese: '可以，大約一分鐘' },
      },
      {
        id: 'cvs03',
        situation: '要袋子',
        q: { thai: 'ขอถุงด้วยได้ไหมครับ', chinese: '可以給我袋子嗎？' },
        a: { thai: 'ได้ครับ นี่เลย', chinese: '好的，給您' },
      },
      {
        id: 'cvs04',
        situation: '刷卡',
        q: { thai: 'จ่ายด้วยบัตรได้ไหมครับ', chinese: '可以刷卡嗎？' },
        a: { thai: 'ได้ครับ ขั้นต่ำร้อยบาทนะครับ', chinese: '可以，最低消費一百泰銖' },
      },
      {
        id: 'cvs05',
        situation: '要收據',
        q: { thai: 'ขอใบเสร็จด้วยครับ', chinese: '請給我收據' },
        a: { thai: 'ครับ นี่ใบเสร็จครับ ขอบคุณครับ', chinese: '好的，這是收據，謝謝' },
      },
      {
        id: 'cvs06',
        situation: '找零錢',
        q: { thai: 'มีแบงก์ย่อยไหมครับ', chinese: '您有零錢嗎？' },
        a: { thai: 'มีครับ ทอนให้ได้เลย', chinese: '有，可以找給您' },
      },
      {
        id: 'cvs07',
        situation: '找不到',
        q: { thai: 'หาไม่เจอครับ ช่วยได้ไหมครับ', chinese: '找不到，可以幫我嗎？' },
        a: { thai: 'ตามมาครับ จะพาไปดู', chinese: '跟我來，我帶您去看' },
      },
    ],
  },
];
