export type CityKey = "songjiang" | "shenzhen";

export interface CityConfig {
  name: string;
  emoji: string;
  center: [number, number];
  zoom: number;
  description: string;
}

export const CITIES: Record<CityKey, CityConfig> = {
  songjiang: {
    name: "松江大学城",
    emoji: "🏫",
    center: [31.0505, 121.212],
    zoom: 14,
    description: "上海松江 · 7所高校聚集",
  },
  shenzhen: {
    name: "深圳大学城",
    emoji: "🌴",
    center: [22.59, 113.97],
    zoom: 15,
    description: "深圳南山西丽 · 5所名校云集",
  },
};

export interface SignatureDish {
  name: string;
  price: number;
  emoji: string;
  popular?: boolean;
}

export interface Review {
  user: string;
  rating: number;
  text: string;
  date: string;
}

export interface MockRestaurant {
  id: string;
  city: CityKey;
  name: string;
  cuisine: string;
  avgPrice: number;
  distance: number;
  walkMinutes: number;
  image: string;
  tags: string[];
  emoji_tags: string[];
  mbti_tags: string[];
  scenes: string[];
  rating: number;
  zone: string;
  hasAC: boolean;
  current_viewers: number;
  hygiene_rating: "A" | "B";
  has_trial_meal: boolean;
  last_100m_status: string;
  mapPosition: { x: number; y: number };
  coordinates: { lat: number; lng: number };
  signature_dishes: SignatureDish[];
  reviews: Review[];
  menu_images?: string[];
  phone?: string;
  opening_hours?: string;
  delivery_fee?: number;
  bounty_reward?: number;
}

