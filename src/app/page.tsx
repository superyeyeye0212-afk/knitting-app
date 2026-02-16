"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import { useAchievementStore } from "@/store/achievementStore";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import AddProjectDialog from "@/components/AddProjectDialog";
import AchievementUnlockedModal from "@/components/AchievementUnlockedModal";
import { type Achievement } from "@/store/achievementStore";

export default function ProjectListPage() {
  const { projects, addProject } = useProjectStore();
  const { incrementProjectCount } = useAchievementStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-4 pt-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">編み物プロジェクト</h1>
      </div>
    );
  }

  const sorted = [...projects].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="px-4 pt-12 pb-24 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">編み物プロジェクト</h1>

      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-lg leading-relaxed">
            まだプロジェクトがありません
            <br />
            下のボタンから始めましょう
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((project) => (
            <Link
              key={project.id}
              href={`/counter/${project.id}`}
              className="block bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow active:scale-[0.98] transition-transform"
            >
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{project.name}</h2>
              <p className="text-[#3B82F6] dark:text-blue-400 font-medium mt-1">
                {project.currentRow}段目
                {project.targetRow && (
                  <span className="text-gray-400 dark:text-gray-500 font-normal text-sm ml-2">
                    / {project.targetRow}段
                  </span>
                )}
              </p>
              <p className="text-gray-300 dark:text-gray-600 text-xs mt-2">
                {formatDistanceToNow(new Date(project.updatedAt), {
                  addSuffix: true,
                  locale: ja,
                })}
              </p>
            </Link>
          ))}
        </div>
      )}

      <button
        onClick={() => setDialogOpen(true)}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#3B82F6] text-white px-6 py-4 rounded-full shadow-lg hover:bg-blue-600 active:scale-95 transition-all font-medium z-10"
      >
        <Plus size={20} strokeWidth={2.5} />
        新しいプロジェクト
      </button>

      <AddProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onAdd={(data) => {
          addProject(data);
          const newlyUnlocked = incrementProjectCount();
          if (newlyUnlocked.length > 0) {
            setAchievementQueue(newlyUnlocked);
            setShowAchievementModal(true);
          }
        }}
      />

      {showAchievementModal && achievementQueue.length > 0 && (
        <AchievementUnlockedModal
          achievement={achievementQueue[0]}
          onClose={() => {
            const rest = achievementQueue.slice(1);
            if (rest.length > 0) {
              setAchievementQueue(rest);
            } else {
              setAchievementQueue([]);
              setShowAchievementModal(false);
            }
          }}
        />
      )}
    </div>
  );
}
