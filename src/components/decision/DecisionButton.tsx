"use client";

import { motion } from "framer-motion";
import { Utensils } from "lucide-react";

interface DecisionButtonProps {
  onSpin: () => void;
  candidateCount: number;
}

export function DecisionButton({
  onSpin,
  candidateCount,
}: DecisionButtonProps) {
  const disabled = candidateCount === 0;

  return (
    <div className="flex flex-col items-center gap-5 py-8">
      <motion.button
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.92 }}
        onClick={onSpin}
        disabled={disabled}
        className="relative w-44 h-44 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl shadow-orange-300/40 flex flex-col items-center justify-center gap-2 text-white disabled:opacity-30 disabled:shadow-none"
      >
        <Utensils size={36} strokeWidth={2.2} />
        <span className="text-lg font-bold tracking-wide">开始抽选</span>

        {!disabled && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border-2 border-orange-300/60"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-orange-200/40"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
          </>
        )}
      </motion.button>

      <p className="text-sm text-gray-400 text-center">
        {candidateCount > 0
          ? `${candidateCount} 家餐厅待翻牌`
          : "没有符合条件的餐厅，请调整预算或标签"}
      </p>
    </div>
  );
}
