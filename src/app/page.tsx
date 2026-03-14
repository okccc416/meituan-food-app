"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Phone,
  ShieldCheck,
  MessageCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 24 },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [loadingType, setLoadingType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const sendCode = useCallback(() => {
    if (countdown > 0 || !phone) return;
    setCountdown(60);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [countdown, phone]);

  const handleLogin = useCallback(
    async (type: string) => {
      if (loadingType) return;
      setLoadingType(type);
      await new Promise((r) => setTimeout(r, 800));
      setLoadingType(null);
      setIsVisible(false);
      await new Promise((r) => setTimeout(r, 400));
      router.push("/home");
    },
    [loadingType, router]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="login"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full max-w-sm"
          >
            {/* === Logo + 欢迎语 === */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-10"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-orange-200/50 mb-5"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Utensils size={28} className="text-white" strokeWidth={2} />
              </motion.div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hi，欢迎来到
              </h1>
              <h2 className="text-2xl font-bold text-gray-900 mt-0.5">
                大学城美食地图{" "}
                <span className="inline-block animate-bounce">🍔</span>
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                松江大学城 · 发现周边好味道
              </p>
            </motion.div>

            {/* === 手机号输入框 === */}
            <motion.div variants={itemVariants} className="mb-3">
              <div className="flex items-center bg-white rounded-2xl border-2 border-transparent focus-within:border-orange-400 transition-colors shadow-sm overflow-hidden">
                <div className="flex items-center gap-1.5 pl-4 pr-2 text-gray-400 border-r border-gray-100">
                  <Phone size={16} />
                  <span className="text-sm font-medium text-gray-500">
                    +86
                  </span>
                </div>
                <input
                  type="tel"
                  placeholder="请输入手机号"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
                  }
                  className="flex-1 px-3 py-3.5 text-sm outline-none bg-transparent placeholder:text-gray-300"
                />
              </div>
            </motion.div>

            {/* === 验证码输入框 === */}
            <motion.div variants={itemVariants} className="mb-5">
              <div className="flex items-center bg-white rounded-2xl border-2 border-transparent focus-within:border-orange-400 transition-colors shadow-sm overflow-hidden">
                <div className="pl-4 pr-2 text-gray-400">
                  <ShieldCheck size={16} />
                </div>
                <input
                  type="text"
                  placeholder="请输入验证码"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  className="flex-1 px-3 py-3.5 text-sm outline-none bg-transparent placeholder:text-gray-300"
                />
                <button
                  onClick={sendCode}
                  disabled={countdown > 0 || !phone}
                  className="px-4 py-2 mr-1.5 text-xs font-semibold rounded-xl transition-all disabled:opacity-40 text-orange-500 hover:bg-orange-50 active:bg-orange-100"
                >
                  {countdown > 0 ? `${countdown}s` : "获取验证码"}
                </button>
              </div>
            </motion.div>

            {/* === 登录按钮 === */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => handleLogin("phone")}
                disabled={!!loadingType}
                className="w-full py-3.5 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-200/50 text-sm flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loadingType === "phone" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "登 录"
                )}
              </motion.button>
            </motion.div>

            {/* === 一键体验（测试账号） === */}
            <motion.div variants={itemVariants} className="mt-4">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleLogin("demo")}
                disabled={!!loadingType}
                className="w-full py-3.5 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 text-orange-600 font-bold rounded-2xl text-sm flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-70"
              >
                {loadingType === "demo" ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Sparkles size={16} />
                    评委/内测专属：一键体验
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut",
                      }}
                    />
                  </>
                )}
              </motion.button>
              <p className="text-[10px] text-gray-300 text-center mt-2">
                无需注册，直接进入完整功能演示
              </p>
            </motion.div>

            {/* === 分割线 === */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 my-7"
            >
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[11px] text-gray-400">
                其他登录方式
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>

            {/* === 微信登录 === */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleLogin("wechat")}
                disabled={!!loadingType}
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200/40 disabled:opacity-70"
              >
                {loadingType === "wechat" ? (
                  <Loader2
                    size={20}
                    className="animate-spin text-white"
                  />
                ) : (
                  <MessageCircle
                    size={22}
                    className="text-white"
                    fill="white"
                  />
                )}
              </motion.button>
            </motion.div>

            {/* === 底部协议 === */}
            <motion.p
              variants={itemVariants}
              className="text-[10px] text-gray-300 text-center mt-8"
            >
              登录即代表同意
              <span className="text-gray-400"> 用户协议 </span>和
              <span className="text-gray-400"> 隐私政策</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
