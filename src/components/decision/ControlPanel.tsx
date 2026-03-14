"use client";

import { motion } from "framer-motion";

interface ControlPanelProps {
  budget: number;
  onBudgetChange: (v: number) => void;
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export function ControlPanel({
  budget,
  onBudgetChange,
  allTags,
  selectedTags,
  onToggleTag,
}: ControlPanelProps) {
  return (
    <section className="px-5 mt-4 space-y-4">
      {/* ── 预算滑动条 ── */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-gray-700">
            💰 今日预算
          </span>
          <span className="text-lg font-bold text-orange-500 tabular-nums">
            ¥{budget}
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={budget}
          onChange={(e) => onBudgetChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-orange-100 cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-orange-500
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:shadow-orange-200
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-orange-500
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-gray-400">¥10 穷鬼</span>
          <span className="text-[10px] text-gray-400">¥100 土豪</span>
        </div>
      </div>

      {/* ── 场景标签选择器 ── */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <span className="text-sm font-semibold text-gray-700">
          🏷️ 此刻想要什么 feel？
        </span>
        <div className="flex flex-wrap gap-2 mt-3">
          {allTags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <motion.button
                key={tag}
                whileTap={{ scale: 0.93 }}
                onClick={() => onToggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  active
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {tag}
              </motion.button>
            );
          })}
        </div>
        {selectedTags.length > 0 && (
          <p className="text-[10px] text-gray-400 mt-2">
            已选 {selectedTags.length} 个标签，匹配度越高权重越大
          </p>
        )}
      </div>
    </section>
  );
}
