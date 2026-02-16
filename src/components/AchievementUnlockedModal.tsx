"use client";

import { type Achievement } from "@/store/achievementStore";

interface AchievementUnlockedModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementUnlockedModal({
  achievement,
  onClose,
}: AchievementUnlockedModalProps) {
  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-[85%] max-w-xs p-8 shadow-xl text-center animate-[popIn_0.3s_ease-out]">
        <p className="text-sm font-bold text-[#3B82F6] dark:text-blue-400 uppercase tracking-widest mb-4">
          実績解除！
        </p>
        <div className="text-[120px] leading-none mb-4 animate-[bounce_0.6s_ease-in-out]">
          {achievement.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {achievement.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
          {achievement.description}
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#3B82F6] text-white font-medium hover:bg-blue-600 active:scale-[0.98] transition-all"
        >
          やった！
        </button>
      </div>
      <style jsx>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-12px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
