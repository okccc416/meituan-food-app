"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Shield, Award, ChevronRight,
  Star, Utensils, Trophy, Heart, Settings,
  Bell, HelpCircle, LogOut, Crown, Flame,
  Zap, Coins, Banknote,
} from "lucide-react";

function TierBadge({ tier, label, count, color, icon }: {
  tier: string; label: string; count: number;
  color: string; icon: React.ReactNode;
}) {
  return (
    <div className={`flex-1 rounded-2xl p-3 text-center ${color}`}>
      <div className="flex items-center justify-center gap-1 mb-1">
        {icon}
        <span className="text-xs font-black">{tier}</span>
      </div>
      <p className="text-[10px] opacity-80">{label}</p>
      <p className="text-lg font-bold mt-0.5">{count}</p>
    </div>
  );
}

const menuItems = [
  { icon: Heart, label: "我的收藏", badge: "12", color: "text-rose-500" },
  { icon: Star, label: "我的评价", badge: "8", color: "text-amber-500" },
  { icon: Utensils, label: "用餐记录", badge: "47", color: "text-orange-500" },
  { icon: Trophy, label: "成就徽章", badge: "6", color: "text-violet-500" },
  { icon: Bell, label: "消息通知", badge: "3", color: "text-blue-500" },
  { icon: Settings, label: "设置", color: "text-gray-500" },
  { icon: HelpCircle, label: "帮助与反馈", color: "text-teal-500" },
];

const achievements = [
  { emoji: "🔥", name: "探店先锋", desc: "累计打卡10家店" },
  { emoji: "🎲", name: "命运之子", desc: "使用转盘30次" },
  { emoji: "🌙", name: "深夜食神", desc: "22点后点餐5次" },
  { emoji: "💰", name: "省钱达人", desc: "人均<20元消费20次" },
  { emoji: "👥", name: "社交达人", desc: "发起组局10次" },
  { emoji: "📸", name: "美食摄影师", desc: "上传10张美食照片" },
];

