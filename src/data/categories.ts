export interface CategoryItem {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
}

const cuisineConfig: Record<string, { emoji: string; gradient: string }> = {
  中式快餐: { emoji: "🍚", gradient: "from-orange-400 to-red-500" },
  炸物小吃: { emoji: "🍗", gradient: "from-amber-400 to-orange-500" },
  火锅: { emoji: "🍲", gradient: "from-red-400 to-rose-600" },
  饮品: { emoji: "🧋", gradient: "from-purple-400 to-pink-500" },
  日式料理: { emoji: "🍣", gradient: "from-rose-400 to-pink-500" },
  韩式料理: { emoji: "🍱", gradient: "from-red-300 to-rose-500" },
  西餐: { emoji: "🍝", gradient: "from-indigo-400 to-blue-500" },
  烧烤: { emoji: "🍖", gradient: "from-amber-400 to-orange-600" },
  面食: { emoji: "🍜", gradient: "from-yellow-400 to-amber-500" },
  甜品: { emoji: "🍰", gradient: "from-pink-400 to-rose-400" },
  奶茶: { emoji: "🧋", gradient: "from-green-300 to-emerald-500" },
  轻食沙拉: { emoji: "🥗", gradient: "from-emerald-400 to-green-500" },
};

const fallback = { emoji: "🍽️", gradient: "from-gray-400 to-gray-500" };

export function getCuisineEmoji(name: string): string {
  return (cuisineConfig[name] ?? fallback).emoji;
}

export function getCuisineGradient(name: string): string {
  return (cuisineConfig[name] ?? fallback).gradient;
}

export function buildCategories(cuisineNames: string[]): CategoryItem[] {
  const unique = [...new Set(cuisineNames)];
  return unique.map((name) => ({
    id: name,
    name,
    emoji: getCuisineEmoji(name),
    gradient: getCuisineGradient(name),
  }));
}
