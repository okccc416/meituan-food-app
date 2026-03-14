import { Restaurant } from "@/data/restaurants";

type TimeSlot = "breakfast" | "lunch" | "afternoon" | "dinner" | "latenight";

function getTimeSlot(): TimeSlot {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10) return "breakfast";
  if (hour >= 10 && hour < 14) return "lunch";
  if (hour >= 14 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "dinner";
  return "latenight";
}

/**
 * 时段 → 场景标签亲和力映射
 *
 * 早八续命 / 十分钟速决 等标签天然与特定时段强关联，
 * 利用这层映射可以让算法"懂"学生的作息节奏。
 */
const timeVibeBoosts: Record<TimeSlot, string[]> = {
  breakfast: ["早八续命", "减脂健康", "十分钟速决"],
  lunch: ["下课直奔", "十分钟速决", "穷鬼套餐", "高碳水", "碳水快乐"],
  afternoon: ["下午茶摸鱼", "减脂健康"],
  dinner: ["周末改善生活", "社团大聚餐", "正式约会", "肉食狂热", "期末回血"],
  latenight: ["寝室宵夜", "期末回血", "碳水快乐"],
};

const timeCuisineBoosts: Record<TimeSlot, string[]> = {
  breakfast: ["饮品"],
  lunch: ["中式快餐", "炸物小吃"],
  afternoon: ["饮品", "炸物小吃"],
  dinner: ["火锅", "中式快餐"],
  latenight: ["炸物小吃"],
};

/**
 * 推荐评分核心函数
 *
 * 维度          满分    逻辑
 * ─────────────────────────────────────
 * 场景标签匹配   45     每命中一个当前时段标签 +15
 * 菜系时段匹配   25     当前时段偏好菜系命中 +25
 * 等待时间       20     越短越好 max(0, 20 - minutes/2.5)
 * 学生友好价格   21     (4 - price_tier) × 7
 * 随机扰动       15     保证每次刷新结果有差异
 * ─────────────────────────────────────
 * 理论峰值 ~126，实际分布集中在 30-90
 */
function scoreRestaurant(restaurant: Restaurant): number {
  const slot = getTimeSlot();
  let score = 0;

  const vibeHits = restaurant.vibe_tags.filter((t) =>
    timeVibeBoosts[slot].includes(t)
  ).length;
  score += vibeHits * 15;

  if (timeCuisineBoosts[slot].includes(restaurant.cuisine_category)) {
    score += 25;
  }

  score += Math.max(0, 20 - restaurant.wait_time_minutes / 2.5);

  score += (4 - restaurant.price_tier) * 7;

  score += Math.random() * 15;

  return score;
}

export function getRecommendations(
  restaurants: Restaurant[],
  count: number = 5
): Restaurant[] {
  return [...restaurants]
    .map((r) => ({ restaurant: r, score: scoreRestaurant(r) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.restaurant);
}

export function getTopPick(restaurants: Restaurant[]): Restaurant {
  return getRecommendations(restaurants, 1)[0];
}

export function getTimeGreeting(): { greeting: string; subtitle: string } {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 10)
    return { greeting: "早安 ☀️", subtitle: "元气满满的一天从早餐开始" };
  if (hour >= 10 && hour < 14)
    return {
      greeting: "午餐时间 🍱",
      subtitle: "忙碌了一上午，吃点好的犒劳自己",
    };
  if (hour >= 14 && hour < 17)
    return { greeting: "下午茶 🍵", subtitle: "来杯奶茶续续命吧" };
  if (hour >= 17 && hour < 21)
    return { greeting: "晚餐来咯 🌙", subtitle: "今晚想吃什么好呢？" };
  return { greeting: "夜宵时间 🌃", subtitle: "夜猫子的快乐你不懂" };
}