export function ProfileView() {
  const [toast, setToast] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto min-h-[calc(100vh-80px)]">
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

      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-orange-400 via-rose-400 to-violet-500 rounded-3xl p-5 text-white mb-5 relative overflow-hidden"
      >
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
            <User size={28} strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">美食探索者</h2>
            <p className="text-xs text-white/70">松江大学城 · 已探索 47 家店</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">Lv.8</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">吃货榜 Top 15%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Asset Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.03 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
      >
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => showToast("🪙 社交积分可在「积分商城」兑换商家代金券")}
            className="p-4 text-center hover:bg-amber-50/50 transition-colors"
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Coins size={16} className="text-amber-500" />
              <span className="text-xs font-bold text-gray-500">社交积分</span>
            </div>
            <p className="text-2xl font-black text-amber-600">350</p>
            <p className="text-[9px] text-gray-400 mt-0.5">可兑换商家代金券</p>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => showToast("💰 跑腿赏金满 ¥10 即可提现至微信钱包")}
            className="p-4 text-center hover:bg-emerald-50/50 transition-colors"
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Banknote size={16} className="text-emerald-500" />
              <span className="text-xs font-bold text-gray-500">跑腿赏金</span>
            </div>
            <p className="text-2xl font-black text-emerald-600">¥12.5</p>
            <p className="text-[9px] text-gray-400 mt-0.5">可提现</p>
          </motion.button>
        </div>
      </motion.div>

      {/* Edu Email Auth */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${emailVerified ? "bg-emerald-50" : "bg-blue-50"}`}>
              <Mail size={18} className={emailVerified ? "text-emerald-500" : "text-blue-500"} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">
                {emailVerified ? "🎓 .edu 已认证" : "🎓 Edu邮箱认证"}
              </p>
              <p className="text-[10px] text-gray-400">
                {emailVerified ? "已验证在校学生身份" : "认证后解锁学生专属优惠"}
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!emailVerified) {
                setEmailVerified(true);
                showToast("🎉 .edu 邮箱认证成功！已解锁学生专属折扣");
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              emailVerified
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                : "bg-blue-500 text-white shadow-sm"
            }`}
          >
            {emailVerified ? (
              <span className="flex items-center gap-1"><Shield size={12} /> 已认证</span>
            ) : (
              "去认证"
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Food Tier Rankings */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <Award size={16} className="text-orange-500" />
          <h3 className="text-sm font-bold text-gray-900">美食天梯榜</h3>
        </div>
        <div className="flex gap-2">
          <TierBadge
            tier="T0"
            label="封神级"
            count={3}
            color="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-amber-700"
            icon={<Crown size={12} className="text-amber-500" />}
          />
          <TierBadge
            tier="T1"
            label="常驻级"
            count={8}
            color="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 text-violet-700"
            icon={<Flame size={12} className="text-violet-500" />}
          />
          <TierBadge
            tier="T2"
            label="偶尔去"
            count={15}
            color="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 text-sky-700"
            icon={<Zap size={12} className="text-sky-500" />}
          />
        </div>
        <div className="mt-3 bg-gray-50 rounded-xl p-3">
          <p className="text-[10px] font-semibold text-gray-500 mb-1.5">🏆 我的 T0 封神店</p>
          <div className="space-y-1.5">
            {["翔仔好味馆 · 红烧肉盖饭", "老张拉面馆 · 红烧牛肉面", "鲜茶道 · 芋泥波波奶茶"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs">🥇</span>
                <span className="text-[11px] text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievement badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
      >
        <h3 className="text-sm font-bold text-gray-900 mb-3">🏅 成就徽章</h3>
        <div className="grid grid-cols-3 gap-2">
          {achievements.map((a) => (
            <motion.div
              key={a.name}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-50 rounded-xl p-2.5 text-center cursor-pointer hover:bg-orange-50 transition-colors"
              onClick={() => showToast(`${a.emoji} ${a.name}：${a.desc}`)}
            >
              <span className="text-xl">{a.emoji}</span>
              <p className="text-[10px] font-semibold text-gray-700 mt-1">{a.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Digital Punch Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.17 }}
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">🏆 我的数字印章 (留存挑战)</h3>
          <span className="text-[10px] bg-amber-50 text-amber-600 font-bold px-2 py-0.5 rounded-full border border-amber-100">
            集章得好礼
          </span>
        </div>

        <div className="space-y-3">
          {/* Punch card 1 */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-3.5 border border-amber-100/60">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">☕️</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">曼顿果汁吧</p>
                  <p className="text-[10px] text-amber-600 font-medium">再喝 2 杯可兑换免单！</p>
                </div>
              </div>
              <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">3/5</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="relative">
                  {n <= 3 ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-md shadow-orange-200/50">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-amber-300 flex items-center justify-center bg-white">
                      <span className="text-[10px] text-amber-300 font-bold">{n}</span>
                    </div>
                  )}
                  {n < 5 && (
                    <div className={`absolute top-1/2 -right-3 w-3 h-0.5 ${n < 3 ? "bg-orange-300" : "bg-amber-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-amber-500/70 text-center mt-2">集满 5 杯 → 第 6 杯免单</p>
          </div>

          {/* Punch card 2 */}
          <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 rounded-2xl p-3.5 border border-violet-100/60">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">🍜</span>
                <div>
                  <p className="text-xs font-bold text-gray-800">老张拉面馆</p>
                  <p className="text-[10px] text-violet-600 font-medium">再吃 3 次解锁隐藏菜单！</p>
                </div>
              </div>
              <span className="text-[10px] bg-violet-500 text-white px-2 py-0.5 rounded-full font-bold">2/5</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="relative">
                  {n <= 2 ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-md shadow-violet-200/50">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8.5L6.5 12L13 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-violet-300 flex items-center justify-center bg-white">
                      <span className="text-[10px] text-violet-300 font-bold">{n}</span>
                    </div>
                  )}
                  {n < 5 && (
                    <div className={`absolute top-1/2 -right-3 w-3 h-0.5 ${n < 2 ? "bg-violet-300" : "bg-violet-200"}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-violet-500/70 text-center mt-2">集满 5 次 → 解锁店长私藏秘制拌面</p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => showToast("📍 更多集点挑战即将上线，敬请期待！")}
          className="w-full mt-3 text-[11px] text-gray-400 font-medium py-2 hover:text-orange-500 transition-colors"
        >
          查看全部集点卡 →
        </motion.button>
      </motion.div>

      {/* Menu items */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4"
      >
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.98 }}
            onClick={() => showToast(`📍 "${item.label}" 功能开发中，敬请期待！`)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors ${
              i !== menuItems.length - 1 ? "border-b border-gray-50" : ""
            }`}
          >
            <item.icon size={18} className={item.color} />
            <span className="flex-1 text-left text-sm text-gray-700 font-medium">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
            )}
            <ChevronRight size={14} className="text-gray-300" />
          </motion.button>
        ))}
      </motion.div>

      {/* Logout */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => showToast("👋 退出登录功能仅在正式版可用")}
        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 py-4 hover:text-red-400 transition-colors"
      >
        <LogOut size={15} />
        退出登录
      </motion.button>

      <p className="text-[10px] text-gray-300 text-center mt-2 mb-8">
        大学城美食地图 v2.0 · MVP 产品演示
      </p>
    </div>
  );
}
