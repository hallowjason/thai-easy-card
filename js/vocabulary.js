// 泰文詞彙資料庫（中/泰對照，無英文）
const VOCABULARY = [
  // 基本問候
  { id: 'v001', thai: 'สวัสดี', chinese: '你好／再見', pos: '感嘆詞', example: { thai: 'สวัสดีครับ', chinese: '你好（男性用）' }, imageQuery: 'greeting wave', toneClass: null },
  { id: 'v002', thai: 'ขอบคุณ', chinese: '謝謝', pos: '感嘆詞', example: { thai: 'ขอบคุณมากครับ', chinese: '非常謝謝你' }, imageQuery: 'thank you', toneClass: null },
  { id: 'v003', thai: 'ใช่', chinese: '是的', pos: '副詞', example: { thai: 'ใช่ครับ', chinese: '是的（男性用）' }, imageQuery: 'yes agree', toneClass: null },
  { id: 'v004', thai: 'ไม่', chinese: '不／不是', pos: '副詞', example: { thai: 'ไม่เป็นไร', chinese: '沒關係' }, imageQuery: 'no refuse', toneClass: null },
  { id: 'v005', thai: 'ขอโทษ', chinese: '對不起', pos: '感嘆詞', example: { thai: 'ขอโทษนะครับ', chinese: '不好意思（男性）' }, imageQuery: 'sorry apology', toneClass: null },

  // 人稱
  { id: 'v006', thai: 'ฉัน', chinese: '我（女性）', pos: '代詞', example: { thai: 'ฉันชื่ออะไร', chinese: '我叫什麼名字？' }, imageQuery: 'person woman', toneClass: null },
  { id: 'v007', thai: 'ผม', chinese: '我（男性）', pos: '代詞', example: { thai: 'ผมชื่อ...', chinese: '我叫…（男性）' }, imageQuery: 'person man', toneClass: null },
  { id: 'v008', thai: 'คุณ', chinese: '你／您', pos: '代詞', example: { thai: 'คุณชื่ออะไร', chinese: '你叫什麼名字？' }, imageQuery: 'you point person', toneClass: null },
  { id: 'v009', thai: 'เขา', chinese: '他／她', pos: '代詞', example: { thai: 'เขาชื่ออะไร', chinese: '他叫什麼名字？' }, imageQuery: 'third person', toneClass: null },
  { id: 'v010', thai: 'เรา', chinese: '我們', pos: '代詞', example: { thai: 'เราไปด้วยกัน', chinese: '我們一起去' }, imageQuery: 'group people together', toneClass: null },

  // 數字
  { id: 'v011', thai: 'หนึ่ง', chinese: '一', pos: '數詞', example: { thai: 'หนึ่งอัน', chinese: '一個' }, imageQuery: 'number one', toneClass: null },
  { id: 'v012', thai: 'สอง', chinese: '二', pos: '數詞', example: { thai: 'สองคน', chinese: '兩個人' }, imageQuery: 'number two pair', toneClass: null },
  { id: 'v013', thai: 'สาม', chinese: '三', pos: '數詞', example: { thai: 'สามวัน', chinese: '三天' }, imageQuery: 'number three', toneClass: null },
  { id: 'v014', thai: 'สี่', chinese: '四', pos: '數詞', example: { thai: 'สี่ชั่วโมง', chinese: '四小時' }, imageQuery: 'number four', toneClass: null },
  { id: 'v015', thai: 'ห้า', chinese: '五', pos: '數詞', example: { thai: 'ห้าบาท', chinese: '五泰銖' }, imageQuery: 'number five', toneClass: null },
  { id: 'v016', thai: 'หก', chinese: '六', pos: '數詞', example: { thai: 'หกโมง', chinese: '六點鐘' }, imageQuery: 'number six', toneClass: null },
  { id: 'v017', thai: 'เจ็ด', chinese: '七', pos: '數詞', example: { thai: 'เจ็ดวัน', chinese: '七天' }, imageQuery: 'number seven', toneClass: null },
  { id: 'v018', thai: 'แปด', chinese: '八', pos: '數詞', example: { thai: 'แปดคน', chinese: '八個人' }, imageQuery: 'number eight', toneClass: null },
  { id: 'v019', thai: 'เก้า', chinese: '九', pos: '數詞', example: { thai: 'เก้าโมง', chinese: '九點鐘' }, imageQuery: 'number nine', toneClass: null },
  { id: 'v020', thai: 'สิบ', chinese: '十', pos: '數詞', example: { thai: 'สิบบาท', chinese: '十泰銖' }, imageQuery: 'number ten', toneClass: null },

  // 顏色
  { id: 'v021', thai: 'สีแดง', chinese: '紅色', pos: '名詞', example: { thai: 'เสื้อสีแดง', chinese: '紅色上衣' }, imageQuery: 'red color', toneClass: null },
  { id: 'v022', thai: 'สีน้ำเงิน', chinese: '藍色', pos: '名詞', example: { thai: 'ท้องฟ้าสีน้ำเงิน', chinese: '藍色天空' }, imageQuery: 'blue sky color', toneClass: null },
  { id: 'v023', thai: 'สีเขียว', chinese: '綠色', pos: '名詞', example: { thai: 'ต้นไม้สีเขียว', chinese: '綠色樹木' }, imageQuery: 'green nature', toneClass: null },
  { id: 'v024', thai: 'สีขาว', chinese: '白色', pos: '名詞', example: { thai: 'เสื้อสีขาว', chinese: '白色上衣' }, imageQuery: 'white color', toneClass: null },
  { id: 'v025', thai: 'สีดำ', chinese: '黑色', pos: '名詞', example: { thai: 'แมวสีดำ', chinese: '黑色貓咪' }, imageQuery: 'black color', toneClass: null },

  // 食物
  { id: 'v026', thai: 'ข้าว', chinese: '米飯', pos: '名詞', example: { thai: 'กินข้าว', chinese: '吃飯' }, imageQuery: 'rice bowl thai', toneClass: null },
  { id: 'v027', thai: 'น้ำ', chinese: '水', pos: '名詞', example: { thai: 'ดื่มน้ำ', chinese: '喝水' }, imageQuery: 'water drink', toneClass: null },
  { id: 'v028', thai: 'อาหาร', chinese: '食物', pos: '名詞', example: { thai: 'อาหารไทย', chinese: '泰國料理' }, imageQuery: 'thai food', toneClass: null },
  { id: 'v029', thai: 'ผลไม้', chinese: '水果', pos: '名詞', example: { thai: 'ผลไม้สด', chinese: '新鮮水果' }, imageQuery: 'tropical fruits', toneClass: null },
  { id: 'v030', thai: 'ร้านอาหาร', chinese: '餐廳', pos: '名詞', example: { thai: 'ไปร้านอาหาร', chinese: '去餐廳' }, imageQuery: 'restaurant thai', toneClass: null },

  // 時間
  { id: 'v031', thai: 'วันนี้', chinese: '今天', pos: '副詞', example: { thai: 'วันนี้อากาศดี', chinese: '今天天氣好' }, imageQuery: 'today calendar', toneClass: null },
  { id: 'v032', thai: 'พรุ่งนี้', chinese: '明天', pos: '副詞', example: { thai: 'พรุ่งนี้เจอกัน', chinese: '明天見' }, imageQuery: 'tomorrow sunrise', toneClass: null },
  { id: 'v033', thai: 'เมื่อวาน', chinese: '昨天', pos: '副詞', example: { thai: 'เมื่อวานฝนตก', chinese: '昨天下雨' }, imageQuery: 'yesterday past', toneClass: null },
  { id: 'v034', thai: 'ตอนเช้า', chinese: '早上', pos: '名詞', example: { thai: 'ตอนเช้ากินอะไร', chinese: '早上吃什麼？' }, imageQuery: 'morning sunrise', toneClass: null },
  { id: 'v035', thai: 'ตอนเย็น', chinese: '傍晚', pos: '名詞', example: { thai: 'ตอนเย็นไปไหน', chinese: '傍晚去哪裡？' }, imageQuery: 'evening sunset', toneClass: null },

  // 交通
  { id: 'v036', thai: 'รถ', chinese: '車', pos: '名詞', example: { thai: 'ขึ้นรถ', chinese: '上車' }, imageQuery: 'car vehicle thai', toneClass: null },
  { id: 'v037', thai: 'รถไฟฟ้า', chinese: '捷運', pos: '名詞', example: { thai: 'นั่งรถไฟฟ้า', chinese: '搭捷運' }, imageQuery: 'bts skytrain bangkok', toneClass: null },
  { id: 'v038', thai: 'แท็กซี่', chinese: '計程車', pos: '名詞', example: { thai: 'เรียกแท็กซี่', chinese: '叫計程車' }, imageQuery: 'taxi bangkok', toneClass: null },
  { id: 'v039', thai: 'สนามบิน', chinese: '機場', pos: '名詞', example: { thai: 'ไปสนามบิน', chinese: '去機場' }, imageQuery: 'airport thailand', toneClass: null },
  { id: 'v040', thai: 'ถนน', chinese: '道路', pos: '名詞', example: { thai: 'ถนนสาย...', chinese: '…路' }, imageQuery: 'street bangkok', toneClass: null },

  // 購物
  { id: 'v041', thai: 'เท่าไหร่', chinese: '多少錢？', pos: '疑問詞', example: { thai: 'อันนี้เท่าไหร่', chinese: '這個多少錢？' }, imageQuery: 'shopping price', toneClass: null },
  { id: 'v042', thai: 'แพง', chinese: '貴', pos: '形容詞', example: { thai: 'แพงมาก', chinese: '很貴' }, imageQuery: 'expensive luxury', toneClass: null },
  { id: 'v043', thai: 'ถูก', chinese: '便宜', pos: '形容詞', example: { thai: 'ถูกมาก', chinese: '很便宜' }, imageQuery: 'cheap sale discount', toneClass: null },
  { id: 'v044', thai: 'ซื้อ', chinese: '買', pos: '動詞', example: { thai: 'ซื้อของ', chinese: '購物' }, imageQuery: 'shopping buy', toneClass: null },
  { id: 'v045', thai: 'ขาย', chinese: '賣', pos: '動詞', example: { thai: 'ขายดี', chinese: '賣得好' }, imageQuery: 'sell market', toneClass: null },

  // 身體
  { id: 'v046', thai: 'หัว', chinese: '頭', pos: '名詞', example: { thai: 'ปวดหัว', chinese: '頭痛' }, imageQuery: 'head person', toneClass: null },
  { id: 'v047', thai: 'มือ', chinese: '手', pos: '名詞', example: { thai: 'ล้างมือ', chinese: '洗手' }, imageQuery: 'hand wash', toneClass: null },
  { id: 'v048', thai: 'ตา', chinese: '眼睛', pos: '名詞', example: { thai: 'ตาสวย', chinese: '眼睛漂亮' }, imageQuery: 'eyes beautiful', toneClass: null },
  { id: 'v049', thai: 'ปาก', chinese: '嘴巴', pos: '名詞', example: { thai: 'อ้าปาก', chinese: '張嘴' }, imageQuery: 'mouth lips', toneClass: null },
  { id: 'v050', thai: 'ใจ', chinese: '心／情感', pos: '名詞', example: { thai: 'ดีใจ', chinese: '開心' }, imageQuery: 'heart emotion', toneClass: null },

  // 情感
  { id: 'v051', thai: 'ดีใจ', chinese: '開心', pos: '形容詞', example: { thai: 'ดีใจมากเลย', chinese: '真的很開心' }, imageQuery: 'happy joy smile', toneClass: null },
  { id: 'v052', thai: 'เสียใจ', chinese: '傷心', pos: '形容詞', example: { thai: 'เสียใจมาก', chinese: '很傷心' }, imageQuery: 'sad cry', toneClass: null },
  { id: 'v053', thai: 'โกรธ', chinese: '生氣', pos: '形容詞', example: { thai: 'อย่าโกรธเลย', chinese: '別生氣了' }, imageQuery: 'angry emotion', toneClass: null },
  { id: 'v054', thai: 'กลัว', chinese: '害怕', pos: '動詞', example: { thai: 'กลัวมาก', chinese: '很害怕' }, imageQuery: 'fear scared', toneClass: null },
  { id: 'v055', thai: 'รัก', chinese: '愛', pos: '動詞', example: { thai: 'รักคุณ', chinese: '愛你' }, imageQuery: 'love heart', toneClass: null },

  // 常用動詞
  { id: 'v056', thai: 'กิน', chinese: '吃', pos: '動詞', example: { thai: 'กินข้าว', chinese: '吃飯' }, imageQuery: 'eating food', toneClass: null },
  { id: 'v057', thai: 'ดื่ม', chinese: '喝', pos: '動詞', example: { thai: 'ดื่มน้ำ', chinese: '喝水' }, imageQuery: 'drink water', toneClass: null },
  { id: 'v058', thai: 'ไป', chinese: '去', pos: '動詞', example: { thai: 'ไปไหน', chinese: '去哪裡？' }, imageQuery: 'go walk direction', toneClass: null },
  { id: 'v059', thai: 'มา', chinese: '來', pos: '動詞', example: { thai: 'มาที่นี่', chinese: '來這裡' }, imageQuery: 'come arrival', toneClass: null },
  { id: 'v060', thai: 'นอน', chinese: '睡覺', pos: '動詞', example: { thai: 'นอนหลับ', chinese: '睡著' }, imageQuery: 'sleep bed', toneClass: null },

  // 地點
  { id: 'v061', thai: 'ที่นี่', chinese: '這裡', pos: '副詞', example: { thai: 'อยู่ที่นี่', chinese: '在這裡' }, imageQuery: 'here location', toneClass: null },
  { id: 'v062', thai: 'ที่ไหน', chinese: '哪裡？', pos: '疑問詞', example: { thai: 'ห้องน้ำอยู่ที่ไหน', chinese: '廁所在哪裡？' }, imageQuery: 'question mark direction', toneClass: null },
  { id: 'v063', thai: 'บ้าน', chinese: '家', pos: '名詞', example: { thai: 'กลับบ้าน', chinese: '回家' }, imageQuery: 'home house', toneClass: null },
  { id: 'v064', thai: 'โรงพยาบาล', chinese: '醫院', pos: '名詞', example: { thai: 'ไปโรงพยาบาล', chinese: '去醫院' }, imageQuery: 'hospital', toneClass: null },
  { id: 'v065', thai: 'ตลาด', chinese: '市場', pos: '名詞', example: { thai: 'ตลาดนัด', chinese: '跳蚤市場' }, imageQuery: 'market thai', toneClass: null },

  // 形容詞
  { id: 'v066', thai: 'ดี', chinese: '好', pos: '形容詞', example: { thai: 'ดีมาก', chinese: '很好' }, imageQuery: 'good excellent thumbs up', toneClass: null },
  { id: 'v067', thai: 'สวย', chinese: '漂亮', pos: '形容詞', example: { thai: 'สวยมาก', chinese: '很漂亮' }, imageQuery: 'beautiful woman flower', toneClass: null },
  { id: 'v068', thai: 'ใหญ่', chinese: '大', pos: '形容詞', example: { thai: 'ใหญ่มาก', chinese: '很大' }, imageQuery: 'big large elephant', toneClass: null },
  { id: 'v069', thai: 'เล็ก', chinese: '小', pos: '形容詞', example: { thai: 'เล็กมาก', chinese: '很小' }, imageQuery: 'small tiny', toneClass: null },
  { id: 'v070', thai: 'ร้อน', chinese: '熱', pos: '形容詞', example: { thai: 'อากาศร้อน', chinese: '天氣很熱' }, imageQuery: 'hot sun summer', toneClass: null },

  // 天氣
  { id: 'v071', thai: 'ฝนตก', chinese: '下雨', pos: '動詞', example: { thai: 'ฝนตกมาก', chinese: '雨下得很大' }, imageQuery: 'rain storm', toneClass: null },
  { id: 'v072', thai: 'อากาศ', chinese: '天氣', pos: '名詞', example: { thai: 'อากาศดี', chinese: '天氣好' }, imageQuery: 'weather sky', toneClass: null },
  { id: 'v073', thai: 'แดด', chinese: '陽光', pos: '名詞', example: { thai: 'แดดร้อน', chinese: '陽光很烈' }, imageQuery: 'sunshine sunlight', toneClass: null },

  // 家庭
  { id: 'v074', thai: 'พ่อ', chinese: '爸爸', pos: '名詞', example: { thai: 'พ่อของฉัน', chinese: '我的爸爸' }, imageQuery: 'father dad', toneClass: null },
  { id: 'v075', thai: 'แม่', chinese: '媽媽', pos: '名詞', example: { thai: 'แม่ของฉัน', chinese: '我的媽媽' }, imageQuery: 'mother mom', toneClass: null },
  { id: 'v076', thai: 'เพื่อน', chinese: '朋友', pos: '名詞', example: { thai: 'เพื่อนสนิท', chinese: '親密好友' }, imageQuery: 'friends together', toneClass: null },
  { id: 'v077', thai: 'ครอบครัว', chinese: '家人／家庭', pos: '名詞', example: { thai: 'ครอบครัวของฉัน', chinese: '我的家人' }, imageQuery: 'family together', toneClass: null },
  { id: 'v078', thai: 'คนไทย', chinese: '泰國人', pos: '名詞', example: { thai: 'เขาเป็นคนไทย', chinese: '他是泰國人' }, imageQuery: 'thai people', toneClass: null },

  // 疑問詞
  { id: 'v079', thai: 'อะไร', chinese: '什麼？', pos: '疑問詞', example: { thai: 'นี่คืออะไร', chinese: '這是什麼？' }, imageQuery: 'question what', toneClass: null },
  { id: 'v080', thai: 'ทำไม', chinese: '為什麼？', pos: '疑問詞', example: { thai: 'ทำไมถึงเป็นแบบนี้', chinese: '為什麼會這樣？' }, imageQuery: 'why question confused', toneClass: null },
  { id: 'v081', thai: 'เมื่อไหร่', chinese: '什麼時候？', pos: '疑問詞', example: { thai: 'จะมาเมื่อไหร่', chinese: '什麼時候來？' }, imageQuery: 'when time calendar', toneClass: null },
  { id: 'v082', thai: 'ใคร', chinese: '誰？', pos: '疑問詞', example: { thai: 'ใครทำ', chinese: '誰做的？' }, imageQuery: 'who person question', toneClass: null },
  { id: 'v083', thai: 'อย่างไร', chinese: '怎麼？如何？', pos: '疑問詞', example: { thai: 'ทำอย่างไร', chinese: '怎麼做？' }, imageQuery: 'how question', toneClass: null },
];

