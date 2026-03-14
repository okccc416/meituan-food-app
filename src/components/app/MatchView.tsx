"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Heart, X, Users, Sparkles, MapPin, Clock, Wallet, MessageCircle, Rocket, Copy } from "lucide-react";
import { mockRestaurants, MockRestaurant, CityKey } from "@/data/mockData";

type Step = "lobby" | "swiping" | "result";
type ResultType = "match" | "fallback";

function ConfettiPiece({ delay }: { delay: number }) {
  const colors = ["#f97316", "#ec4899", "#8b5cf6", "#06b6d4", "#22c55e", "#eab308"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const cx = Math.random() * 300 - 150;
  const rotation = Math.random() * 720 - 360;
  return (
    <motion.div
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ y: -200 + Math.random() * -100, x: cx, opacity: 0, rotate: rotation, scale: 0.5 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className="absolute bottom-1/2 left-1/2 w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}

interface SwipeCardProps {
  restaurant: MockRestaurant;
  onSwipe: (dir: "left" | "right") => void;
  isTop: boolean;
}

function SwipeCard({ restaurant, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  return (
    <motion.div
      style={{ x, rotate, zIndex: isTop ? 10 : 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) onSwipe("right");
        else if (info.offset.x < -120) onSwipe("left");
      }}
      initial={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      animate={{ scale: isTop ? 1 : 0.95, opacity: isTop ? 1 : 0.7 }}
      exit={{ x: 500, opacity: 0, rotate: 30, transition: { duration: 0.3 } }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="w-full h-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="relative h-[55%]">
          <Image src={restaurant.image} alt={restaurant.name} fill className="object-cover" sizes="400px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <motion.div style={{ opacity: likeOpacity }} className="absolute inset-0 flex items-center justify-center">
            <div className="border-4 border-green-400 rounded-2xl px-6 py-2 -rotate-12">
              <span className="text-4xl font-black text-green-400">LIKE</span>
            </div>
          </motion.div>
          <motion.div style={{ opacity: nopeOpacity }} className="absolute inset-0 flex items-center justify-center">
            <div className="border-4 border-red-400 rounded-2xl px-6 py-2 rotate-12">
              <span className="text-4xl font-black text-red-400">NOPE</span>
            </div>
          </motion.div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white mb-1">{restaurant.name}</h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="flex items-center gap-1"><MapPin size={13} /> {restaurant.zone}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {restaurant.walkMinutes}min</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Wallet size={13} /> ¥{restaurant.avgPrice}</span>
            </div>
          </div>
        </div>
        <div className="p-4 h-[45%] overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2.5 py-1 rounded-full">{restaurant.cuisine}</span>
            <span className="text-xs text-gray-400">⭐ {restaurant.rating}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {restaurant.emoji_tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-amber-50 border border-amber-100 text-amber-700 px-2 py-0.5 rounded-lg">{tag}</span>
            ))}
            {restaurant.mbti_tags.map((tag) => (
              <span key={tag} className="text-[10px] bg-violet-50 border border-violet-100 text-violet-600 px-2 py-0.5 rounded-lg">{tag}</span>
            ))}
          </div>
          {restaurant.signature_dishes.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-1.5">🍽️ 招牌推荐</p>
              <div className="flex gap-2">
                {restaurant.signature_dishes.slice(0, 3).map((d) => (
                  <div key={d.name} className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1">
                    <span className="text-sm">{d.emoji}</span>
                    <span className="text-[10px] text-gray-700">{d.name}</span>
                    <span className="text-[10px] font-bold text-orange-500">¥{d.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const MEMBER_AVATARS = [
  { name: "你", color: "bg-rose-400", initial: "你" },
  { name: "室友A", color: "bg-sky-400", initial: "A" },
  { name: "室友B", color: "bg-amber-400", initial: "B" },
  { name: "小明", color: "bg-emerald-400", initial: "明" },
];

function SwipingHeader() {
  return (
    <div className="w-full max-w-sm mb-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {MEMBER_AVATARS.map((m, i) => (
              <div key={m.name} className="flex flex-col items-center gap-0.5">
                <div className="relative">
                  <div className={`w-10 h-10 ${m.color} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
                    <span className="text-[10px] font-bold text-white">{m.initial}</span>
                  </div>
                  {i < 2 && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4.5L3 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="absolute -inset-1 rounded-full border-2 border-orange-400 animate-pulse" />
                  )}
                </div>
                <span className="text-[8px] text-gray-400 font-medium">
                  {i < 2 ? "已选" : i === 2 ? "纠结中" : "你"}
                </span>
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400">小明正在纠结...</p>
            <p className="text-[9px] text-orange-500 font-medium">等待 2/4 人</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MatchView({ city }: { city: CityKey }) {
  const cityRestaurants = useMemo(
    () => mockRestaurants.filter((r) => r.city === city),
    [city],
  );
  const [step, setStep] = useState<Step>("lobby");
  const [resultType, setResultType] = useState<ResultType>("match");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [matched, setMatched] = useState<MockRestaurant | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [swipeCount, setSwipeCount] = useState(0);

  const MAX_SWIPES = 5;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }, []);

  const fallbackRestaurant = useMemo(
    () => cityRestaurants.find((r) => r.name.includes("左庭右院")) || cityRestaurants[2] || cityRestaurants[0],
    [cityRestaurants],
  );

  const handleSwipe = useCallback((dir: "left" | "right") => {
    const newCount = swipeCount + 1;
    setSwipeCount(newCount);

    if (dir === "right") {
      const current = cityRestaurants[currentIdx % cityRestaurants.length];
      setMatched(current);
      setResultType("match");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
      setStep("result");
    } else {
      if (newCount >= MAX_SWIPES) {
        setMatched(fallbackRestaurant);
        setResultType("fallback");
        setStep("result");
      } else {
        showToast("😅 下一家可能更合胃口！");
      }
    }
    setCurrentIdx((p) => p + 1);
  }, [currentIdx, cityRestaurants, showToast, swipeCount, fallbackRestaurant]);

  const resetToLobby = () => {
    setStep("lobby");
    setCurrentIdx(0);
    setMatched(null);
    setSwipeCount(0);
  };

  const remaining = MAX_SWIPES - swipeCount;

  return (
    <div className="relative p-4 md:p-6 flex flex-col items-center min-h-[calc(100vh-80px)]">
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

      {/* ========== PHASE 1: LOBBY ========== */}
      <AnimatePresence mode="wait">
        {step === "lobby" && (
          <motion.div
            key="lobby"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full max-w-sm"
          >
            {/* Header */}
            <div className="text-center mb-8 mt-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users size={22} className="text-rose-500" />
                <h2 className="text-xl font-extrabold text-gray-900">🔥 饭搭子组局</h2>
              </div>
              <p className="text-xs text-gray-400">发起宿舍聚餐，一起决定吃什么</p>
            </div>

            {/* Room card */}
            <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="bg-gradient-to-br from-rose-500 via-orange-500 to-amber-500 px-6 py-8 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full" />
                <p className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-2 relative">Room Number</p>
                <h3 className="text-4xl font-black text-white tracking-wider relative">#8972</h3>
                <p className="text-white/70 text-xs font-medium mt-2 relative">发起宿舍聚餐</p>
              </div>

              {/* Members */}
              <div className="px-6 py-5">
                <p className="text-[10px] text-gray-400 font-medium mb-3">成员 (4/4)</p>
                <div className="flex items-center justify-center gap-3 mb-5">
                  {MEMBER_AVATARS.map((m) => (
                    <div key={m.name} className="flex flex-col items-center gap-1">
                      <div className={`w-12 h-12 ${m.color} rounded-full flex items-center justify-center border-2 border-white shadow-md`}>
                        <span className="text-sm font-bold text-white">{m.initial}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">{m.name}</span>
                    </div>
                  ))}
                </div>

                {/* WeChat share button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => showToast("✅ 已复制邀请口令并生成小程序卡片，快去微信粘贴分享吧！")}
                  className="w-full relative overflow-hidden bg-[#07C160] text-white font-black py-4 rounded-2xl text-sm shadow-lg shadow-green-200/50 mb-3"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    发送组局卡片给微信好友
                  </span>
                </motion.button>

                {/* Copy room code */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => showToast("📋 房间口令已复制：#8972 快发给你的饭搭子吧")}
                  className="w-full flex items-center justify-center gap-2 text-gray-400 text-xs font-medium py-2 mb-3 hover:text-gray-600 transition-colors"
                >
                  <Copy size={12} />
                  复制房间口令
                </motion.button>
              </div>
            </div>

            {/* Start button */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setStep("swiping")}
              className="w-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold py-4 rounded-2xl text-sm shadow-lg shadow-orange-200/40"
            >
              <span className="flex items-center justify-center gap-2">
                <Rocket size={18} />
                凑齐了，开始选店
              </span>
            </motion.button>
            <p className="text-[10px] text-gray-300 mt-3">4 位成员将各自独立滑动，系统自动匹配共识</p>
          </motion.div>
        )}

        {/* ========== PHASE 2: SWIPING ========== */}
        {step === "swiping" && (
          <motion.div
            key="swiping"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            <SwipingHeader />

            <div className="text-center mb-3 w-full max-w-sm">
              <p className="text-xs text-gray-400">
                右滑 = 想吃！左滑 = 下一个 · 遇到合拍就组局
              </p>
            </div>

            {/* Card stack */}
            <div className="relative w-full max-w-sm h-[420px] mx-auto">
              <AnimatePresence>
                {[0, 1].map((offset) => {
                  const idx = (currentIdx + offset) % cityRestaurants.length;
                  const restaurant = cityRestaurants[idx];
                  if (!restaurant) return null;
                  return (
                    <SwipeCard
                      key={`${restaurant.id}-${currentIdx + offset}`}
                      restaurant={restaurant}
                      onSwipe={handleSwipe}
                      isTop={offset === 0}
                    />
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleSwipe("left")}
                className="w-14 h-14 rounded-full bg-white shadow-lg border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-200 transition-colors"
              >
                <X size={24} strokeWidth={2.5} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => handleSwipe("right")}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg shadow-pink-200/50 flex items-center justify-center text-white"
              >
                <Heart size={28} strokeWidth={2.5} fill="white" />
              </motion.button>
            </div>

            <p className="text-xs text-gray-300 mt-3">
              剩余 {remaining > 0 ? remaining : 0} 次滑动
            </p>
          </motion.div>
        )}

        {/* ========== PHASE 3: RESULT ========== */}
        {step === "result" && matched && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={resetToLobby}
            />
            <div className="absolute inset-0 z-50 flex items-center justify-center p-5 pointer-events-none">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden pointer-events-auto text-center relative"
              >
                {/* Confetti for match */}
                {resultType === "match" && showConfetti && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <ConfettiPiece key={i} delay={i * 0.03} />
                    ))}
                  </div>
                )}

                {/* Hero image */}
                <div className="relative h-40">
                  <Image src={matched.image} alt={matched.name} fill className="object-cover" sizes="400px" />
                  <div className={`absolute inset-0 ${resultType === "match" ? "bg-gradient-to-t from-white via-transparent to-transparent" : "bg-gradient-to-t from-white via-white/30 to-transparent"}`} />
                </div>

                <div className="px-6 pb-6 -mt-6 relative">
                  {/* ===== Result A: Perfect Match ===== */}
                  {resultType === "match" && (
                    <>
                      <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                      >
                        <Sparkles size={32} className="text-rose-500 mx-auto mb-2" />
                      </motion.div>
                      <h3 className="text-2xl font-black bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                        It&apos;s a Match!
                      </h3>
                      <p className="text-sm text-gray-700 mt-1.5 font-semibold">
                        你们宿舍 4 人已达成共识！
                      </p>

                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
                        className="mt-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl px-3.5 py-2.5"
                      >
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <span className="text-base">🔥</span>
                          <span className="text-sm font-black text-amber-700">
                            成功解锁【20% 专属团体折扣】
                          </span>
                        </div>
                        <p className="text-[10px] text-amber-600/70 text-center">
                          {matched.name} · {matched.cuisine} · 原价 ¥{matched.avgPrice}/人 →
                          <span className="font-bold text-emerald-600"> ¥{Math.round(matched.avgPrice * 0.8)}/人</span>
                        </p>
                      </motion.div>

                      <div className="flex items-center justify-center gap-1.5 mt-3">
                        {MEMBER_AVATARS.map((m, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                            className={`w-8 h-8 ${m.color} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}
                          >
                            <span className="text-[9px] font-bold text-white">{m.initial}</span>
                          </motion.div>
                        ))}
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="text-[10px] text-gray-400 font-medium ml-1"
                        >
                          4人已就位
                        </motion.span>
                      </div>

                      <div className="flex gap-2 mt-5">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { showToast("💸 已锁定团体折扣！群收款链接已生成，快分享到宿舍群吧"); resetToLobby(); }}
                          className="flex-1 relative overflow-hidden bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-500 text-white font-black py-3.5 rounded-xl text-sm shadow-lg shadow-emerald-200/50"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                          />
                          <span className="relative">💸 一键锁单并发起群收款</span>
                        </motion.button>
                      </div>
                      <button
                        onClick={resetToLobby}
                        className="w-full mt-2 text-[11px] text-gray-400 font-medium py-1.5 hover:text-gray-600 transition-colors"
                      >
                        返回大厅
                      </button>
                    </>
                  )}

                  {/* ===== Result B: Fallback Compromise ===== */}
                  {resultType === "fallback" && (
                    <>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-4xl mb-2"
                      >
                        🤔
                      </motion.div>
                      <h3 className="text-xl font-black text-gray-800">
                        众口难调！
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        没有 100% 达成共识...
                      </p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-4 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-xl px-4 py-3"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-base mt-0.5">💡</span>
                          <div className="text-left">
                            <p className="text-xs font-bold text-sky-800">AI 妥协方案</p>
                            <p className="text-[11px] text-sky-700 mt-0.5 leading-relaxed">
                              但你们有 <span className="font-black text-orange-500">3/4</span> 的人都对
                              【<span className="font-black">{matched.name}</span>】点了赞，要不就这家吧？
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Mini restaurant card */}
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-3 bg-gray-50 rounded-xl p-3 flex items-center gap-3 text-left"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={matched.image} alt={matched.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">{matched.name}</p>
                          <p className="text-[10px] text-gray-400">{matched.cuisine} · ¥{matched.avgPrice}/人 · {matched.zone}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-[9px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold">⭐ {matched.rating}</span>
                            <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-bold">3人赞</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Vote avatars */}
                      <div className="flex items-center justify-center gap-1 mt-3">
                        {MEMBER_AVATARS.map((m, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + i * 0.08, type: "spring" }}
                            className="relative"
                          >
                            <div className={`w-8 h-8 ${m.color} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}>
                              <span className="text-[9px] font-bold text-white">{m.initial}</span>
                            </div>
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border border-white text-[8px] ${
                              i < 3 ? "bg-emerald-500 text-white" : "bg-gray-300 text-white"
                            }`}>
                              {i < 3 ? "👍" : "👎"}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-5">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { showToast("💸 妥协成功！群收款链接已生成，快分享到宿舍群吧"); resetToLobby(); }}
                          className="w-full relative overflow-hidden bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500 text-white font-black py-3.5 rounded-xl text-sm shadow-lg shadow-orange-200/50"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                          />
                          <span className="relative">💸 行，就去这家 (发起群收款)</span>
                        </motion.button>
                      </div>
                      <button
                        onClick={resetToLobby}
                        className="w-full mt-2 text-[11px] text-gray-400 font-medium py-1.5 hover:text-gray-600 transition-colors"
                      >
                        重新来过
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
