"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Shuffle, Wallet, MapPin, Clock, ShieldCheck,
  RotateCcw, Gift, Moon, Sun, X,
  Navigation, ShoppingBag, ThumbsUp, ThumbsDown,
} from "lucide-react";
import { mockRestaurants, MockRestaurant, CityKey } from "@/data/mockData";

type Phase = "idle" | "spinning" | "revealed" | "expanded";
type GiftStep = "closed" | "preview";

function MetricBadge({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
      <div className="flex items-center justify-center gap-1 text-gray-400 mb-0.5">{icon}<span className="text-[9px]">{label}</span></div>
      <p className="text-xs font-bold text-gray-900">{value}</p>
    </div>
  );
}

export function DecisionView({ city }: { city: CityKey }) {
  const [budget, setBudget] = useState(60);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<MockRestaurant | null>(null);
  const [shuffleIdx, setShuffleIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [giftStep, setGiftStep] = useState<GiftStep>("closed");
  const spinLock = useRef(false);

  // Night mode: 22:00 - 04:00
  const [isNight, setIsNight] = useState(() => {
    const h = new Date().getHours();
    return h >= 22 || h < 4;
  });

  const candidates = useMemo(
    () => mockRestaurants.filter((r) => r.city === city && r.avgPrice <= budget * 1.2),
    [budget, city],
  );

  // Shuffle animation during spin
  useEffect(() => {
    if (phase !== "spinning" || candidates.length === 0) return;
    const id = setInterval(() => setShuffleIdx((p) => p + 1), 120);
    return () => clearInterval(id);
  }, [phase, candidates.length]);

  const spin = useCallback(async () => {
    if (spinLock.current || candidates.length === 0) return;
    spinLock.current = true;
    setPhase("spinning");
    setResult(null);

    await new Promise((r) => setTimeout(r, 2600));

    let pick: MockRestaurant;
    if (isNight) {
      const weights = candidates.map((r) =>
        r.scenes.includes("latenight") || r.tags.some((t) => t.includes("高碳水") || t.includes("寝室宵夜")) ? 4 : 1,
      );
      const total = weights.reduce((a, b) => a + b, 0);
      let rand = Math.random() * total;
      let idx = 0;
      for (let i = 0; i < weights.length; i++) {
        rand -= weights[i];
        if (rand <= 0) { idx = i; break; }
      }
      pick = candidates[idx];
    } else {
      pick = candidates[Math.floor(Math.random() * candidates.length)];
    }

    setResult(pick);
    setPhase("revealed");
    await new Promise((r) => setTimeout(r, 500));
    setPhase("expanded");
    spinLock.current = false;
  }, [candidates, isNight]);

  const close = () => { setPhase("idle"); setResult(null); };

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const current = candidates.length > 0 ? candidates[shuffleIdx % candidates.length] : null;

  return (
    <div className={`relative p-4 md:p-6 flex flex-col items-center transition-colors duration-700 min-h-[calc(100vh-80px)] ${isNight ? "bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-950" : ""}`}>

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

      {/* Night mode banner */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full max-w-sm mb-4 bg-indigo-900/60 backdrop-blur-sm border border-indigo-700/30 rounded-2xl px-4 py-2.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Moon size={14} className="text-indigo-300" />
              <span className="text-xs font-medium text-indigo-200">🌙 深夜破防模式已开启</span>
            </div>
            <button onClick={() => setIsNight(false)} className="text-[10px] text-indigo-400 hover:text-indigo-200 transition-colors">
              关闭
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center mb-5 max-w-sm w-full">
        <div className="flex items-center justify-center gap-2">
          <h2 className={`text-lg font-extrabold ${isNight ? "text-white" : "text-gray-900"}`}>
            {isNight ? "🌙 深夜吃什么" : "🎰 今天吃什么"}
          </h2>
          <button
            onClick={() => setIsNight((p) => !p)}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isNight ? "bg-indigo-800 text-yellow-300" : "bg-gray-100 text-gray-400"}`}
          >
            {isNight ? <Sun size={13} /> : <Moon size={13} />}
          </button>
        </div>
        <p className={`text-xs mt-1 ${isNight ? "text-indigo-300" : "text-gray-400"}`}>
          {isNight ? "高碳水 · 寝室宵夜 · 命中率UP" : "预算内随机抽选 · 命运轮盘"}
        </p>
      </div>

      {/* Budget slider */}
      <div className={`w-full max-w-sm rounded-2xl p-4 mb-5 ${isNight ? "bg-white/5 border border-white/10" : "bg-white shadow-sm border border-gray-100"}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-medium flex items-center gap-1 ${isNight ? "text-indigo-300" : "text-gray-500"}`}>
            <Wallet size={13} /> 预算上限
          </span>
          <span className="text-sm font-extrabold text-orange-500">¥{budget}</span>
        </div>
        <input
          type="range" min={10} max={200} step={5} value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-orange-500 h-1.5"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>¥10</span>
          <span className={`font-medium ${isNight ? "text-indigo-300" : "text-orange-400"}`}>{candidates.length} 家可选</span>
          <span>¥200</span>
        </div>
      </div>

      {/* Main Stage */}
      <LayoutGroup>
        <div className="min-h-[280px] flex items-center justify-center w-full max-w-sm">
          <AnimatePresence mode="wait">
            {/* IDLE */}
            {phase === "idle" && (
              <motion.button
                key="go"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={spin}
                disabled={candidates.length === 0}
                className={`w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 shadow-xl transition-shadow ${
                  isNight
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500/30 hover:shadow-indigo-500/50"
                    : "bg-gradient-to-br from-orange-400 to-rose-500 shadow-orange-400/30 hover:shadow-orange-400/50"
                } text-white disabled:opacity-40`}
              >
                <Shuffle size={28} strokeWidth={2.5} />
                <span className="text-sm font-bold">
                  {candidates.length === 0 ? "调高预算" : "开始抽选"}
                </span>
              </motion.button>
            )}

            {/* SPINNING */}
            {phase === "spinning" && current && (
              <motion.div
                key="shuffle"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.12 }}
                className={`w-full rounded-2xl overflow-hidden shadow-lg ${isNight ? "bg-gray-800" : "bg-white"}`}
              >
                <div className="relative h-32 overflow-hidden">
                  <Image src={current.image} alt={current.name} fill className="object-cover" sizes="400px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                </div>
                <div className="p-3">
                  <h3 className={`font-bold text-sm ${isNight ? "text-white" : "text-gray-900"}`}>{current.name}</h3>
                  <p className={`text-xs mt-0.5 ${isNight ? "text-gray-400" : "text-gray-400"}`}>{current.zone} · ¥{current.avgPrice}/人</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* REVEALED: layoutId bridge card */}
          {phase === "revealed" && result && (
            <motion.div layoutId="hero-card" className={`w-full rounded-2xl shadow-lg overflow-hidden ${isNight ? "bg-gray-800" : "bg-white"}`}>
              <motion.div layoutId="hero-img" className="relative h-32 overflow-hidden">
                <Image src={result.image} alt={result.name} fill className="object-cover" sizes="400px" />
                <div className="absolute bottom-2 left-3">
                  <motion.span layoutId="hero-cuisine" className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">{result.cuisine}</motion.span>
                </div>
              </motion.div>
              <div className="p-3">
                <motion.h3 layoutId="hero-name" className={`font-bold ${isNight ? "text-white" : "text-gray-900"}`}>{result.name}</motion.h3>
                <p className={`text-xs mt-0.5 ${isNight ? "text-gray-400" : "text-gray-400"}`}>{result.zone} · ¥{result.avgPrice}/人</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* EXPANDED: Result Modal */}
        <AnimatePresence>
          {phase === "expanded" && result && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                onClick={close}
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none">
                <motion.div
                  layoutId="hero-card"
                  className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden pointer-events-auto"
                >
                  {/* Hero image */}
                  <motion.div layoutId="hero-img" className="relative h-48 overflow-hidden">
                    <Image src={result.image} alt={result.name} fill className="object-cover" sizes="400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <button
                      onClick={close}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <motion.span layoutId="hero-cuisine" className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-medium">{result.cuisine}</motion.span>
                      {isNight && result.scenes.includes("latenight") && (
                        <span className="text-[10px] bg-indigo-500 text-white px-2 py-0.5 rounded-full font-medium">🌙 深夜可食</span>
                      )}
                    </div>
                  </motion.div>

                  <div className="p-5">
                    {/* Title + Hygiene Badge */}
                    <div className="flex items-center gap-2 mb-1">
                      <motion.h3 layoutId="hero-name" className="text-xl font-bold text-gray-900">{result.name}</motion.h3>
                      {result.hygiene_rating === "A" && (
                        <span className="flex items-center gap-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                          <ShieldCheck size={11} /> 明厨亮灶 A级
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{result.zone}</p>

                    {/* Trial meal highlight */}
                    {result.has_trial_meal && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="mt-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl px-3 py-2 flex items-center gap-2"
                      >
                        <span className="text-sm">🔥</span>
                        <div>
                          <p className="text-xs font-bold text-orange-700">15元防踩雷特供</p>
                          <p className="text-[10px] text-orange-500/80">单人试吃套餐 · 不踩雷再下单</p>
                        </div>
                      </motion.div>
                    )}

                    {/* Metrics */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex gap-2 mt-4 mb-4">
                        <MetricBadge icon={<Wallet size={11} />} label="人均" value={`¥${result.avgPrice}`} />
                        <MetricBadge icon={<Clock size={11} />} label="步行" value={`${result.walkMinutes}min`} />
                        <MetricBadge icon={<MapPin size={11} />} label="区域" value={result.zone.slice(0, 4)} />
                      </div>

                      {/* Emoji + MBTI tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {result.emoji_tags.map((tag) => (
                          <span key={tag} className="text-[10px] bg-amber-50 border border-amber-100/80 text-amber-700 px-2 py-0.5 rounded-lg">{tag}</span>
                        ))}
                        {result.mbti_tags.map((tag) => (
                          <span key={tag} className="text-[10px] bg-violet-50 border border-violet-100/80 text-violet-600 px-2 py-0.5 rounded-lg">{tag}</span>
                        ))}
                      </div>

                      {/* Signature Dishes - 必点推荐 */}
                      {result.signature_dishes.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="mb-4"
                        >
                          <p className="text-xs font-bold text-gray-700 mb-2">🍽️ 必点推荐</p>
                          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {result.signature_dishes.map((dish) => (
                              <div key={dish.name} className="flex-shrink-0 bg-gray-50 rounded-xl px-3 py-2 text-center min-w-[80px] relative">
                                {dish.popular && (
                                  <span className="absolute -top-1 -right-1 text-[7px] bg-red-500 text-white px-1 py-px rounded-full font-bold">HOT</span>
                                )}
                                <span className="text-lg">{dish.emoji}</span>
                                <p className="text-[10px] font-semibold text-gray-700 mt-1 leading-tight">{dish.name}</p>
                                <p className="text-[10px] font-bold text-orange-500">¥{dish.price}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Last 100m status */}
                      {result.last_100m_status && (
                        <div className="bg-sky-50 border border-sky-100 rounded-xl px-3 py-2 flex items-center gap-2 mb-4">
                          <span className="text-xs">📦</span>
                          <p className="text-[10px] font-semibold text-sky-700">{result.last_100m_status}</p>
                        </div>
                      )}

                      {/* Primary action buttons (original) */}
                      <div className="flex gap-2.5 mb-3">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={close}
                          className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-orange-200"
                        >
                          就去这！🎉
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setGiftStep("preview")}
                          className="flex items-center justify-center gap-1 relative overflow-hidden bg-gradient-to-r from-rose-500 to-violet-500 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-md shadow-pink-200/30"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                          />
                          <span className="relative flex items-center gap-1"><Gift size={14} /> 赠好友</span>
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { close(); setTimeout(spin, 200); }}
                          className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors flex-shrink-0"
                        >
                          <RotateCcw size={16} />
                        </motion.button>
                      </div>

                      {/* Secondary action buttons (new) */}
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => showToast("🛵 正在跳转美团外卖... (演示环境)")}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-amber-50 text-amber-700 font-semibold text-[11px] py-2.5 rounded-xl border border-amber-200 hover:bg-amber-100 transition-colors"
                        >
                          <ShoppingBag size={13} /> 美团外卖
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => showToast("📍 正在打开地图导航... (演示环境)")}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 font-semibold text-[11px] py-2.5 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          <Navigation size={13} /> 导航去店里
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => showToast("✅ 已记录！你今天吃了「" + result.name + "」，快去评价吧")}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 font-semibold text-[11px] py-2.5 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors"
                        >
                          <ThumbsUp size={13} /> 吃了这个
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>

      {/* Gift Card Modal */}
      <AnimatePresence>
        {giftStep === "preview" && result && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
              onClick={() => setGiftStep("closed")}
            />
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-5 pointer-events-none">
              <motion.div
                initial={{ scale: 0.6, opacity: 0, rotateY: -30 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.6, opacity: 0, rotateY: 30 }}
                transition={{ type: "spring", damping: 20, stiffness: 250 }}
                className="pointer-events-auto w-full max-w-xs relative"
              >
                <button
                  onClick={() => setGiftStep("closed")}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md"
                >
                  <X size={14} className="text-gray-500" />
                </button>
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <div className="bg-gradient-to-br from-orange-400 via-rose-500 to-violet-600 p-6 pb-4 relative">
                    <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
                    <div className="absolute bottom-8 left-4 w-12 h-12 bg-white/10 rounded-full" />
                    <div className="relative">
                      <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-1">Campus Food Map</p>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 overflow-hidden relative">
                          <Image src={result.image} alt={result.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div>
                          <p className="text-white text-lg font-black leading-tight">{result.name}</p>
                          <p className="text-white/70 text-[11px] font-medium">美食礼品卡 · ¥{result.avgPrice}</p>
                        </div>
                      </div>
                      <div className="bg-white/15 backdrop-blur-sm rounded-xl px-3.5 py-2.5 border border-white/20">
                        <p className="text-white/90 text-[11px] leading-relaxed font-medium">
                          通过微信送出这份惊喜！新朋友领取后，你们将各自获得
                          <span className="text-yellow-200 font-black"> 50 社交积分</span>。
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-4">
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                          <Gift size={11} className="text-white" />
                        </div>
                        <span className="text-[10px] text-white/50 font-medium">双向激励 · 社交裂变</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white px-6 py-5">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setGiftStep("closed");
                        showToast("🎉 微信礼品卡已生成！分享给好友后双方各得 50 社交积分");
                      }}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 text-white font-black py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-200/50"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      />
                      <span className="relative">🚀 立即生成微信卡片</span>
                    </motion.button>
                    <p className="text-[10px] text-gray-400 text-center mt-2.5">好友通过微信领取后 · 双方各得 50 积分</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
