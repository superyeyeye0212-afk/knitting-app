"use client";

import { useEffect, useState } from "react";
import { useAchievementStore } from "@/store/achievementStore";
import { Lock } from "lucide-react";

export default function AchievementsPage() {
  const { achievements, progress } = useAchievementStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-4 pt-10">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">実績</h1>
      </div>
    );
  }

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  const getProgressText = (a: (typeof achievements)[0]) => {
    const { type, value } = a.condition;
    if (type === "total_rows") {
      return `${Math.min(progress.totalRows, value)}/${value}段`;
    }
    if (type === "project_count") {
      return `${Math.min(progress.projectCount, value)}/${value}個`;
    }
    return "";
  };

  const getProgressPercent = (a: (typeof achievements)[0]) => {
    const { type, value } = a.condition;
    if (type === "total_rows") {
      return Math.min(100, (progress.totalRows / value) * 100);
    }
    if (type === "project_count") {
      return Math.min(100, (progress.projectCount / value) * 100);
    }
    return 0;
  };

  return (
    <div className="px-4 pt-10 pb-24 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">実績</h1>

      {/* Progress Summary */}
      <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 mb-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3B82F6] dark:text-blue-400">
              {progress.totalRows}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">累計段数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3B82F6] dark:text-blue-400">
              {progress.projectCount}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">プロジェクト</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#3B82F6] dark:text-blue-400">
              {unlockedCount}/{totalCount}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">実績解除</p>
          </div>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 text-right mt-1">{percentage}%</p>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`relative rounded-2xl p-4 text-center transition-all ${
              a.unlocked
                ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-100 dark:border-yellow-900/50 shadow-sm"
                : "bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-gray-700"
            }`}
          >
            {!a.unlocked && (
              <div className="absolute top-2 right-2">
                <Lock size={14} className="text-gray-300 dark:text-gray-600" />
              </div>
            )}
            <div
              className={`text-5xl mb-2 ${!a.unlocked ? "grayscale opacity-40" : ""}`}
            >
              {a.icon}
            </div>
            <p
              className={`text-sm font-bold leading-tight ${
                a.unlocked
                  ? "text-gray-800 dark:text-gray-100"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {a.title}
            </p>
            <p
              className={`text-xs mt-0.5 ${
                a.unlocked
                  ? "text-gray-500 dark:text-gray-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            >
              {a.description}
            </p>
            {!a.unlocked && (
              <div className="mt-2">
                <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-300 dark:bg-gray-600 rounded-full transition-all"
                    style={{ width: `${getProgressPercent(a)}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                  {getProgressText(a)}
                </p>
              </div>
            )}
            {a.unlocked && a.unlockedAt && (
              <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
                {new Date(a.unlockedAt).toLocaleDateString("ja-JP")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
