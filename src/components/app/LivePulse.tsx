"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, HandCoins } from "lucide-react";

const MESSAGES = [
  { text: "👀 樱花广场「翔仔好味馆」当前 5 人排队，点击求【顺路代拿】", action: "proxy" },
  { text: "🎓 某位 I人 刚刚用【社恐专区】抽中了宿舍楼下的烤冷面" },
  { text: "💸 刚刚：有人送出了一份「翔仔好味馆」的期末满分套餐" },
  { text: "🔥 「左庭右院」火锅已被 3 个社团同时预定，一座难求" },
  { text: "🧋 文汇路「鲜茶道」第二杯半价中，已有 12 人拼单成功" },
  { text: "🎉 恭喜某同学在命运转盘抽中「板前寿司」，省了 95 元" },
  { text: "🏃 「老张拉面」深夜档刚开张，已有 8 位夜猫子冲了" },
  { text: "🌴 深圳「猪脚饭大王」今日限时 ¥12 特惠，已售 200+ 份" },
  { text: "🦆 西丽「烧鹅王」刚出炉第 3 批，剩余 23 只 手慢无" },
  { text: "☕ 南科大「咖啡实验室」新豆到货：埃塞俄比亚耶加雪菲" },
  { text: "🍢 深圳大学城「川渝串串」6人团购立减 ¥30，拼团中..." },
  { text: "💪 健身房旁「轻享沙拉」鸡胸肉今日加量不加价" },
  { text: "👀 某同学刚用转盘抽中了「九宫格串串香」，4人组局成功！" },
  { text: "🔥 「鸡公煲·黄焖鸡」15元试吃套餐被抢爆，今日已售 50 份" },
  { text: "🎲 同学A右滑了「Campus Pizza」，It's a Match！3人已加入组局" },
  { text: "📦 启源广场外卖柜已满，「Facepork」建议到店自提更快" },
  { text: "🏅 恭喜「美食探索者」解锁成就「深夜食神」，22点后第5次点餐" },
  { text: "🧀 「Campus Pizza」超级芝士披萨限时买一送一，仅剩 8 份" },
];

function ProxyPickupModal({ onClose, onAction }: { onClose: () => void; onAction: (msg: string) => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-[80] max-w-md mx-auto"
      >
        <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X size={14} className="text-gray-500" />
          </button>

          <div className="px-6 pt-2 pb-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center">
                <span className="text-lg">🤝</span>
              </div>
              <div>
                <h3 className="text-base font-black text-gray-900">校园互助：顺路代拿</h3>
                <p className="text-[10px] text-gray-400">本校同学互帮互助，安全可靠</p>
              </div>
            </div>

            {/* Current queue info */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">🏪</span>
                <p className="text-sm font-bold text-gray-800">鲜芋仙 · 樱花广场店</p>
              </div>
              <p className="text-xs text-amber-700">
                当前有 <span className="font-black text-orange-600">3 位</span>本校同学正在排队，预计等待 <span className="font-bold">8 分钟</span>
              </p>
              <div className="flex items-center gap-2 mt-2.5">
                <div className="flex -space-x-1.5">
                  {["bg-rose-400", "bg-sky-400", "bg-emerald-400"].map((c, i) => (
                    <div key={i} className={`w-6 h-6 ${c} rounded-full border-2 border-white flex items-center justify-center`}>
                      <span className="text-[8px] font-bold text-white">{["张", "李", "王"][i]}</span>
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">3人等待中</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onAction("🚀 演示环境：接单成功！预计 8 分钟后为同学取餐，赚取 ¥2 + 10积分")}
                className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black py-4 rounded-2xl text-sm shadow-lg shadow-emerald-200/50"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  <Rocket size={16} />
                  顺路接单 (预计赚 ¥2 + 10积分)
                </span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onAction("📦 演示环境：代拿请求已发布！悬赏 ¥2，等待附近同学接单")}
                className="w-full flex items-center justify-center gap-2 bg-white border-2 border-amber-300 text-amber-700 font-bold py-3.5 rounded-2xl text-sm hover:bg-amber-50 transition-colors"
              >
                <HandCoins size={16} />
                我也要求带 (悬赏 ¥2)
              </motion.button>
            </div>

            <p className="text-[9px] text-gray-300 text-center mt-4">
              校园互助 · 仅限本校认证用户 · 安全有保障
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function LivePulse() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleMessageClick = (msg: typeof MESSAGES[0]) => {
    if (msg.action === "proxy") {
      setShowModal(true);
    }
  };

  const allMessages = [...MESSAGES, ...MESSAGES];

  return (
    <>
      <div className="relative overflow-hidden bg-white/60 backdrop-blur-md border-b border-gray-100/60">
        <div className="flex animate-marquee whitespace-nowrap py-2">
          {allMessages.map((msg, i) => (
            <span
              key={i}
              onClick={() => handleMessageClick(msg)}
              className={`mx-8 text-[11px] font-medium ${
                msg.action === "proxy"
                  ? "text-indigo-600 cursor-pointer hover:text-indigo-800 underline decoration-dotted decoration-indigo-300 underline-offset-2"
                  : "text-gray-500"
              }`}
            >
              {msg.text}
            </span>
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: -60, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.9 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-white rounded-2xl px-5 py-3 shadow-2xl border border-gray-100 max-w-xs text-center"
          >
            <p className="text-sm font-medium text-gray-800">{toast}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proxy Pickup Modal */}
      <AnimatePresence>
        {showModal && (
          <ProxyPickupModal
            onClose={() => setShowModal(false)}
            onAction={(msg) => {
              setShowModal(false);
              showToast(msg);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
