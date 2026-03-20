// 泰文詞彙資料庫（中/泰對照，無英文）
const VOCABULARY = [
  // 基本問候
  { id: 'v001', thai: 'สวัสดี', chinese: '你好／再見', pos: '感嘆詞', category: 'greeting', example: { thai: 'สวัสดีครับ', chinese: '你好（男性用）' }, imageQuery: 'greeting wave', toneClass: null },
  { id: 'v002', thai: 'ขอบคุณ', chinese: '謝謝', pos: '感嘆詞', category: 'greeting', example: { thai: 'ขอบคุณมากครับ', chinese: '非常謝謝你' }, imageQuery: 'thank you', toneClass: null },
  { id: 'v003', thai: 'ใช่', chinese: '是的', pos: '副詞', category: 'greeting', example: { thai: 'ใช่ครับ', chinese: '是的（男性用）' }, imageQuery: 'yes agree', toneClass: null },
  { id: 'v004', thai: 'ไม่', chinese: '不／不是', pos: '副詞', category: 'greeting', example: { thai: 'ไม่เป็นไร', chinese: '沒關係' }, imageQuery: 'no refuse', toneClass: null },
  { id: 'v005', thai: 'ขอโทษ', chinese: '對不起', pos: '感嘆詞', category: 'greeting', example: { thai: 'ขอโทษนะครับ', chinese: '不好意思（男性）' }, imageQuery: 'sorry apology', toneClass: null },

  // 人稱
  { id: 'v006', thai: 'ฉัน', chinese: '我（女性）', pos: '代詞', category: 'pronoun', example: { thai: 'ฉันชื่ออะไร', chinese: '我叫什麼名字？' }, imageQuery: 'person woman', toneClass: null },
  { id: 'v007', thai: 'ผม', chinese: '我（男性）', pos: '代詞', category: 'pronoun', example: { thai: 'ผมชื่อ...', chinese: '我叫…（男性）' }, imageQuery: 'person man', toneClass: null },
  { id: 'v008', thai: 'คุณ', chinese: '你／您', pos: '代詞', category: 'pronoun', example: { thai: 'คุณชื่ออะไร', chinese: '你叫什麼名字？' }, imageQuery: 'you point person', toneClass: null },
  { id: 'v009', thai: 'เขา', chinese: '他／她', pos: '代詞', category: 'pronoun', example: { thai: 'เขาชื่ออะไร', chinese: '他叫什麼名字？' }, imageQuery: 'third person', toneClass: null },
  { id: 'v010', thai: 'เรา', chinese: '我們', pos: '代詞', category: 'pronoun', example: { thai: 'เราไปด้วยกัน', chinese: '我們一起去' }, imageQuery: 'group people together', toneClass: null },

  // 數字 1-10
  { id: 'v011', thai: 'หนึ่ง', chinese: '一', pos: '數詞', category: 'number', example: { thai: 'หนึ่งอัน', chinese: '一個' }, imageQuery: 'number one', toneClass: null },
  { id: 'v012', thai: 'สอง', chinese: '二', pos: '數詞', category: 'number', example: { thai: 'สองคน', chinese: '兩個人' }, imageQuery: 'number two pair', toneClass: null },
  { id: 'v013', thai: 'สาม', chinese: '三', pos: '數詞', category: 'number', example: { thai: 'สามวัน', chinese: '三天' }, imageQuery: 'number three', toneClass: null },
  { id: 'v014', thai: 'สี่', chinese: '四', pos: '數詞', category: 'number', example: { thai: 'สี่ชั่วโมง', chinese: '四小時' }, imageQuery: 'number four', toneClass: null },
  { id: 'v015', thai: 'ห้า', chinese: '五', pos: '數詞', category: 'number', example: { thai: 'ห้าบาท', chinese: '五泰銖' }, imageQuery: 'number five', toneClass: null },
  { id: 'v016', thai: 'หก', chinese: '六', pos: '數詞', category: 'number', example: { thai: 'หกโมง', chinese: '六點鐘' }, imageQuery: 'number six', toneClass: null },
  { id: 'v017', thai: 'เจ็ด', chinese: '七', pos: '數詞', category: 'number', example: { thai: 'เจ็ดวัน', chinese: '七天' }, imageQuery: 'number seven', toneClass: null },
  { id: 'v018', thai: 'แปด', chinese: '八', pos: '數詞', category: 'number', example: { thai: 'แปดคน', chinese: '八個人' }, imageQuery: 'number eight', toneClass: null },
  { id: 'v019', thai: 'เก้า', chinese: '九', pos: '數詞', category: 'number', example: { thai: 'เก้าโมง', chinese: '九點鐘' }, imageQuery: 'number nine', toneClass: null },
  { id: 'v020', thai: 'สิบ', chinese: '十', pos: '數詞', category: 'number', example: { thai: 'สิบบาท', chinese: '十泰銖' }, imageQuery: 'number ten', toneClass: null },

  // 顏色
  { id: 'v021', thai: 'สีแดง', chinese: '紅色', pos: '名詞', category: 'color', example: { thai: 'เสื้อสีแดง', chinese: '紅色上衣' }, imageQuery: 'red color', toneClass: null },
  { id: 'v022', thai: 'สีน้ำเงิน', chinese: '藍色', pos: '名詞', category: 'color', example: { thai: 'ท้องฟ้าสีน้ำเงิน', chinese: '藍色天空' }, imageQuery: 'blue sky color', toneClass: null },
  { id: 'v023', thai: 'สีเขียว', chinese: '綠色', pos: '名詞', category: 'color', example: { thai: 'ต้นไม้สีเขียว', chinese: '綠色樹木' }, imageQuery: 'green nature', toneClass: null },
  { id: 'v024', thai: 'สีขาว', chinese: '白色', pos: '名詞', category: 'color', example: { thai: 'เสื้อสีขาว', chinese: '白色上衣' }, imageQuery: 'white color', toneClass: null },
  { id: 'v025', thai: 'สีดำ', chinese: '黑色', pos: '名詞', category: 'color', example: { thai: 'แมวสีดำ', chinese: '黑色貓咪' }, imageQuery: 'black color', toneClass: null },

  // 食物
  { id: 'v026', thai: 'ข้าว', chinese: '米飯', pos: '名詞', category: 'food', example: { thai: 'กินข้าว', chinese: '吃飯' }, imageQuery: 'rice bowl thai', toneClass: null },
  { id: 'v027', thai: 'น้ำ', chinese: '水', pos: '名詞', category: 'food', example: { thai: 'ดื่มน้ำ', chinese: '喝水' }, imageQuery: 'water drink', toneClass: null },
  { id: 'v028', thai: 'อาหาร', chinese: '食物', pos: '名詞', category: 'food', example: { thai: 'อาหารไทย', chinese: '泰國料理' }, imageQuery: 'thai food', toneClass: null },
  { id: 'v029', thai: 'ผลไม้', chinese: '水果', pos: '名詞', category: 'food', example: { thai: 'ผลไม้สด', chinese: '新鮮水果' }, imageQuery: 'tropical fruits', toneClass: null },
  { id: 'v030', thai: 'ร้านอาหาร', chinese: '餐廳', pos: '名詞', category: 'food', example: { thai: 'ไปร้านอาหาร', chinese: '去餐廳' }, imageQuery: 'restaurant thai', toneClass: null },

  // 時間
  { id: 'v031', thai: 'วันนี้', chinese: '今天', pos: '副詞', category: 'time', example: { thai: 'วันนี้อากาศดี', chinese: '今天天氣好' }, imageQuery: 'today calendar', toneClass: null },
  { id: 'v032', thai: 'พรุ่งนี้', chinese: '明天', pos: '副詞', category: 'time', example: { thai: 'พรุ่งนี้เจอกัน', chinese: '明天見' }, imageQuery: 'tomorrow sunrise', toneClass: null },
  { id: 'v033', thai: 'เมื่อวาน', chinese: '昨天', pos: '副詞', category: 'time', example: { thai: 'เมื่อวานฝนตก', chinese: '昨天下雨' }, imageQuery: 'yesterday past', toneClass: null },
  { id: 'v034', thai: 'ตอนเช้า', chinese: '早上', pos: '名詞', category: 'time', example: { thai: 'ตอนเช้ากินอะไร', chinese: '早上吃什麼？' }, imageQuery: 'morning sunrise', toneClass: null },
  { id: 'v035', thai: 'ตอนเย็น', chinese: '傍晚', pos: '名詞', category: 'time', example: { thai: 'ตอนเย็นไปไหน', chinese: '傍晚去哪裡？' }, imageQuery: 'evening sunset', toneClass: null },

  // 交通
  { id: 'v036', thai: 'รถ', chinese: '車', pos: '名詞', category: 'transport', example: { thai: 'ขึ้นรถ', chinese: '上車' }, imageQuery: 'car vehicle thai', toneClass: null },
  { id: 'v037', thai: 'รถไฟฟ้า', chinese: '捷運', pos: '名詞', category: 'transport', example: { thai: 'นั่งรถไฟฟ้า', chinese: '搭捷運' }, imageQuery: 'bts skytrain bangkok', toneClass: null },
  { id: 'v038', thai: 'แท็กซี่', chinese: '計程車', pos: '名詞', category: 'transport', example: { thai: 'เรียกแท็กซี่', chinese: '叫計程車' }, imageQuery: 'taxi bangkok', toneClass: null },
  { id: 'v039', thai: 'สนามบิน', chinese: '機場', pos: '名詞', category: 'transport', example: { thai: 'ไปสนามบิน', chinese: '去機場' }, imageQuery: 'airport thailand', toneClass: null },
  { id: 'v040', thai: 'ถนน', chinese: '道路', pos: '名詞', category: 'transport', example: { thai: 'ถนนสาย...', chinese: '…路' }, imageQuery: 'street bangkok', toneClass: null },

  // 購物
  { id: 'v041', thai: 'เท่าไหร่', chinese: '多少錢？', pos: '疑問詞', category: 'shopping', example: { thai: 'อันนี้เท่าไหร่', chinese: '這個多少錢？' }, imageQuery: 'shopping price', toneClass: null },
  { id: 'v042', thai: 'แพง', chinese: '貴', pos: '形容詞', category: 'shopping', example: { thai: 'แพงมาก', chinese: '很貴' }, imageQuery: 'expensive luxury', toneClass: null },
  { id: 'v043', thai: 'ถูก', chinese: '便宜', pos: '形容詞', category: 'shopping', example: { thai: 'ถูกมาก', chinese: '很便宜' }, imageQuery: 'cheap sale discount', toneClass: null },
  { id: 'v044', thai: 'ซื้อ', chinese: '買', pos: '動詞', category: 'shopping', example: { thai: 'ซื้อของ', chinese: '購物' }, imageQuery: 'shopping buy', toneClass: null },
  { id: 'v045', thai: 'ขาย', chinese: '賣', pos: '動詞', category: 'shopping', example: { thai: 'ขายดี', chinese: '賣得好' }, imageQuery: 'sell market', toneClass: null },

  // 身體
  { id: 'v046', thai: 'หัว', chinese: '頭', pos: '名詞', category: 'body', example: { thai: 'ปวดหัว', chinese: '頭痛' }, imageQuery: 'head person', toneClass: null },
  { id: 'v047', thai: 'มือ', chinese: '手', pos: '名詞', category: 'body', example: { thai: 'ล้างมือ', chinese: '洗手' }, imageQuery: 'hand wash', toneClass: null },
  { id: 'v048', thai: 'ตา', chinese: '眼睛', pos: '名詞', category: 'body', example: { thai: 'ตาสวย', chinese: '眼睛漂亮' }, imageQuery: 'eyes beautiful', toneClass: null },
  { id: 'v049', thai: 'ปาก', chinese: '嘴巴', pos: '名詞', category: 'body', example: { thai: 'อ้าปาก', chinese: '張嘴' }, imageQuery: 'mouth lips', toneClass: null },
  { id: 'v050', thai: 'ใจ', chinese: '心／情感', pos: '名詞', category: 'body', example: { thai: 'ดีใจ', chinese: '開心' }, imageQuery: 'heart emotion', toneClass: null },

  // 情感
  { id: 'v051', thai: 'ดีใจ', chinese: '開心', pos: '形容詞', category: 'emotion', example: { thai: 'ดีใจมากเลย', chinese: '真的很開心' }, imageQuery: 'happy joy smile', toneClass: null },
  { id: 'v052', thai: 'เสียใจ', chinese: '傷心', pos: '形容詞', category: 'emotion', example: { thai: 'เสียใจมาก', chinese: '很傷心' }, imageQuery: 'sad cry', toneClass: null },
  { id: 'v053', thai: 'โกรธ', chinese: '生氣', pos: '形容詞', category: 'emotion', example: { thai: 'อย่าโกรธเลย', chinese: '別生氣了' }, imageQuery: 'angry emotion', toneClass: null },
  { id: 'v054', thai: 'กลัว', chinese: '害怕', pos: '動詞', category: 'emotion', example: { thai: 'กลัวมาก', chinese: '很害怕' }, imageQuery: 'fear scared', toneClass: null },
  { id: 'v055', thai: 'รัก', chinese: '愛', pos: '動詞', category: 'emotion', example: { thai: 'รักคุณ', chinese: '愛你' }, imageQuery: 'love heart', toneClass: null },

  // 常用動詞
  { id: 'v056', thai: 'กิน', chinese: '吃', pos: '動詞', category: 'verb', example: { thai: 'กินข้าว', chinese: '吃飯' }, imageQuery: 'eating food', toneClass: null },
  { id: 'v057', thai: 'ดื่ม', chinese: '喝', pos: '動詞', category: 'verb', example: { thai: 'ดื่มน้ำ', chinese: '喝水' }, imageQuery: 'drink water', toneClass: null },
  { id: 'v058', thai: 'ไป', chinese: '去', pos: '動詞', category: 'verb', example: { thai: 'ไปไหน', chinese: '去哪裡？' }, imageQuery: 'go walk direction', toneClass: null },
  { id: 'v059', thai: 'มา', chinese: '來', pos: '動詞', category: 'verb', example: { thai: 'มาที่นี่', chinese: '來這裡' }, imageQuery: 'come arrival', toneClass: null },
  { id: 'v060', thai: 'นอน', chinese: '睡覺', pos: '動詞', category: 'verb', example: { thai: 'นอนหลับ', chinese: '睡著' }, imageQuery: 'sleep bed', toneClass: null },

  // 地點
  { id: 'v061', thai: 'ที่นี่', chinese: '這裡', pos: '副詞', category: 'place', example: { thai: 'อยู่ที่นี่', chinese: '在這裡' }, imageQuery: 'here location', toneClass: null },
  { id: 'v062', thai: 'ที่ไหน', chinese: '哪裡？', pos: '疑問詞', category: 'place', example: { thai: 'ห้องน้ำอยู่ที่ไหน', chinese: '廁所在哪裡？' }, imageQuery: 'question mark direction', toneClass: null },
  { id: 'v063', thai: 'บ้าน', chinese: '家', pos: '名詞', category: 'place', example: { thai: 'กลับบ้าน', chinese: '回家' }, imageQuery: 'home house', toneClass: null },
  { id: 'v064', thai: 'โรงพยาบาล', chinese: '醫院', pos: '名詞', category: 'place', example: { thai: 'ไปโรงพยาบาล', chinese: '去醫院' }, imageQuery: 'hospital', toneClass: null },
  { id: 'v065', thai: 'ตลาด', chinese: '市場', pos: '名詞', category: 'place', example: { thai: 'ตลาดนัด', chinese: '跳蚤市場' }, imageQuery: 'market thai', toneClass: null },

  // 形容詞
  { id: 'v066', thai: 'ดี', chinese: '好', pos: '形容詞', category: 'adjective', example: { thai: 'ดีมาก', chinese: '很好' }, imageQuery: 'good excellent thumbs up', toneClass: null },
  { id: 'v067', thai: 'สวย', chinese: '漂亮', pos: '形容詞', category: 'adjective', example: { thai: 'สวยมาก', chinese: '很漂亮' }, imageQuery: 'beautiful woman flower', toneClass: null },
  { id: 'v068', thai: 'ใหญ่', chinese: '大', pos: '形容詞', category: 'adjective', example: { thai: 'ใหญ่มาก', chinese: '很大' }, imageQuery: 'big large elephant', toneClass: null },
  { id: 'v069', thai: 'เล็ก', chinese: '小', pos: '形容詞', category: 'adjective', example: { thai: 'เล็กมาก', chinese: '很小' }, imageQuery: 'small tiny', toneClass: null },
  { id: 'v070', thai: 'ร้อน', chinese: '熱', pos: '形容詞', category: 'adjective', example: { thai: 'อากาศร้อน', chinese: '天氣很熱' }, imageQuery: 'hot sun summer', toneClass: null },

  // 天氣
  { id: 'v071', thai: 'ฝนตก', chinese: '下雨', pos: '動詞', category: 'weather', example: { thai: 'ฝนตกมาก', chinese: '雨下得很大' }, imageQuery: 'rain storm', toneClass: null },
  { id: 'v072', thai: 'อากาศ', chinese: '天氣', pos: '名詞', category: 'weather', example: { thai: 'อากาศดี', chinese: '天氣好' }, imageQuery: 'weather sky', toneClass: null },
  { id: 'v073', thai: 'แดด', chinese: '陽光', pos: '名詞', category: 'weather', example: { thai: 'แดดร้อน', chinese: '陽光很烈' }, imageQuery: 'sunshine sunlight', toneClass: null },

  // 家庭
  { id: 'v074', thai: 'พ่อ', chinese: '爸爸', pos: '名詞', category: 'family', example: { thai: 'พ่อของฉัน', chinese: '我的爸爸' }, imageQuery: 'father dad', toneClass: null },
  { id: 'v075', thai: 'แม่', chinese: '媽媽', pos: '名詞', category: 'family', example: { thai: 'แม่ของฉัน', chinese: '我的媽媽' }, imageQuery: 'mother mom', toneClass: null },
  { id: 'v076', thai: 'เพื่อน', chinese: '朋友', pos: '名詞', category: 'family', example: { thai: 'เพื่อนสนิท', chinese: '親密好友' }, imageQuery: 'friends together', toneClass: null },
  { id: 'v077', thai: 'ครอบครัว', chinese: '家人／家庭', pos: '名詞', category: 'family', example: { thai: 'ครอบครัวของฉัน', chinese: '我的家人' }, imageQuery: 'family together', toneClass: null },
  { id: 'v078', thai: 'คนไทย', chinese: '泰國人', pos: '名詞', category: 'family', example: { thai: 'เขาเป็นคนไทย', chinese: '他是泰國人' }, imageQuery: 'thai people', toneClass: null },

  // 疑問詞
  { id: 'v079', thai: 'อะไร', chinese: '什麼？', pos: '疑問詞', category: 'question', example: { thai: 'นี่คืออะไร', chinese: '這是什麼？' }, imageQuery: 'question what', toneClass: null },
  { id: 'v080', thai: 'ทำไม', chinese: '為什麼？', pos: '疑問詞', category: 'question', example: { thai: 'ทำไมถึงเป็นแบบนี้', chinese: '為什麼會這樣？' }, imageQuery: 'why question confused', toneClass: null },
  { id: 'v081', thai: 'เมื่อไหร่', chinese: '什麼時候？', pos: '疑問詞', category: 'question', example: { thai: 'จะมาเมื่อไหร่', chinese: '什麼時候來？' }, imageQuery: 'when time calendar', toneClass: null },
  { id: 'v082', thai: 'ใคร', chinese: '誰？', pos: '疑問詞', category: 'question', example: { thai: 'ใครทำ', chinese: '誰做的？' }, imageQuery: 'who person question', toneClass: null },
  { id: 'v083', thai: 'อย่างไร', chinese: '怎麼？如何？', pos: '疑問詞', category: 'question', example: { thai: 'ทำอย่างไร', chinese: '怎麼做？' }, imageQuery: 'how question', toneClass: null },

  // ── 數字（擴充）────────────────────────────────────────────────────
  { id: 'v084', thai: 'สิบเอ็ด', chinese: '十一', pos: '數詞', category: 'number', example: { thai: 'สิบเอ็ดคน', chinese: '十一個人' }, imageQuery: 'number eleven', toneClass: null },
  { id: 'v085', thai: 'ยี่สิบ', chinese: '二十', pos: '數詞', category: 'number', example: { thai: 'ยี่สิบบาท', chinese: '二十泰銖' }, imageQuery: 'number twenty', toneClass: null },
  { id: 'v086', thai: 'ห้าสิบ', chinese: '五十', pos: '數詞', category: 'number', example: { thai: 'ห้าสิบนาที', chinese: '五十分鐘' }, imageQuery: 'number fifty', toneClass: null },
  { id: 'v087', thai: 'หนึ่งร้อย', chinese: '一百', pos: '數詞', category: 'number', example: { thai: 'หนึ่งร้อยบาท', chinese: '一百泰銖' }, imageQuery: 'hundred money', toneClass: null },
  { id: 'v088', thai: 'หนึ่งพัน', chinese: '一千', pos: '數詞', category: 'number', example: { thai: 'หนึ่งพันบาท', chinese: '一千泰銖' }, imageQuery: 'thousand money', toneClass: null },

  // ── 星期 ───────────────────────────────────────────────────────────
  { id: 'v089', thai: 'วันอาทิตย์', chinese: '星期日', pos: '名詞', category: 'day', example: { thai: 'วันอาทิตย์หยุดพัก', chinese: '星期日休息' }, imageQuery: 'sunday rest holiday', toneClass: null },
  { id: 'v090', thai: 'วันจันทร์', chinese: '星期一', pos: '名詞', category: 'day', example: { thai: 'วันจันทร์ไปทำงาน', chinese: '星期一去上班' }, imageQuery: 'monday work office', toneClass: null },
  { id: 'v091', thai: 'วันอังคาร', chinese: '星期二', pos: '名詞', category: 'day', example: { thai: 'วันอังคารนี้', chinese: '這個星期二' }, imageQuery: 'tuesday calendar', toneClass: null },
  { id: 'v092', thai: 'วันพุธ', chinese: '星期三', pos: '名詞', category: 'day', example: { thai: 'วันพุธกลางสัปดาห์', chinese: '星期三週中' }, imageQuery: 'wednesday midweek', toneClass: null },
  { id: 'v093', thai: 'วันพฤหัสบดี', chinese: '星期四', pos: '名詞', category: 'day', example: { thai: 'วันพฤหัสบดีนี้', chinese: '這個星期四' }, imageQuery: 'thursday calendar', toneClass: null },
  { id: 'v094', thai: 'วันศุกร์', chinese: '星期五', pos: '名詞', category: 'day', example: { thai: 'วันศุกร์เย็น', chinese: '星期五傍晚' }, imageQuery: 'friday evening happy', toneClass: null },
  { id: 'v095', thai: 'วันเสาร์', chinese: '星期六', pos: '名詞', category: 'day', example: { thai: 'วันเสาร์เที่ยว', chinese: '星期六出遊' }, imageQuery: 'saturday travel fun', toneClass: null },

  // ── 方向 ───────────────────────────────────────────────────────────
  { id: 'v096', thai: 'ซ้าย', chinese: '左邊', pos: '名詞', category: 'direction', example: { thai: 'เลี้ยวซ้าย', chinese: '左轉' }, imageQuery: 'left arrow direction', toneClass: null },
  { id: 'v097', thai: 'ขวา', chinese: '右邊', pos: '名詞', category: 'direction', example: { thai: 'เลี้ยวขวา', chinese: '右轉' }, imageQuery: 'right arrow direction', toneClass: null },
  { id: 'v098', thai: 'ตรงไป', chinese: '直走', pos: '副詞', category: 'direction', example: { thai: 'ตรงไปเลย', chinese: '一直直走' }, imageQuery: 'straight road ahead', toneClass: null },
  { id: 'v099', thai: 'ข้างหน้า', chinese: '前面', pos: '名詞', category: 'direction', example: { thai: 'อยู่ข้างหน้า', chinese: '就在前面' }, imageQuery: 'front ahead forward', toneClass: null },
  { id: 'v100', thai: 'ข้างหลัง', chinese: '後面', pos: '名詞', category: 'direction', example: { thai: 'อยู่ข้างหลัง', chinese: '在後面' }, imageQuery: 'behind back rear', toneClass: null },
  { id: 'v101', thai: 'ใกล้', chinese: '近／附近', pos: '形容詞', category: 'direction', example: { thai: 'อยู่ใกล้ๆ', chinese: '就在附近' }, imageQuery: 'nearby close distance', toneClass: null },

  // ── 動物 ───────────────────────────────────────────────────────────
  { id: 'v102', thai: 'หมา', chinese: '狗', pos: '名詞', category: 'animal', example: { thai: 'หมาน่ารัก', chinese: '狗狗很可愛' }, imageQuery: 'dog cute puppy', toneClass: null },
  { id: 'v103', thai: 'แมว', chinese: '貓', pos: '名詞', category: 'animal', example: { thai: 'แมวขาว', chinese: '白色的貓' }, imageQuery: 'cat cute white', toneClass: null },
  { id: 'v104', thai: 'หมู', chinese: '豬', pos: '名詞', category: 'animal', example: { thai: 'หมูย่าง', chinese: '烤豬肉' }, imageQuery: 'pig farm animal', toneClass: null },
  { id: 'v105', thai: 'วัว', chinese: '牛', pos: '名詞', category: 'animal', example: { thai: 'วัวในทุ่ง', chinese: '田野中的牛' }, imageQuery: 'cow field farm', toneClass: null },
  { id: 'v106', thai: 'ช้าง', chinese: '大象', pos: '名詞', category: 'animal', example: { thai: 'ช้างไทย', chinese: '泰國大象' }, imageQuery: 'elephant thailand', toneClass: null },
  { id: 'v107', thai: 'นก', chinese: '鳥', pos: '名詞', category: 'animal', example: { thai: 'นกร้อง', chinese: '鳥在叫' }, imageQuery: 'bird singing tree', toneClass: null },
  { id: 'v108', thai: 'ปลา', chinese: '魚', pos: '名詞', category: 'animal', example: { thai: 'ปลาทะเล', chinese: '海魚' }, imageQuery: 'fish ocean sea', toneClass: null },
  { id: 'v109', thai: 'ลิง', chinese: '猴子', pos: '名詞', category: 'animal', example: { thai: 'ลิงในป่า', chinese: '森林中的猴子' }, imageQuery: 'monkey jungle', toneClass: null },
  { id: 'v110', thai: 'กระต่าย', chinese: '兔子', pos: '名詞', category: 'animal', example: { thai: 'กระต่ายสีขาว', chinese: '白色兔子' }, imageQuery: 'rabbit white cute', toneClass: null },

  // ── 衣物 ───────────────────────────────────────────────────────────
  { id: 'v111', thai: 'เสื้อ', chinese: '上衣', pos: '名詞', category: 'clothing', example: { thai: 'เสื้อสวย', chinese: '上衣很漂亮' }, imageQuery: 'shirt clothing fashion', toneClass: null },
  { id: 'v112', thai: 'กางเกง', chinese: '褲子', pos: '名詞', category: 'clothing', example: { thai: 'กางเกงขาสั้น', chinese: '短褲' }, imageQuery: 'pants shorts fashion', toneClass: null },
  { id: 'v113', thai: 'รองเท้า', chinese: '鞋子', pos: '名詞', category: 'clothing', example: { thai: 'รองเท้าใหม่', chinese: '新鞋' }, imageQuery: 'shoes sneakers', toneClass: null },
  { id: 'v114', thai: 'หมวก', chinese: '帽子', pos: '名詞', category: 'clothing', example: { thai: 'หมวกสีแดง', chinese: '紅色帽子' }, imageQuery: 'hat cap red', toneClass: null },
  { id: 'v115', thai: 'กระเป๋า', chinese: '包包', pos: '名詞', category: 'clothing', example: { thai: 'กระเป๋าสตางค์', chinese: '錢包' }, imageQuery: 'bag purse fashion', toneClass: null },
  { id: 'v116', thai: 'เสื้อผ้า', chinese: '衣服', pos: '名詞', category: 'clothing', example: { thai: 'ซื้อเสื้อผ้า', chinese: '買衣服' }, imageQuery: 'clothes shopping', toneClass: null },
  { id: 'v117', thai: 'แว่นตา', chinese: '眼鏡', pos: '名詞', category: 'clothing', example: { thai: 'แว่นตาสวย', chinese: '眼鏡很好看' }, imageQuery: 'glasses eyewear', toneClass: null },

  // ── 健康 ───────────────────────────────────────────────────────────
  { id: 'v118', thai: 'หมอ', chinese: '醫生', pos: '名詞', category: 'health', example: { thai: 'ไปหาหมอ', chinese: '去看醫生' }, imageQuery: 'doctor medical hospital', toneClass: null },
  { id: 'v119', thai: 'ยา', chinese: '藥', pos: '名詞', category: 'health', example: { thai: 'กินยา', chinese: '吃藥' }, imageQuery: 'medicine pills pharmacy', toneClass: null },
  { id: 'v120', thai: 'เจ็บ', chinese: '痛', pos: '動詞', category: 'health', example: { thai: 'เจ็บมาก', chinese: '很痛' }, imageQuery: 'pain hurt injury', toneClass: null },
  { id: 'v121', thai: 'ป่วย', chinese: '生病', pos: '動詞', category: 'health', example: { thai: 'ป่วยอยู่', chinese: '正在生病' }, imageQuery: 'sick illness cold', toneClass: null },
  { id: 'v122', thai: 'ไข้', chinese: '發燒', pos: '名詞', category: 'health', example: { thai: 'มีไข้', chinese: '發燒了' }, imageQuery: 'fever temperature thermometer', toneClass: null },
  { id: 'v123', thai: 'ฟัน', chinese: '牙齒', pos: '名詞', category: 'health', example: { thai: 'ปวดฟัน', chinese: '牙痛' }, imageQuery: 'teeth dental smile', toneClass: null },
  { id: 'v124', thai: 'พัก', chinese: '休息', pos: '動詞', category: 'health', example: { thai: 'พักผ่อน', chinese: '休息放鬆' }, imageQuery: 'rest relax sleep', toneClass: null },

  // ── 餐廳點餐 ───────────────────────────────────────────────────────
  { id: 'v125', thai: 'เมนู', chinese: '菜單', pos: '名詞', category: 'restaurant', example: { thai: 'ดูเมนูก่อน', chinese: '先看菜單' }, imageQuery: 'menu restaurant food', toneClass: null },
  { id: 'v126', thai: 'สั่ง', chinese: '點餐', pos: '動詞', category: 'restaurant', example: { thai: 'สั่งอาหาร', chinese: '點菜' }, imageQuery: 'order food restaurant', toneClass: null },
  { id: 'v127', thai: 'เผ็ด', chinese: '辣', pos: '形容詞', category: 'restaurant', example: { thai: 'เผ็ดมาก', chinese: '很辣' }, imageQuery: 'spicy chili hot food', toneClass: null },
  { id: 'v128', thai: 'หวาน', chinese: '甜', pos: '形容詞', category: 'restaurant', example: { thai: 'หวานมาก', chinese: '很甜' }, imageQuery: 'sweet dessert sugar', toneClass: null },
  { id: 'v129', thai: 'เปรี้ยว', chinese: '酸', pos: '形容詞', category: 'restaurant', example: { thai: 'เปรี้ยวนิดหน่อย', chinese: '有點酸' }, imageQuery: 'sour lemon citrus', toneClass: null },
  { id: 'v130', thai: 'เค็ม', chinese: '鹹', pos: '形容詞', category: 'restaurant', example: { thai: 'เค็มไปหน่อย', chinese: '有點鹹' }, imageQuery: 'salty food seasoning', toneClass: null },
  { id: 'v131', thai: 'อร่อย', chinese: '好吃', pos: '形容詞', category: 'restaurant', example: { thai: 'อาหารอร่อยมาก', chinese: '食物很好吃' }, imageQuery: 'delicious thai food', toneClass: null },

  // ── 自然 ───────────────────────────────────────────────────────────
  { id: 'v132', thai: 'ทะเล', chinese: '海', pos: '名詞', category: 'nature', example: { thai: 'ทะเลสวย', chinese: '海很漂亮' }, imageQuery: 'ocean sea thailand beach', toneClass: null },
  { id: 'v133', thai: 'ภูเขา', chinese: '山', pos: '名詞', category: 'nature', example: { thai: 'ขึ้นภูเขา', chinese: '爬山' }, imageQuery: 'mountain hiking nature', toneClass: null },
  { id: 'v134', thai: 'ดอกไม้', chinese: '花', pos: '名詞', category: 'nature', example: { thai: 'ดอกไม้สวย', chinese: '花很漂亮' }, imageQuery: 'flower beautiful bloom', toneClass: null },
  { id: 'v135', thai: 'ต้นไม้', chinese: '樹', pos: '名詞', category: 'nature', example: { thai: 'ต้นไม้ใหญ่', chinese: '大樹' }, imageQuery: 'tree large forest', toneClass: null },
  { id: 'v136', thai: 'แม่น้ำ', chinese: '河川', pos: '名詞', category: 'nature', example: { thai: 'แม่น้ำเจ้าพระยา', chinese: '昭披耶河' }, imageQuery: 'river thailand chao phraya', toneClass: null },
  { id: 'v137', thai: 'ท้องฟ้า', chinese: '天空', pos: '名詞', category: 'nature', example: { thai: 'ท้องฟ้าสีน้ำเงิน', chinese: '藍色天空' }, imageQuery: 'sky blue clouds', toneClass: null },

  // ── 動詞（擴充）────────────────────────────────────────────────────
  { id: 'v138', thai: 'พูด', chinese: '說話', pos: '動詞', category: 'verb', example: { thai: 'พูดภาษาไทยได้', chinese: '會說泰語' }, imageQuery: 'speaking talk conversation', toneClass: null },
  { id: 'v139', thai: 'อ่าน', chinese: '讀', pos: '動詞', category: 'verb', example: { thai: 'อ่านหนังสือ', chinese: '讀書' }, imageQuery: 'reading book study', toneClass: null },
  { id: 'v140', thai: 'เขียน', chinese: '寫', pos: '動詞', category: 'verb', example: { thai: 'เขียนจดหมาย', chinese: '寫信' }, imageQuery: 'writing letter pen', toneClass: null },
  { id: 'v141', thai: 'ฟัง', chinese: '聽', pos: '動詞', category: 'verb', example: { thai: 'ฟังเพลง', chinese: '聽歌' }, imageQuery: 'listening music headphones', toneClass: null },
  { id: 'v142', thai: 'เรียน', chinese: '學習', pos: '動詞', category: 'verb', example: { thai: 'เรียนภาษาไทย', chinese: '學泰語' }, imageQuery: 'studying learning classroom', toneClass: null },
  { id: 'v143', thai: 'ทำงาน', chinese: '工作', pos: '動詞', category: 'verb', example: { thai: 'ทำงานหนัก', chinese: '努力工作' }, imageQuery: 'working office hard', toneClass: null },

  // ── 形容詞（擴充）──────────────────────────────────────────────────
  { id: 'v144', thai: 'เร็ว', chinese: '快', pos: '形容詞', category: 'adjective', example: { thai: 'เร็วมาก', chinese: '很快' }, imageQuery: 'fast speed racing', toneClass: null },
  { id: 'v145', thai: 'ช้า', chinese: '慢', pos: '形容詞', category: 'adjective', example: { thai: 'ช้าไปหน่อย', chinese: '有點慢' }, imageQuery: 'slow turtle snail', toneClass: null },
  { id: 'v146', thai: 'เยอะ', chinese: '多', pos: '形容詞', category: 'adjective', example: { thai: 'มีเยอะมาก', chinese: '有很多' }, imageQuery: 'many lots abundance', toneClass: null },
  { id: 'v147', thai: 'น้อย', chinese: '少', pos: '形容詞', category: 'adjective', example: { thai: 'น้อยไป', chinese: '太少了' }, imageQuery: 'few little small amount', toneClass: null },
  { id: 'v148', thai: 'ใหม่', chinese: '新', pos: '形容詞', category: 'adjective', example: { thai: 'ของใหม่', chinese: '新東西' }, imageQuery: 'new fresh modern', toneClass: null },
  { id: 'v149', thai: 'เก่า', chinese: '舊', pos: '形容詞', category: 'adjective', example: { thai: 'ของเก่า', chinese: '舊東西' }, imageQuery: 'old vintage antique', toneClass: null },

  // ── 常用語助詞 ──────────────────────────────────────────────────────
  { id: 'v150', thai: 'ครับ', chinese: '禮貌語（男）', pos: '語氣詞', category: 'particle', example: { thai: 'ขอบคุณครับ', chinese: '謝謝（男性用）' }, imageQuery: 'polite bow thai', toneClass: null },
  { id: 'v151', thai: 'ค่ะ', chinese: '禮貌語（女）', pos: '語氣詞', category: 'particle', example: { thai: 'ขอบคุณค่ะ', chinese: '謝謝（女性用）' }, imageQuery: 'polite bow thai woman', toneClass: null },
  { id: 'v152', thai: 'นะ', chinese: '語氣助詞（柔和）', pos: '語氣詞', category: 'particle', example: { thai: 'ไปด้วยกันนะ', chinese: '一起去嘛' }, imageQuery: 'soft casual friendly thai', toneClass: null },
  { id: 'v153', thai: 'เลย', chinese: '根本／就是', pos: '副詞', category: 'particle', example: { thai: 'ดีเลย', chinese: '真的很好' }, imageQuery: 'emphasis expression', toneClass: null },
];

