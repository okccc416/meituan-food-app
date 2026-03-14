"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Gift, X } from "lucide-react";
import { CategoryItem } from "@/data/categories";
import { useSpinWheel } from "@/hooks/useSpinWheel";

const WHEEL_SIZE = 260;
const CENTER = WHEEL_SIZE / 2;
const RADIUS = WHEEL_SIZE / 2 - 8;

const SEGMENT_COLORS = [
  "#FF6B35", "#118AB2", "#EF476F", "#06D6A0",
  "#9B5DE5", "#FFD166", "#F15BB5", "#00BBF9",
  "#FF8F65", "#7B68EE", "#FEE440", "#FFB5A7",
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx: number, cy: number, r: number, a1: number, a2: number) {
  const s = polar(cx, cy, r, a1);
  const e = polar(cx, cy, r, a2);
  const lg = a2 - a1 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${lg} 1 ${e.x} ${e.y} Z`;
}

function GiftCardModal({
  category,
  onClose,
  onSend,
}: {
  category: CategoryItem;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-5 pointer-events-none">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotateY: -30 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.6, opacity: 0, rotateY: 30 }}
          transition={{ type: "spring", damping: 20, stiffness: 250 }}
          className="pointer-events-auto w-full max-w-xs"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md"
          >
            <X size={14} className="text-gray-500" />
          </button>

          {/* Gift card */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Card body */}
            <div className="bg-gradient-to-br from-orange-400 via-rose-500 to-violet-600 p-6 pb-4">
              {/* Decorative circles */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
              <div className="absolute bottom-8 left-4 w-12 h-12 bg-white/10 rounded-full" />

              <div className="relative">
                <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">
                  Campus Food Map
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <span className="text-3xl">{category.emoji}</span>
                  </div>
                  <div>
                    <p className="text-white text-lg font-black leading-tight">
                      {category.name}
                    </p>
                    <p className="text-white/70 text-[11px] font-medium">
                      美食礼品卡
                    </p>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-white/20">
                  <p className="text-white/90 text-[11px] leading-relaxed font-medium">
                    通过微信送出这份惊喜！新朋友领取后，你们将各自获得
                    <span className="text-yellow-200 font-black"> 50 社交积分</span>。
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <Gift size={11} className="text-white" />
                    </div>
                    <span className="text-[10px] text-white/50 font-medium">
                      双向激励 · 社交裂变
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-white/40 rounded-full" />
                    ))}
                    <span className="text-[9px] text-white/40 ml-1 font-mono">
                      2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card footer */}
            <div className="bg-white px-6 py-5">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={onSend}
                className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 text-white font-black py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-200/50"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
                <span className="relative">🚀 立即生成微信卡片</span>
              </motion.button>
              <p className="text-[10px] text-gray-400 text-center mt-2.5">
                好友通过微信领取后 · 双方各得 50 积分
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

interface SpinWheelProps {
  categories: CategoryItem[];
  onCategorySelected: (category: string | null) => void;
}

export function SpinWheel({ categories, onCategorySelected }: SpinWheelProps) {
  const { rotation, isSpinning, result, spin, reset, segmentAngle } =
    useSpinWheel(categories);
  const [showGiftCard, setShowGiftCard] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToastMsg = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleSpin = async () => {
    reset();
    onCategorySelected(null);
    const selected = await spin();
    if (selected) onCategorySelected(selected.name);
  };

  if (categories.length === 0) return null;

  return (
    <section className="px-5 py-3">
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

      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-orange-500" size={20} />
          <h2 className="text-lg font-bold text-gray-900">
            转一转，吃什么？
          </h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative z-10 -mb-2">
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-orange-500 drop-shadow-sm" />
          </div>

          <div className="relative">
            <motion.div style={{ rotate: rotation }}>
              <svg
                width={WHEEL_SIZE}
                height={WHEEL_SIZE}
                viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
              >
                {categories.map((cat, i) => {
                  const a1 = i * segmentAngle;
                  const a2 = (i + 1) * segmentAngle;
                  const mid = a1 + segmentAngle / 2;
                  const lbl = polar(CENTER, CENTER, RADIUS * 0.6, mid);
                  return (
                    <g key={cat.id}>
                      <path
                        d={arc(CENTER, CENTER, RADIUS, a1, a2)}
                        fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={lbl.x}
                        y={lbl.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={categories.length <= 6 ? "24" : "18"}
                        className="select-none pointer-events-none"
                      >
                        {cat.emoji}
                      </text>
                    </g>
                  );
                })}
                <circle cx={CENTER} cy={CENTER} r="36" fill="white" />
              </svg>
            </motion.div>

            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[68px] rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-300/50 z-10 active:scale-95 transition-transform disabled:opacity-60"
            >
              {isSpinning ? "..." : "GO!"}
            </button>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                className="mt-4 w-full"
              >
                <div className="bg-orange-50 rounded-2xl px-5 py-3 text-center mb-2.5">
                  <p className="text-orange-600 font-bold">
                    就决定是你了 —— {result.emoji} {result.name}！
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setShowGiftCard(true)}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 text-white font-bold py-3 rounded-2xl text-sm shadow-lg shadow-pink-200/40"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <Gift size={16} />
                    赠送好友 (双方各得50积分)
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Gift card preview modal */}
      <AnimatePresence>
        {showGiftCard && result && (
          <GiftCardModal
            category={result}
            onClose={() => setShowGiftCard(false)}
            onSend={() => {
              setShowGiftCard(false);
              showToastMsg("🎉 微信礼品卡已生成！分享给好友后双方各得 50 社交积分");
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
