export function formatPrice(tier: number): string {
  return "\u00a5".repeat(tier);
}

export function formatCost(rmb: number): string {
  return `\u00a5${rmb}/人`;
}

export function formatWaitTime(minutes: number): string {
  if (minutes < 60) return `约${minutes}分钟`;
  return `约${Math.round(minutes / 60)}小时`;
}
