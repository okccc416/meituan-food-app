"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, HandHelping, Clock, ChevronDown, ChevronUp } from "lucide-react";

interface PickupRequest {
  id: string;
  user: string;
  avatar: string;
  items: string;
  timeAgo: string;
  tip: number;
}

const AVATAR_COLORS = [
  "bg-rose-400", "bg-sky-400", "bg-amber-400",
  "bg-emerald-400", "bg-violet-400", "bg-pink-400",
  "bg-teal-400", "bg-orange-400",
];

const MOCK_NAMES = [
  "学妹小A", "卷王同学", "干饭达人", "夜猫子Z",
  "考研党R", "社恐I人", "健身搭子", "摸鱼大师",
  "奶茶星人", "碳水战士", "宿舍长老", "图书馆幽灵",
];

const MOCK_ITEMS = [
  "招牌套餐 ×1", "奶茶大杯 ×2", "拌面+小菜",
  "炸鸡翅 ×3", "盖饭+饮料", "小份麻辣烫",
  "烧鹅饭 ×1", "拿铁+蛋糕", "串串50签",
  "黄焖鸡 ×1", "沙拉+果汁", "猪排饭套餐",
];

const TIME_AGOS = ["1分钟前", "3分钟前", "5分钟前", "8分钟前", "12分钟前", "15分钟前"];

function generateMockRequests(restaurantId: string, count: number): PickupRequest[] {
  let seed = 0;
  for (let i = 0; i < restaurantId.length; i++) seed += restaurantId.charCodeAt(i);

  return Array.from({ length: count }, (_, i) => {
    const idx = (seed + i * 7) % MOCK_NAMES.length;
    return {
      id: `${restaurantId}-req-${i}`,
      user: MOCK_NAMES[idx],
      avatar: MOCK_NAMES[idx].charAt(0),
      items: MOCK_ITEMS[(seed + i * 3) % MOCK_ITEMS.length],
      timeAgo: TIME_AGOS[i % TIME_AGOS.length],
      tip: [1, 2, 2, 3, 3, 5][(seed + i) % 6],
    };
  });
}

interface ProxyPickupProps {
  restaurantId: string;
  restaurantName: string;
  walkMinutes: number;
  currentViewers?: number;
  compact?: boolean;
}

export function ProxyPickup({
  restaurantId,
  restaurantName,
  walkMinutes,
  currentViewers = 0,
  compact = false,
}: ProxyPickupProps) {
  const [expanded, setExpanded] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const requestCount = useMemo(() => {
    let seed = 0;
    for (let i = 0; i < restaurantId.length; i++) seed += restaurantId.charCodeAt(i);
    return Math.max(1, (seed % 4) + (currentViewers > 10 ? 2 : 1));
  }, [restaurantId, currentViewers]);

  const requests = useMemo(
    () => generateMockRequests(restaurantId, requestCount),
    [restaurantId, requestCount],
  );

  const offerCount = useMemo(() => {
    let seed = 0;
    for (let i = 0; i < restaurantId.length; i++) seed += restaurantId.charCodeAt(i);
    return (seed % 3) + 1;
  }, [restaurantId]);

  const handleAction = (action: string) => {
    setShowToast(action);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.9 }}
            className="absolute -top-12 left-0 right-0 z-10 bg-emerald-500 text-white text-xs font-medium px-4 py-2 rounded-xl text-center shadow-lg"
          >
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-r from-indigo-50 via-violet-50 to-purple-50 border border-indigo-100/80 rounded-2xl overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full px-3.5 py-2.5 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="text-base">🤝</span>
            <div className="text-left">
              <p className="text-xs font-bold text-indigo-700">
                顺路代拿 · {requestCount} 人求带
              </p>
              <p className="text-[10px] text-indigo-400">
                {offerCount} 位同学愿意顺路帮带 · 步行{walkMinutes}min
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-1.5">
              {requests.slice(0, 3).map((req, i) => (
                <div
                  key={req.id}
                  className={`w-5 h-5 ${AVATAR_COLORS[i % AVATAR_COLORS.length]} rounded-full flex items-center justify-center border-2 border-white`}
                >
                  <span className="text-[7px] font-bold text-white">{req.avatar}</span>
                </div>
              ))}
              {requestCount > 3 && (
                <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center border-2 border-white">
                  <span className="text-[7px] font-bold text-gray-500">+{requestCount - 3}</span>
                </div>
              )}
            </div>
            {expanded ? (
              <ChevronUp size={14} className="text-indigo-400" />
            ) : (
              <ChevronDown size={14} className="text-indigo-400" />
            )}
          </div>
        </button>

        {/* Expandable detail */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-3.5 pb-3">
                <div className="space-y-2 mb-3">
                  {requests.map((req, i) => (
                    <div
                      key={req.id}
                      className="flex items-center gap-2 bg-white/70 rounded-xl px-2.5 py-2"
                    >
                      <div
                        className={`w-7 h-7 ${AVATAR_COLORS[i % AVATAR_COLORS.length]} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <span className="text-[9px] font-bold text-white">{req.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-gray-700">{req.user}</span>
                          <div className="flex items-center gap-1 text-[9px] text-gray-400">
                            <Clock size={9} />
                            <span>{req.timeAgo}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[10px] text-gray-500">{req.items}</span>
                          <span className="text-[10px] font-bold text-emerald-600">
                            +¥{req.tip} 感谢费
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAction(`📦 已发布代拿请求！等待「${restaurantName}」附近的同学接单...`)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold py-2.5 rounded-xl text-[11px] shadow-md shadow-indigo-200/40"
                  >
                    <Package size={13} />
                    帮我带一份
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAction(`🙌 已标记顺路！去「${restaurantName}」的同学可以看到你愿意帮带`)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-white border-2 border-indigo-200 text-indigo-600 font-bold py-2.5 rounded-xl text-[11px] hover:bg-indigo-50 transition-colors"
                  >
                    <HandHelping size={13} />
                    我顺路能带
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed quick action */}
        {!expanded && !compact && (
          <div className="px-3.5 pb-2.5 flex gap-2">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAction(`📦 已发布代拿请求！等待「${restaurantName}」附近的同学接单...`)}
              className="flex-1 flex items-center justify-center gap-1 bg-indigo-500/90 text-white font-bold py-2 rounded-xl text-[10px]"
            >
              <Package size={11} />
              帮我带
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => handleAction(`🙌 已标记顺路！去「${restaurantName}」的同学可以看到你愿意帮带`)}
              className="flex-1 flex items-center justify-center gap-1 bg-white/80 text-indigo-600 font-bold py-2 rounded-xl text-[10px] border border-indigo-200"
            >
              <HandHelping size={11} />
              我能带
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