const CATEGORIES = [
  { id: 'greeting',   label: '問候',   emoji: '👋', count: 5  },
  { id: 'pronoun',    label: '人稱',   emoji: '🙋', count: 5  },
  { id: 'number',     label: '數字',   emoji: '🔢', count: 15 },
  { id: 'color',      label: '顏色',   emoji: '🎨', count: 5  },
  { id: 'food',       label: '食物',   emoji: '🍜', count: 5  },
  { id: 'time',       label: '時間',   emoji: '🕐', count: 5  },
  { id: 'day',        label: '星期',   emoji: '📅', count: 7  },
  { id: 'transport',  label: '交通',   emoji: '🚕', count: 5  },
  { id: 'direction',  label: '方向',   emoji: '🧭', count: 6  },
  { id: 'shopping',   label: '購物',   emoji: '🛍️', count: 5  },
  { id: 'restaurant', label: '餐廳',   emoji: '🍽️', count: 7  },
  { id: 'body',       label: '身體',   emoji: '🫀', count: 5  },
  { id: 'health',     label: '健康',   emoji: '💊', count: 7  },
  { id: 'emotion',    label: '情感',   emoji: '😊', count: 5  },
  { id: 'verb',       label: '動詞',   emoji: '🏃', count: 11 },
  { id: 'place',      label: '地點',   emoji: '📍', count: 5  },
  { id: 'adjective',  label: '形容詞', emoji: '✨', count: 11 },
  { id: 'weather',    label: '天氣',   emoji: '🌤️', count: 3  },
  { id: 'nature',     label: '自然',   emoji: '🌿', count: 6  },
  { id: 'animal',     label: '動物',   emoji: '🐾', count: 9  },
  { id: 'clothing',   label: '衣物',   emoji: '👕', count: 7  },
  { id: 'family',     label: '家庭',   emoji: '👨‍👩‍👧', count: 5  },
  { id: 'question',   label: '疑問詞', emoji: '❓', count: 5  },
  { id: 'particle',   label: '常用語', emoji: '💬', count: 4  },
];