// 泰語字母表（42個常用子音）
const ALPHABET = [
  // 中音字（🟢 綠色）
  { id: 'a001', thai: 'ก', name: '雞', sound: 'ก/ก', toneClass: 'mid', mascot: '公雞', imageQuery: 'rooster chicken' },
  { id: 'a002', thai: 'จ', name: '碟子', sound: 'จ/ด', toneClass: 'mid', mascot: '瓷碟', imageQuery: 'plate dish porcelain' },
  { id: 'a003', thai: 'ด', name: '小孩', sound: 'ด/ด', toneClass: 'mid', mascot: '小孩', imageQuery: 'child kid' },
  { id: 'a004', thai: 'ต', name: '烏龜', sound: 'ต/ด', toneClass: 'mid', mascot: '烏龜', imageQuery: 'turtle tortoise' },
  { id: 'a005', thai: 'บ', name: '葉子', sound: 'บ/บ', toneClass: 'mid', mascot: '樹葉', imageQuery: 'leaf green plant' },
  { id: 'a006', thai: 'ป', name: '魚', sound: 'ป/บ', toneClass: 'mid', mascot: '魚', imageQuery: 'fish' },
  { id: 'a007', thai: 'อ', name: '盆子', sound: 'อ/–', toneClass: 'mid', mascot: '浴缸', imageQuery: 'bathtub bath' },

  // 低音字（🔵 藍色）
  { id: 'a008', thai: 'ง', name: '蛇', sound: 'ง/ง', toneClass: 'low', mascot: '蛇', imageQuery: 'snake serpent' },
  { id: 'a009', thai: 'ณ', name: '沙彌', sound: 'น/น', toneClass: 'low', mascot: '小和尚', imageQuery: 'monk buddhist' },
  { id: 'a010', thai: 'น', name: '老鼠', sound: 'น/น', toneClass: 'low', mascot: '老鼠', imageQuery: 'mouse rat' },
  { id: 'a011', thai: 'ม', name: '馬', sound: 'ม/ม', toneClass: 'low', mascot: '馬', imageQuery: 'horse' },
  { id: 'a012', thai: 'ย', name: '女孩', sound: 'ย/ย', toneClass: 'low', mascot: '女孩', imageQuery: 'girl young woman' },
  { id: 'a013', thai: 'ร', name: '船', sound: 'ร/น', toneClass: 'low', mascot: '船', imageQuery: 'boat ship' },
  { id: 'a014', thai: 'ล', name: '猴子', sound: 'ล/น', toneClass: 'low', mascot: '猴子', imageQuery: 'monkey' },
  { id: 'a015', thai: 'ว', name: '戒指', sound: 'ว/ว', toneClass: 'low', mascot: '戒指', imageQuery: 'ring jewelry' },
  { id: 'a016', thai: 'ง', name: '蛇', sound: 'ง/ง', toneClass: 'low', mascot: '蛇', imageQuery: 'snake' },
  { id: 'a017', thai: 'ค', name: '水牛', sound: 'ค/ก', toneClass: 'low', mascot: '水牛', imageQuery: 'buffalo water buffalo' },
  { id: 'a018', thai: 'ฆ', name: '鐘', sound: 'ค/ก', toneClass: 'low', mascot: '大鐘', imageQuery: 'bell gong' },
  { id: 'a019', thai: 'ง', name: '蛇', sound: 'ง/ง', toneClass: 'low', mascot: '蛇', imageQuery: 'snake' },
  { id: 'a020', thai: 'ช', name: '大象', sound: 'ช/ด', toneClass: 'low', mascot: '大象', imageQuery: 'elephant' },
  { id: 'a021', thai: 'ซ', name: '鐵鍊', sound: 'ส/ด', toneClass: 'low', mascot: '鎖鏈', imageQuery: 'chain lock' },
  { id: 'a022', thai: 'พ', name: '神廟', sound: 'พ/บ', toneClass: 'low', mascot: '泰國神廟', imageQuery: 'thai temple pagoda' },
  { id: 'a023', thai: 'ฟ', name: '牙齒', sound: 'ฟ/บ', toneClass: 'low', mascot: '牙齒', imageQuery: 'teeth dental' },
  { id: 'a024', thai: 'ภ', name: '山', sound: 'พ/บ', toneClass: 'low', mascot: '山', imageQuery: 'mountain' },
  { id: 'a025', thai: 'ท', name: '士兵', sound: 'ท/ด', toneClass: 'low', mascot: '士兵', imageQuery: 'soldier military' },
  { id: 'a026', thai: 'ธ', name: '旗幟', sound: 'ท/ด', toneClass: 'low', mascot: '旗幟', imageQuery: 'flag banner' },
  { id: 'a027', thai: 'ก', name: '雞', sound: 'ก/ก', toneClass: 'low', mascot: '公雞', imageQuery: 'rooster chicken' },
  { id: 'a028', thai: 'ฝ', name: '蓋子', sound: 'ฝ/บ', toneClass: 'low', mascot: '鍋蓋', imageQuery: 'lid cover pot' },
  { id: 'a029', thai: 'ห', name: '梟', sound: 'ห/–', toneClass: 'low', mascot: '貓頭鷹', imageQuery: 'owl bird' },

  // 高音字（🔴 紅色）
  { id: 'a030', thai: 'ข', name: '蛋', sound: 'ข/ก', toneClass: 'high', mascot: '蛋', imageQuery: 'egg' },
  { id: 'a031', thai: 'ฃ', name: '瓶子', sound: 'ข/ก', toneClass: 'high', mascot: '藏寶箱', imageQuery: 'treasure chest box' },
  { id: 'a032', thai: 'ฉ', name: '篩子', sound: 'ช/ด', toneClass: 'high', mascot: '篩子', imageQuery: 'sieve strainer' },
  { id: 'a033', thai: 'ฌ', name: '蜥蜴', sound: 'ช/ด', toneClass: 'high', mascot: '蜥蜴', imageQuery: 'lizard reptile' },
  { id: 'a034', thai: 'ผ', name: '蜜蜂', sound: 'ผ/–', toneClass: 'high', mascot: '蜜蜂', imageQuery: 'bee honey' },
  { id: 'a035', thai: 'ฝ', name: '蓋子', sound: 'ฝ/–', toneClass: 'high', mascot: '鍋蓋', imageQuery: 'pot lid' },
  { id: 'a036', thai: 'ถ', name: '袋子', sound: 'ถ/ด', toneClass: 'high', mascot: '袋子', imageQuery: 'bag sack' },
  { id: 'a037', thai: 'ฐ', name: '台座', sound: 'ถ/ด', toneClass: 'high', mascot: '基座', imageQuery: 'pedestal base' },
  { id: 'a038', thai: 'ส', name: '虎', sound: 'ส/ด', toneClass: 'high', mascot: '老虎', imageQuery: 'tiger' },
  { id: 'a039', thai: 'ศ', name: '亭子', sound: 'ส/ด', toneClass: 'high', mascot: '涼亭', imageQuery: 'pavilion gazebo' },
  { id: 'a040', thai: 'ษ', name: '老人', sound: 'ส/ด', toneClass: 'high', mascot: '老人', imageQuery: 'elderly old man' },
  { id: 'a041', thai: 'ห', name: '梟', sound: 'ห/–', toneClass: 'high', mascot: '貓頭鷹', imageQuery: 'owl night' },
  { id: 'a042', thai: 'ฮ', name: '梟（另）', sound: 'ห/–', toneClass: 'high', mascot: '貓頭鷹', imageQuery: 'owl' },
];