// ========== 松江大学城 ==========
export const mockRestaurants: MockRestaurant[] = [
  {
    id: "r1", city: "songjiang", name: "翔仔好味馆", cuisine: "中式快餐", avgPrice: 18,
    distance: 50, walkMinutes: 1,
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["穷鬼套餐", "十分钟速决", "下课直奔", "高碳水"],
    emoji_tags: ["🏃‍♂️出餐极速", "⚠️阿姨手抖", "💰性价比王"],
    mbti_tags: ["I人自闭专座", "期末考神护体"],
    scenes: ["morning", "budget", "latenight"], rating: 4.7, zone: "樱花广场",
    hasAC: true, current_viewers: 8, hygiene_rating: "A", has_trial_meal: true,
    last_100m_status: "外卖柜空闲·可直送宿舍", bounty_reward: 3,
    phone: "021-5789-0001", opening_hours: "06:30-23:00", delivery_fee: 2,
    menu_images: ["https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 30, y: 25 }, coordinates: { lat: 31.0512, lng: 121.2098 },
    signature_dishes: [
      { name: "红烧肉盖饭", price: 15, emoji: "🍖", popular: true },
      { name: "番茄鸡蛋面", price: 12, emoji: "🍝" },
      { name: "麻辣香锅", price: 22, emoji: "🌶️" },
    ],
    reviews: [
      { user: "学姐小王", rating: 5, text: "量大管饱，阿姨真的手抖！红烧肉给的超多", date: "2026-02" },
      { user: "大一萌新", rating: 4, text: "便宜好吃，就是位置有点挤，中午需要排队", date: "2026-01" },
    ],
  },
  {
    id: "r2", city: "songjiang", name: "Facepork脸猪猪排", cuisine: "炸物小吃", avgPrice: 35,
    distance: 280, walkMinutes: 4,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["碳水快乐", "肉食狂热", "约饭首选"],
    emoji_tags: ["🤤炸物天堂", "📸出片率高", "🔥排队预警"],
    mbti_tags: ["E人破冰大桌", "课间社交货币"],
    scenes: ["gathering"], rating: 4.5, zone: "启源生活广场",
    hasAC: true, current_viewers: 15, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜爆满建议自提", bounty_reward: 5,
    phone: "021-5789-0002", opening_hours: "10:00-22:00", delivery_fee: 3,
    menu_images: ["https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 55, y: 40 }, coordinates: { lat: 31.0525, lng: 121.2135 },
    signature_dishes: [
      { name: "日式厚切猪排", price: 32, emoji: "🥩", popular: true },
      { name: "芝士炸鸡翅", price: 18, emoji: "🍗" },
      { name: "咖喱猪排饭", price: 35, emoji: "🍛" },
    ],
    reviews: [
      { user: "吃货小李", rating: 5, text: "猪排真的超厚超酥！蘸酱绝了，每周必来", date: "2026-03" },
      { user: "设计系学妹", rating: 4, text: "出片率很高，猪排摆盘好看，味道也不错", date: "2026-02" },
    ],
  },
  {
    id: "r3", city: "songjiang", name: "左庭右院鲜牛肉火锅", cuisine: "火锅", avgPrice: 128,
    distance: 1020, walkMinutes: 13,
    image: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["周末改善", "社团聚餐", "正式约会"],
    emoji_tags: ["🥩肉质鲜嫩", "⏰等位较久", "💯聚餐首选"],
    mbti_tags: ["E人破冰大桌", "答辩庆功宴"],
    scenes: ["gathering"], rating: 4.6, zone: "开元地中海",
    hasAC: true, current_viewers: 23, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "仅支持堂食·建议提前预约",
    phone: "021-5789-0003", opening_hours: "11:00-22:30", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 80, y: 68 }, coordinates: { lat: 31.0455, lng: 121.2205 },
    signature_dishes: [
      { name: "鲜切牛肉拼盘", price: 68, emoji: "🥩", popular: true },
      { name: "手打虾滑", price: 42, emoji: "🦐" },
      { name: "毛肚", price: 38, emoji: "🫕" },
    ],
    reviews: [
      { user: "社团主席", rating: 5, text: "社团聚餐首选！牛肉超新鲜，涮3秒就能吃", date: "2026-01" },
      { user: "研二老学长", rating: 4, text: "味道没话说，就是人均有点贵，适合搞活动AA", date: "2025-12" },
    ],
  },
  {
    id: "r4", city: "songjiang", name: "曼顿果汁吧", cuisine: "健康饮品", avgPrice: 22,
    distance: 300, walkMinutes: 4,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["早八续命", "颜值出片", "减脂搭子"],
    emoji_tags: ["🍊鲜榨现做", "💚减脂友好", "📸颜值出圈"],
    mbti_tags: ["I人自闭专座", "图书馆续命"],
    scenes: ["morning", "healthy"], rating: 4.3, zone: "启源生活广场",
    hasAC: true, current_viewers: 6, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "021-5789-0004", opening_hours: "07:00-21:00", delivery_fee: 3,
    menu_images: ["https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 60, y: 32 }, coordinates: { lat: 31.0528, lng: 121.214 },
    signature_dishes: [
      { name: "牛油果能量昔", price: 26, emoji: "🥑", popular: true },
      { name: "鲜榨橙汁", price: 16, emoji: "🍊" },
      { name: "açaí碗", price: 32, emoji: "🫐" },
    ],
    reviews: [
      { user: "健身达人", rating: 5, text: "减脂期最爱！牛油果昔真的很浓郁，代餐首选", date: "2026-03" },
      { user: "早八战士", rating: 4, text: "早上来一杯鲜榨橙汁续命，上课不犯困", date: "2026-02" },
    ],
  },
  {
    id: "r5", city: "songjiang", name: "老张拉面馆", cuisine: "面食", avgPrice: 16,
    distance: 120, walkMinutes: 2,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["量大管饱", "阿姨手抖", "深夜食堂", "高碳水"],
    emoji_tags: ["⚠️阿姨手抖", "🍜汤底浓郁", "💰性价比王"],
    mbti_tags: ["深夜emo治愈", "期末考神护体"],
    scenes: ["morning", "budget", "latenight"], rating: 4.4, zone: "樱花广场",
    hasAC: false, current_viewers: 11, hygiene_rating: "B", has_trial_meal: true,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "021-5789-0005", opening_hours: "06:00-01:00", delivery_fee: 1,
    menu_images: ["https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 25, y: 52 }, coordinates: { lat: 31.0508, lng: 121.2102 },
    signature_dishes: [
      { name: "红烧牛肉面", price: 16, emoji: "🍜", popular: true },
      { name: "酸菜肉丝面", price: 14, emoji: "🥬" },
      { name: "葱油拌面", price: 10, emoji: "🧅" },
    ],
    reviews: [
      { user: "夜猫子同学", rating: 5, text: "深夜食堂yyds！牛肉面汤底浓到发亮", date: "2026-02" },
      { user: "计算机系卷王", rating: 4, text: "实验室出来直奔这里，出餐快量又大", date: "2026-01" },
    ],
  },
  {
    id: "r6", city: "songjiang", name: "鲜茶道·奶茶", cuisine: "奶茶甜饮", avgPrice: 16,
    distance: 180, walkMinutes: 2,
    image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["课间摸鱼", "便宜大碗", "续命神器", "寝室宵夜"],
    emoji_tags: ["🧋招牌必喝", "💰良心价格", "🏃‍♂️取餐极速"],
    mbti_tags: ["课间社交货币", "I人自闭专座"],
    scenes: ["morning", "budget", "latenight"], rating: 4.1, zone: "文汇路商业街",
    hasAC: true, current_viewers: 9, hygiene_rating: "A", has_trial_meal: true,
    last_100m_status: "外卖柜爆满建议自提", bounty_reward: 2,
    phone: "021-5789-0006", opening_hours: "08:00-23:30", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 42, y: 62 }, coordinates: { lat: 31.0535, lng: 121.208 },
    signature_dishes: [
      { name: "芋泥波波奶茶", price: 14, emoji: "🧋", popular: true },
      { name: "杨枝甘露", price: 16, emoji: "🥭" },
      { name: "珍珠奶绿", price: 12, emoji: "🍵" },
    ],
    reviews: [
      { user: "奶茶重度患者", rating: 4, text: "比某雪冰城贵一丢丢但好喝太多了", date: "2026-03" },
      { user: "经济系小张", rating: 4, text: "性价比很高，大杯12块钱，课间来一杯刚好", date: "2026-01" },
    ],
  },
  {
    id: "r7", city: "songjiang", name: "轻享沙拉·健身餐", cuisine: "轻食沙拉", avgPrice: 38,
    distance: 400, walkMinutes: 5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["增肌减脂", "低卡轻食", "蛋白拉满"],
    emoji_tags: ["💪蛋白拉满", "🥗低卡之光", "📸摆盘精致"],
    mbti_tags: ["健身打卡标配", "I人自闭专座"],
    scenes: ["healthy"], rating: 4.5, zone: "启源生活广场",
    hasAC: true, current_viewers: 4, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "021-5789-0007", opening_hours: "10:00-21:00", delivery_fee: 4,
    menu_images: ["https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 65, y: 20 }, coordinates: { lat: 31.052, lng: 121.2128 },
    signature_dishes: [
      { name: "烟熏鸡胸沙拉", price: 36, emoji: "🥗", popular: true },
      { name: "牛油果鸡肉卷", price: 32, emoji: "🌯" },
      { name: "高蛋白能量碗", price: 42, emoji: "🥣" },
    ],
    reviews: [
      { user: "体育系肌肉哥", rating: 5, text: "增肌期天天吃，鸡胸肉不柴！蛋白质含量标注很清楚", date: "2026-02" },
      { user: "减脂期学姐", rating: 4, text: "终于不用自己带饭了，热量标注很良心", date: "2026-01" },
    ],
  },
  {
    id: "r8", city: "songjiang", name: "九宫格串串香", cuisine: "串串香", avgPrice: 58,
    distance: 600, walkMinutes: 8,
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["越吃越上头", "AA制友好", "宿舍团建", "寝室宵夜"],
    emoji_tags: ["🌶越吃越辣", "🍺配啤酒绝", "👥人多更嗨"],
    mbti_tags: ["E人破冰大桌", "宿舍团建利器"],
    scenes: ["gathering", "latenight"], rating: 4.4, zone: "大学城商业广场",
    hasAC: true, current_viewers: 18, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "仅支持堂食·AA制友好",
    phone: "021-5789-0008", opening_hours: "16:00-02:00", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 18, y: 75 }, coordinates: { lat: 31.048, lng: 121.2155 },
    signature_dishes: [
      { name: "招牌麻辣锅底", price: 28, emoji: "🫕", popular: true },
      { name: "鲜毛肚", price: 8, emoji: "🥩" },
      { name: "小郡肝串串", price: 3, emoji: "🍢" },
    ],
    reviews: [
      { user: "宿舍长老赵", rating: 5, text: "6个人吃了200出头，人均30多，串串论根卖超划算", date: "2026-03" },
      { user: "辣妹子", rating: 4, text: "锅底很正宗！就是位置稍远，建议骑车去", date: "2026-02" },
    ],
  },
  {
    id: "r9", city: "songjiang", name: "板前寿司·精致日料", cuisine: "日料寿司", avgPrice: 95,
    distance: 850, walkMinutes: 11,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["仪式感满满", "约会天花板", "味觉惊喜"],
    emoji_tags: ["🍣新鲜现做", "📸颜值超高", "💴小贵但值"],
    mbti_tags: ["约会仪式感", "答辩庆功宴"],
    scenes: ["gathering"], rating: 4.8, zone: "开元地中海",
    hasAC: true, current_viewers: 7, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "仅支持堂食·建议提前预约",
    phone: "021-5789-0009", opening_hours: "11:00-21:30", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 72, y: 55 }, coordinates: { lat: 31.046, lng: 121.2195 },
    signature_dishes: [
      { name: "三文鱼刺身拼盘", price: 58, emoji: "🍣", popular: true },
      { name: "鳗鱼饭", price: 48, emoji: "🍱" },
      { name: "天妇罗拼盘", price: 42, emoji: "🍤" },
    ],
    reviews: [
      { user: "日料爱好者", rating: 5, text: "三文鱼新鲜度拉满，入口即化！约会带ta来绝对加分", date: "2026-02" },
      { user: "过生日的同学", rating: 5, text: "生日来的，店员还送了甜品，仪式感满分", date: "2026-01" },
    ],
  },
  {
    id: "r10", city: "songjiang", name: "星巴克臻选", cuisine: "咖啡简餐", avgPrice: 42,
    distance: 350, walkMinutes: 5,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["自习续命", "WiFi超快", "安静学习"],
    emoji_tags: ["☕续命必备", "📶有WiFi", "🪑环境安静"],
    mbti_tags: ["I人自闭专座", "考研闭关修炼"],
    scenes: ["morning"], rating: 4.2, zone: "文汇路商业街",
    hasAC: true, current_viewers: 12, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "021-5789-0010", opening_hours: "07:00-22:00", delivery_fee: 5,
    menu_images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 48, y: 45 }, coordinates: { lat: 31.054, lng: 121.2075 },
    signature_dishes: [
      { name: "燕麦拿铁", price: 36, emoji: "☕", popular: true },
      { name: "抹茶星冰乐", price: 42, emoji: "🍵" },
      { name: "牛肉可颂三明治", price: 38, emoji: "🥐" },
    ],
    reviews: [
      { user: "考研党", rating: 4, text: "WiFi快，有插座，适合泡一下午写论文", date: "2026-03" },
      { user: "咖啡因依赖者", rating: 4, text: "大学城唯一正经咖啡馆，燕麦拿铁是我的续命水", date: "2026-02" },
    ],
  },
  {
    id: "r11", city: "songjiang", name: "老码头川味火锅", cuisine: "川味火锅", avgPrice: 108,
    distance: 900, walkMinutes: 12,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["辣到飞起", "锅底绝绝子", "周末必去", "寝室宵夜"],
    emoji_tags: ["🥵辣度爆表", "🫕锅底超香", "⏰等位较久"],
    mbti_tags: ["E人破冰大桌", "深夜emo治愈"],
    scenes: ["gathering", "latenight"], rating: 4.7, zone: "大学城商业广场",
    hasAC: true, current_viewers: 21, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "仅支持堂食·需等位约30分钟",
    phone: "021-5789-0011", opening_hours: "11:00-03:00", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 22, y: 38 }, coordinates: { lat: 31.0475, lng: 121.216 },
    signature_dishes: [
      { name: "麻辣牛油锅底", price: 38, emoji: "🫕", popular: true },
      { name: "极品鲜毛肚", price: 48, emoji: "🥩" },
      { name: "手工虾滑", price: 36, emoji: "🦐" },
    ],
    reviews: [
      { user: "四川同学", rating: 5, text: "终于找到接近老家味道的火锅了！牛油锅底正得很", date: "2026-01" },
      { user: "火锅星人", rating: 4, text: "周末必去，就是等位太久了，建议提前一天订位", date: "2026-02" },
    ],
  },
  {
    id: "r12", city: "songjiang", name: "Campus Pizza", cuisine: "西式披萨", avgPrice: 52,
    distance: 450, walkMinutes: 6,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["芝士控天堂", "适合拼单", "外卖也香"],
    emoji_tags: ["🧀芝士拉丝", "🍕现烤出炉", "👥适合拼单"],
    mbti_tags: ["E人破冰大桌", "宿舍团建利器"],
    scenes: ["gathering"], rating: 4.3, zone: "启源生活广场",
    hasAC: true, current_viewers: 5, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜空闲·拼单更划算",
    phone: "021-5789-0012", opening_hours: "10:30-22:00", delivery_fee: 3,
    menu_images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 52, y: 18 }, coordinates: { lat: 31.053, lng: 121.213 },
    signature_dishes: [
      { name: "超级芝士披萨", price: 48, emoji: "🍕", popular: true },
      { name: "培根肉酱意面", price: 32, emoji: "🍝" },
      { name: "蒜香面包", price: 16, emoji: "🥖" },
    ],
    reviews: [
      { user: "芝士控", rating: 5, text: "芝士给得超足，拉丝一米长！两个人拼一份12寸刚好", date: "2026-03" },
      { user: "外卖达人", rating: 4, text: "外卖送到宿舍还是脆的，好评！", date: "2026-02" },
    ],
  },
  {
    id: "r13", city: "songjiang", name: "铜锣湾牛排馆", cuisine: "西餐牛排", avgPrice: 178,
    distance: 1200, walkMinutes: 15,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["约会圣地", "吃大餐去", "生日首选"],
    emoji_tags: ["🥩汁水饱满", "🕯️约会氛围", "💎犒劳自己"],
    mbti_tags: ["约会仪式感", "答辩庆功宴"],
    scenes: ["gathering"], rating: 4.6, zone: "开元地中海",
    hasAC: true, current_viewers: 3, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "仅支持堂食·建议提前预约",
    phone: "021-5789-0013", opening_hours: "11:00-22:00", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 85, y: 48 }, coordinates: { lat: 31.045, lng: 121.221 },
    signature_dishes: [
      { name: "澳洲安格斯肉眼", price: 168, emoji: "🥩", popular: true },
      { name: "黑松露蘑菇汤", price: 38, emoji: "🍄" },
      { name: "焦糖布丁", price: 28, emoji: "🍮" },
    ],
    reviews: [
      { user: "过纪念日的情侣", rating: 5, text: "氛围太好了，灯光很暖，牛排7分熟刚好", date: "2026-02" },
      { user: "奖学金获得者", rating: 5, text: "拿了奖学金来犒劳自己，安格斯肉眼YYDS", date: "2025-12" },
    ],
  },
  {
    id: "r14", city: "songjiang", name: "鸡公煲·黄焖鸡", cuisine: "中式快餐", avgPrice: 25,
    distance: 200, walkMinutes: 3,
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["下饭神器", "米饭管够", "穷鬼之光", "高碳水", "寝室宵夜"],
    emoji_tags: ["🥵微辣刚好", "🍚米饭管够", "💰穷鬼之光"],
    mbti_tags: ["深夜emo治愈", "期末考神护体"],
    scenes: ["budget", "morning", "latenight"], rating: 4.2, zone: "樱花广场",
    hasAC: true, current_viewers: 14, hygiene_rating: "A", has_trial_meal: true,
    last_100m_status: "外卖柜空闲·可直送宿舍", bounty_reward: 3,
    phone: "021-5789-0014", opening_hours: "10:00-00:30", delivery_fee: 2,
    menu_images: ["https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 38, y: 48 }, coordinates: { lat: 31.0515, lng: 121.2105 },
    signature_dishes: [
      { name: "招牌黄焖鸡", price: 22, emoji: "🍗", popular: true },
      { name: "鸡公煲(小份)", price: 28, emoji: "🫕" },
      { name: "酸辣粉", price: 12, emoji: "🍜" },
    ],
    reviews: [
      { user: "干饭王", rating: 5, text: "黄焖鸡配米饭绝了！米饭免费续，吃到撑", date: "2026-03" },
      { user: "月底穷学生", rating: 4, text: "22块钱管饱一顿，月底救星", date: "2026-02" },
    ],
  },
  {
    id: "r15", city: "songjiang", name: "果然瘦·轻食沙拉", cuisine: "健身轻食", avgPrice: 42,
    distance: 500, walkMinutes: 7,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["0负担", "高蛋白", "减脂期救星"],
    emoji_tags: ["🥑牛油果控", "💚0负担", "📸ins风"],
    mbti_tags: ["健身打卡标配", "I人自闭专座"],
    scenes: ["healthy"], rating: 4.4, zone: "文汇路商业街",
    hasAC: true, current_viewers: 3, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "021-5789-0015", opening_hours: "09:00-21:00", delivery_fee: 4,
    menu_images: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 45, y: 82 }, coordinates: { lat: 31.0538, lng: 121.2085 },
    signature_dishes: [
      { name: "藜麦牛油果碗", price: 38, emoji: "🥑", popular: true },
      { name: "烟熏三文鱼卷", price: 42, emoji: "🐟" },
      { name: "希腊酸奶杯", price: 22, emoji: "🥛" },
    ],
    reviews: [
      { user: "ins风达人", rating: 5, text: "摆盘超好看，拍照发朋友圈获赞无数", date: "2026-03" },
      { user: "健身搭子", rating: 4, text: "热量标注透明，减脂期最爱的外食选择", date: "2026-01" },
    ],
  },

  // ========== 深圳大学城 ==========
  {
    id: "sz1", city: "shenzhen", name: "猪脚饭大王", cuisine: "广式快餐", avgPrice: 18,
    distance: 80, walkMinutes: 1,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["穷鬼套餐", "出餐极快", "饭量感人", "高碳水"],
    emoji_tags: ["🍖卤香四溢", "💰穷鬼之光", "🏃出餐极速"],
    mbti_tags: ["I人自闭专座", "期末考神护体"],
    scenes: ["budget", "morning", "latenight"], rating: 4.5, zone: "西丽街道美食街",
    hasAC: false, current_viewers: 16, hygiene_rating: "A", has_trial_meal: true,
    last_100m_status: "外卖柜空闲·可直送宿舍", bounty_reward: 3,
    phone: "0755-8888-0001", opening_hours: "06:00-23:00", delivery_fee: 2,
    menu_images: ["https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 30, y: 40 }, coordinates: { lat: 22.5885, lng: 113.968 },
    signature_dishes: [
      { name: "招牌卤猪脚饭", price: 16, emoji: "🍖", popular: true },
      { name: "叉烧双拼饭", price: 20, emoji: "🥩" },
      { name: "卤味拼盘", price: 15, emoji: "🍗" },
    ],
    reviews: [
      { user: "哈工大研究生", rating: 5, text: "猪脚卤得超入味，饭量给得很良心，16块钱吃撑", date: "2026-03" },
      { user: "南科大大一", rating: 4, text: "深圳版的翔仔好味馆，便宜好吃是真理", date: "2026-02" },
    ],
  },
  {
    id: "sz2", city: "shenzhen", name: "湘菜馆·辣得过瘾", cuisine: "湘菜", avgPrice: 45,
    distance: 350, walkMinutes: 5,
    image: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["无辣不欢", "下饭利器", "宿舍团建"],
    emoji_tags: ["🌶辣度爆表", "🍚下饭神器", "👥适合拼桌"],
    mbti_tags: ["E人破冰大桌", "宿舍团建利器"],
    scenes: ["gathering", "latenight"], rating: 4.4, zone: "大学城北门商圈",
    hasAC: true, current_viewers: 12, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜爆满建议自提",
    phone: "0755-8888-0002", opening_hours: "10:30-23:00", delivery_fee: 3,
    menu_images: ["https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 55, y: 25 }, coordinates: { lat: 22.591, lng: 113.972 },
    signature_dishes: [
      { name: "辣椒炒肉", price: 38, emoji: "🌶️", popular: true },
      { name: "剁椒鱼头", price: 58, emoji: "🐟" },
      { name: "小炒黄牛肉", price: 48, emoji: "🥩" },
    ],
    reviews: [
      { user: "湖南同学小刘", rating: 5, text: "终于找到辣度达标的湘菜了！辣椒炒肉味道正宗", date: "2026-03" },
      { user: "北大深研院学姐", rating: 4, text: "4个人点3个菜加米饭，人均45很划算", date: "2026-02" },
    ],
  },
  {
    id: "sz3", city: "shenzhen", name: "潮汕牛肉火锅", cuisine: "潮汕火锅", avgPrice: 110,
    distance: 800, walkMinutes: 10,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["鲜牛肉现切", "周末聚餐", "约会可去"],
    emoji_tags: ["🥩鲜切现涮", "⏰排队值得", "💯品质保证"],
    mbti_tags: ["E人破冰大桌", "答辩庆功宴"],
    scenes: ["gathering"], rating: 4.7, zone: "塘朗商业广场",
    hasAC: true, current_viewers: 19, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "仅支持堂食·需排队约20分钟",
    phone: "0755-8888-0003", opening_hours: "11:00-22:00", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 75, y: 60 }, coordinates: { lat: 22.586, lng: 113.975 },
    signature_dishes: [
      { name: "嫩肉·吊龙拼盘", price: 78, emoji: "🥩", popular: true },
      { name: "手打牛肉丸", price: 38, emoji: "🧆" },
      { name: "沙茶酱碟", price: 8, emoji: "🫕" },
    ],
    reviews: [
      { user: "潮汕本地人", rating: 5, text: "深圳这边能吃到这个水平的牛肉火锅不容易，涮8秒刚好", date: "2026-02" },
      { user: "清华深研院博士", rating: 4, text: "答辩完来庆功，牛肉鲜度在线，就是人均略贵", date: "2026-01" },
    ],
  },
  {
    id: "sz4", city: "shenzhen", name: "荔枝奶茶工坊", cuisine: "奶茶甜品", avgPrice: 15,
    distance: 200, walkMinutes: 3,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["课间续命", "便宜大杯", "荔枝特色"],
    emoji_tags: ["🧋大杯超满", "🍑荔枝风味", "💰学生价"],
    mbti_tags: ["课间社交货币", "I人自闭专座"],
    scenes: ["morning", "budget"], rating: 4.2, zone: "大学城北门商圈",
    hasAC: true, current_viewers: 8, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "0755-8888-0004", opening_hours: "08:00-22:30", delivery_fee: 2,
    menu_images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 50, y: 30 }, coordinates: { lat: 22.592, lng: 113.969 },
    signature_dishes: [
      { name: "岭南荔枝冰茶", price: 14, emoji: "🧋", popular: true },
      { name: "芒果椰椰", price: 16, emoji: "🥭" },
      { name: "杨枝甘露", price: 18, emoji: "🍊" },
    ],
    reviews: [
      { user: "哈工大奶茶测评", rating: 4, text: "荔枝冰茶是招牌，14块钱大杯很良心", date: "2026-03" },
      { user: "南科大学妹", rating: 4, text: "比隔壁连锁好喝，荔枝味很特别", date: "2026-02" },
    ],
  },
  {
    id: "sz5", city: "shenzhen", name: "西丽烧鹅王", cuisine: "粤式烧腊", avgPrice: 35,
    distance: 150, walkMinutes: 2,
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["烧鹅皮脆", "本地人推荐", "限量供应"],
    emoji_tags: ["🦆皮脆肉嫩", "🔥限量抢购", "💯老字号"],
    mbti_tags: ["I人自闭专座", "深夜emo治愈"],
    scenes: ["morning", "latenight"], rating: 4.6, zone: "西丽街道美食街",
    hasAC: false, current_viewers: 22, hygiene_rating: "A", has_trial_meal: true,
    last_100m_status: "外卖柜爆满建议自提·限量供应中", bounty_reward: 4,
    phone: "0755-8888-0005", opening_hours: "06:30-20:00", delivery_fee: 2,
    menu_images: ["https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 25, y: 50 }, coordinates: { lat: 22.5895, lng: 113.966 },
    signature_dishes: [
      { name: "招牌烧鹅饭", price: 32, emoji: "🦆", popular: true },
      { name: "叉烧拼烧鹅", price: 42, emoji: "🥩" },
      { name: "例汤", price: 8, emoji: "🍲" },
    ],
    reviews: [
      { user: "广东本地通", rating: 5, text: "烧鹅皮脆到炸裂！每天限量100只，去晚了就没了", date: "2026-03" },
      { user: "北方同学小赵", rating: 5, text: "来深圳后吃到的最好吃的烧鹅，瞬间理解广东人", date: "2026-01" },
    ],
  },
  {
    id: "sz6", city: "shenzhen", name: "肠粉王·潮汕味道", cuisine: "潮汕小吃", avgPrice: 14,
    distance: 400, walkMinutes: 5,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["早餐首选", "现蒸现做", "量大便宜", "高碳水"],
    emoji_tags: ["🫘馅料饱满", "💰超高性价比", "🏃出餐秒速"],
    mbti_tags: ["I人自闭专座", "期末考神护体"],
    scenes: ["morning", "budget", "latenight"], rating: 4.3, zone: "留仙洞美食广场",
    hasAC: false, current_viewers: 10, hygiene_rating: "B", has_trial_meal: true,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "0755-8888-0006", opening_hours: "05:30-14:00", delivery_fee: 1,
    menu_images: ["https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 35, y: 65 }, coordinates: { lat: 22.59, lng: 113.965 },
    signature_dishes: [
      { name: "鲜虾肠粉", price: 12, emoji: "🦐", popular: true },
      { name: "牛肉肠粉", price: 14, emoji: "🥩" },
      { name: "瘦肉粥", price: 8, emoji: "🍚" },
    ],
    reviews: [
      { user: "早餐党", rating: 5, text: "每天早上必来一份虾肠粉，12块钱4根虾超值", date: "2026-03" },
      { user: "肠粉爱好者", rating: 4, text: "酱汁调得好，不过环境一般，胜在味道", date: "2026-02" },
    ],
  },
  {
    id: "sz7", city: "shenzhen", name: "椰子鸡·海南风味", cuisine: "海南菜", avgPrice: 88,
    distance: 700, walkMinutes: 9,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["椰香四溢", "约会推荐", "养生滋补"],
    emoji_tags: ["🥥椰香浓郁", "🍗鸡肉鲜嫩", "🕯️约会氛围"],
    mbti_tags: ["约会仪式感", "E人破冰大桌"],
    scenes: ["gathering"], rating: 4.5, zone: "塘朗商业广场",
    hasAC: true, current_viewers: 9, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "仅支持堂食·建议提前预约",
    phone: "0755-8888-0007", opening_hours: "11:00-22:00", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 70, y: 55 }, coordinates: { lat: 22.587, lng: 113.974 },
    signature_dishes: [
      { name: "椰子鸡锅(2人份)", price: 98, emoji: "🥥", popular: true },
      { name: "马鲛鱼丸", price: 28, emoji: "🐟" },
      { name: "竹笙", price: 22, emoji: "🌿" },
    ],
    reviews: [
      { user: "约会小能手", rating: 5, text: "椰子水做锅底太清甜了，鸡肉嫩滑，女朋友超喜欢", date: "2026-02" },
      { user: "养生达人", rating: 4, text: "冬天来一锅暖胃又滋补，比火锅健康多了", date: "2026-01" },
    ],
  },
  {
    id: "sz8", city: "shenzhen", name: "川渝串串香", cuisine: "川味串串", avgPrice: 52,
    distance: 500, walkMinutes: 6,
    image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["麻辣鲜香", "AA制友好", "宿舍团建", "寝室宵夜"],
    emoji_tags: ["🌶麻辣过瘾", "🍢签签好吃", "👥越多越嗨"],
    mbti_tags: ["E人破冰大桌", "宿舍团建利器"],
    scenes: ["gathering", "latenight"], rating: 4.3, zone: "大学城北门商圈",
    hasAC: true, current_viewers: 14, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜爆满建议自提",
    phone: "0755-8888-0008", opening_hours: "15:00-02:00", delivery_fee: 0,
    menu_images: ["https://images.unsplash.com/photo-1551326844-4df70f78d0e9?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 58, y: 35 }, coordinates: { lat: 22.5915, lng: 113.9715 },
    signature_dishes: [
      { name: "红油串串(50签)", price: 45, emoji: "🍢", popular: true },
      { name: "冰粉", price: 8, emoji: "🍧" },
      { name: "钵钵鸡", price: 28, emoji: "🍗" },
    ],
    reviews: [
      { user: "四川留学深圳", rating: 4, text: "味道接近家乡水平，比松江那边的选择多", date: "2026-03" },
      { user: "宿舍团购王", rating: 5, text: "6个人去的，人均50不到，吃到扶墙出", date: "2026-02" },
    ],
  },
  {
    id: "sz9", city: "shenzhen", name: "咖啡实验室Lab", cuisine: "精品咖啡", avgPrice: 38,
    distance: 450, walkMinutes: 6,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["手冲精品", "自习圣地", "安静学习"],
    emoji_tags: ["☕手冲精品", "📶有WiFi", "🧠适合思考"],
    mbti_tags: ["I人自闭专座", "考研闭关修炼"],
    scenes: ["morning", "healthy"], rating: 4.6, zone: "南科大生活区",
    hasAC: true, current_viewers: 6, hygiene_rating: "A", has_trial_meal: false,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "0755-8888-0009", opening_hours: "08:00-22:00", delivery_fee: 3,
    menu_images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 60, y: 45 }, coordinates: { lat: 22.5935, lng: 113.9705 },
    signature_dishes: [
      { name: "埃塞俄比亚手冲", price: 35, emoji: "☕", popular: true },
      { name: "燕麦dirty", price: 32, emoji: "🥛" },
      { name: "抹茶芝士蛋糕", price: 28, emoji: "🍰" },
    ],
    reviews: [
      { user: "咖啡发烧友", rating: 5, text: "手冲豆子每周更新产地，老板是SCA认证咖啡师", date: "2026-03" },
      { user: "南科大论文党", rating: 4, text: "环境很安静，插座多，适合写代码写论文", date: "2026-02" },
    ],
  },
  {
    id: "sz10", city: "shenzhen", name: "脆皮烧肉饭", cuisine: "粤式快餐", avgPrice: 22,
    distance: 300, walkMinutes: 4,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=400&h=300",
    tags: ["脆皮诱惑", "下饭利器", "米饭管够", "高碳水"],
    emoji_tags: ["🔥脆皮炸裂", "🍚米饭管够", "💰性价比高"],
    mbti_tags: ["深夜emo治愈", "期末考神护体"],
    scenes: ["budget", "morning", "latenight"], rating: 4.3, zone: "留仙洞美食广场",
    hasAC: true, current_viewers: 11, hygiene_rating: "A", has_trial_meal: true,
    last_100m_status: "外卖柜空闲·可直送宿舍",
    phone: "0755-8888-0010", opening_hours: "06:30-23:30", delivery_fee: 2,
    menu_images: ["https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&q=80&w=800"],
    mapPosition: { x: 40, y: 70 }, coordinates: { lat: 22.5888, lng: 113.9655 },
    signature_dishes: [
      { name: "脆皮烧肉饭", price: 20, emoji: "🥩", popular: true },
      { name: "烧鸭腿饭", price: 22, emoji: "🍗" },
      { name: "例汤+饭", price: 12, emoji: "🍲" },
    ],
    reviews: [
      { user: "干饭王二号", rating: 5, text: "烧肉皮真的咔嚓响！配上酱油和米饭绝了", date: "2026-03" },
      { user: "月底生存模式", rating: 4, text: "20块钱吃到撑，月底就靠这家续命了", date: "2026-01" },
    ],
  },
];