// 泰語字母表（42個常用子音）
const ALPHABET = [
  // 中音字（🟢 綠色）
  { id: 'a001', thai: 'ก', name: '雞', sound: 'ก/ก', tip: '字形像雞的嘴喙，記：ก ไก่（雞）', toneClass: 'mid', mascot: '🐓 公雞', imageQuery: 'rooster chicken' },
  { id: 'a002', thai: 'จ', name: '碟子', sound: 'จ/ด', tip: '字形像碟子側面，記：จ จาน（碟）', toneClass: 'mid', mascot: '🍽️ 瓷碟', imageQuery: 'plate dish porcelain' },
  { id: 'a003', thai: 'ด', name: '小孩', sound: 'ด/ด', tip: '字形像小孩蜷縮，記：ด เด็ก（孩）', toneClass: 'mid', mascot: '👦 小孩', imageQuery: 'child kid' },
  { id: 'a004', thai: 'ต', name: '烏龜', sound: 'ต/ด', tip: '字形像烏龜縮頭，記：ต เต่า（龜）', toneClass: 'mid', mascot: '🐢 烏龜', imageQuery: 'turtle tortoise' },
  { id: 'a005', thai: 'บ', name: '葉子', sound: 'บ/บ', tip: '字形像樹葉，記：บ ใบไม้（葉）', toneClass: 'mid', mascot: '🍃 樹葉', imageQuery: 'leaf green plant' },
  { id: 'a006', thai: 'ป', name: '魚', sound: 'ป/บ', tip: '字形像魚嘴，記：ป ปลา（魚）', toneClass: 'mid', mascot: '🐟 魚', imageQuery: 'fish' },
  { id: 'a007', thai: 'อ', name: '盆子', sound: 'อ/–', tip: '字形像浴缸，記：อ อ่าง（盆）', toneClass: 'mid', mascot: '🛁 浴缸', imageQuery: 'bathtub bath' },

  // 低音字（🔵 藍色）
  { id: 'a008', thai: 'ง', name: '蛇', sound: 'ง/ง', tip: '字形像蛇蜿蜒，記：ง งู（蛇）', toneClass: 'low', mascot: '🐍 蛇', imageQuery: 'snake serpent' },
  { id: 'a009', thai: 'ณ', name: '沙彌', sound: 'น/น', tip: '字形似僧衣，記：ณ เณร（沙彌）', toneClass: 'low', mascot: '🧘 小和尚', imageQuery: 'monk buddhist' },
  { id: 'a010', thai: 'น', name: '老鼠', sound: 'น/น', tip: '字形像老鼠尾巴，記：น หนู（鼠）', toneClass: 'low', mascot: '🐭 老鼠', imageQuery: 'mouse rat' },
  { id: 'a011', thai: 'ม', name: '馬', sound: 'ม/ม', tip: '字形像馬鞍，記：ม ม้า（馬）', toneClass: 'low', mascot: '🐴 馬', imageQuery: 'horse' },
  { id: 'a012', thai: 'ย', name: '女孩', sound: 'ย/ย', tip: '字形像女孩坐著，記：ย หยิง（女）', toneClass: 'low', mascot: '👧 女孩', imageQuery: 'girl young woman' },
  { id: 'a013', thai: 'ร', name: '船', sound: 'ร/น', tip: '字形像船帆，記：ร เรือ（船）', toneClass: 'low', mascot: '⛵ 船', imageQuery: 'boat ship' },
  { id: 'a014', thai: 'ล', name: '猴子', sound: 'ล/น', tip: '字形像猴子垂尾，記：ล ลิง（猴）', toneClass: 'low', mascot: '🐒 猴子', imageQuery: 'monkey' },
  { id: 'a015', thai: 'ว', name: '戒指', sound: 'ว/ว', tip: '字形像戒指圓圈，記：ว แหวน（戒）', toneClass: 'low', mascot: '💍 戒指', imageQuery: 'ring jewelry' },
  { id: 'a016', thai: 'ค', name: '水牛', sound: 'ค/ก', tip: '字形像水牛角，記：ค ควาย（牛）', toneClass: 'low', mascot: '🐃 水牛', imageQuery: 'buffalo water buffalo' },
  { id: 'a017', thai: 'ฆ', name: '鐘', sound: 'ค/ก', tip: '字形像大鐘，記：ฆ ระฆัง（鐘）', toneClass: 'low', mascot: '🔔 大鐘', imageQuery: 'bell gong' },
  { id: 'a018', thai: 'ช', name: '大象', sound: 'ช/ด', tip: '字形像象鼻，記：ช ช้าง（象）', toneClass: 'low', mascot: '🐘 大象', imageQuery: 'elephant' },
  { id: 'a019', thai: 'ซ', name: '鐵鍊', sound: 'ส/ด', tip: '字形像鎖鏈節，記：ซ โซ่（鏈）', toneClass: 'low', mascot: '⛓️ 鎖鏈', imageQuery: 'chain lock' },
  { id: 'a020', thai: 'พ', name: '神廟', sound: 'พ/บ', tip: '字形像廟頂，記：พ พาน（廟）', toneClass: 'low', mascot: '🛕 神廟', imageQuery: 'thai temple pagoda' },
  { id: 'a021', thai: 'ฟ', name: '牙齒', sound: 'ฟ/บ', tip: '字形像兩排牙，記：ฟ ฟัน（齒）', toneClass: 'low', mascot: '🦷 牙齒', imageQuery: 'teeth dental' },
  { id: 'a022', thai: 'ภ', name: '山', sound: 'พ/บ', tip: '字形像山峰，記：ภ ภูเขา（山）', toneClass: 'low', mascot: '⛰️ 山', imageQuery: 'mountain' },
  { id: 'a023', thai: 'ท', name: '士兵', sound: 'ท/ด', tip: '字形像士兵站崗，記：ท ทหาร（兵）', toneClass: 'low', mascot: '⚔️ 士兵', imageQuery: 'soldier military' },
  { id: 'a024', thai: 'ธ', name: '旗幟', sound: 'ท/ด', tip: '字形像旗桿旗子，記：ธ ธง（旗）', toneClass: 'low', mascot: '🚩 旗幟', imageQuery: 'flag banner' },
  { id: 'a025', thai: 'ห', name: '梟', sound: 'ห/–', tip: '字形像貓頭鷹眼睛，記：ห หีบ（箱）', toneClass: 'low', mascot: '🦉 貓頭鷹', imageQuery: 'owl bird' },

  // 高音字（🔴 紅色）
  { id: 'a026', thai: 'ข', name: '蛋', sound: 'ข/ก', tip: '字形像雞蛋，記：ข ไข่（蛋）', toneClass: 'high', mascot: '🥚 蛋', imageQuery: 'egg' },
  { id: 'a027', thai: 'ฃ', name: '瓶子', sound: 'ข/ก', tip: '古字，現代少用，記：ฃ ขวด（瓶）', toneClass: 'high', mascot: '🍶 瓶子', imageQuery: 'bottle container' },
  { id: 'a028', thai: 'ฉ', name: '篩子', sound: 'ช/–', tip: '字形像篩子網格，記：ฉ ฉิ่ง（篩）', toneClass: 'high', mascot: '🫙 篩子', imageQuery: 'sieve strainer' },
  { id: 'a029', thai: 'ผ', name: '蜜蜂', sound: 'ผ/–', tip: '字形像蜂巢，記：ผ ผึ้ง（蜂）', toneClass: 'high', mascot: '🐝 蜜蜂', imageQuery: 'bee honey' },
  { id: 'a030', thai: 'ฝ', name: '蓋子', sound: 'ฝ/–', tip: '字形像鍋蓋，記：ฝ ฝา（蓋）', toneClass: 'high', mascot: '🍳 鍋蓋', imageQuery: 'pot lid cover' },
  { id: 'a031', thai: 'ถ', name: '袋子', sound: 'ถ/ด', tip: '字形像袋子，記：ถ ถุง（袋）', toneClass: 'high', mascot: '🛍️ 袋子', imageQuery: 'bag sack' },
  { id: 'a032', thai: 'ฐ', name: '台座', sound: 'ถ/ด', tip: '字形像基座，記：ฐ ฐาน（座）', toneClass: 'high', mascot: '🏺 基座', imageQuery: 'pedestal base' },
  { id: 'a033', thai: 'ส', name: '虎', sound: 'ส/ด', tip: '字形像老虎張嘴，記：ส เสือ（虎）', toneClass: 'high', mascot: '🐯 老虎', imageQuery: 'tiger' },
  { id: 'a034', thai: 'ศ', name: '亭子', sound: 'ส/ด', tip: '字形像涼亭，記：ศ ศาลา（亭）', toneClass: 'high', mascot: '⛩️ 涼亭', imageQuery: 'pavilion gazebo' },
  { id: 'a035', thai: 'ษ', name: '老人', sound: 'ส/ด', tip: '字形像老人彎腰，記：ษ ผู้เฒ่า（翁）', toneClass: 'high', mascot: '👴 老人', imageQuery: 'elderly old man' },
  { id: 'a036', thai: 'ฮ', name: '梟（低）', sound: 'ห/–', tip: '字形像貓頭鷹，記：ฮ นกฮูก（梟）', toneClass: 'high', mascot: '🦉 貓頭鷹', imageQuery: 'owl night' },
];
