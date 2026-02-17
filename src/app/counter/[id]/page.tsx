"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MoreVertical,
  Minus,
  RotateCcw,
  Pencil,
} from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import { useAchievementStore, type Achievement } from "@/store/achievementStore";
import ConfirmDialog from "@/components/ConfirmDialog";
import AchievementUnlockedModal from "@/components/AchievementUnlockedModal";
import { vibrateShort, vibrateMedium } from "@/utils/vibration";

export default function CounterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const {
    projects,
    incrementRow,
    decrementRow,
    resetRow,
    deleteProject,
    updateProject,
  } = useProjectStore();
  const { incrementTotalRows, incrementProjectCount } = useAchievementStore();

  const [mounted, setMounted] = useState(false);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState(false);
  const [memoValue, setMemoValue] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [editingTarget, setEditingTarget] = useState(false);
  const [targetValue, setTargetValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const project = projects.find((p) => p.id === id);

  const handleIncrement = useCallback(() => {
    vibrateShort();
    const justCompleted = incrementRow(id);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);

    const allUnlocked: Achievement[] = [];

    const rowUnlocked = incrementTotalRows(1);
    allUnlocked.push(...rowUnlocked);

    if (justCompleted) {
      vibrateMedium();
      setShowCompletionModal(true);
      const projectUnlocked = incrementProjectCount();
      allUnlocked.push(...projectUnlocked);
    }

    if (allUnlocked.length > 0) {
      setAchievementQueue(allUnlocked);
      setShowAchievementModal(true);
    }
  }, [id, incrementRow, incrementTotalRows, incrementProjectCount]);

  const handleDecrement = useCallback(() => {
    vibrateShort();
    decrementRow(id);
  }, [id, decrementRow]);

  const handleReset = useCallback(() => {
    vibrateMedium();
    resetRow(id);
    setResetDialogOpen(false);
  }, [id, resetRow]);

  const handleDelete = useCallback(() => {
    deleteProject(id);
    setDeleteDialogOpen(false);
    router.push("/");
  }, [id, deleteProject, router]);

  const handleMemoSave = useCallback(() => {
    updateProject(id, { memo: memoValue.trim() || undefined });
    setEditingMemo(false);
  }, [id, memoValue, updateProject]);

  const handleNameSave = useCallback(() => {
    if (nameValue.trim()) {
      updateProject(id, { name: nameValue.trim() });
    }
    setEditingName(false);
    setMenuOpen(false);
  }, [id, nameValue, updateProject]);

  const handleTargetSave = useCallback(() => {
    const val = parseInt(targetValue, 10);
    updateProject(id, { targetRow: val > 0 ? val : undefined });
    setEditingTarget(false);
    setMenuOpen(false);
  }, [id, targetValue, updateProject]);

  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <p className="text-gray-400 dark:text-gray-500 text-lg">プロジェクトが見つかりません</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 text-[#3B82F6] dark:text-blue-400 font-medium"
        >
          一覧に戻る
        </button>
      </div>
    );
  }

  const remaining = project.targetRow
    ? project.targetRow - project.currentRow
    : null;
  const progress =
    project.targetRow && project.targetRow > 0
      ? Math.min(100, (project.currentRow / project.targetRow) * 100)
      : null;

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => router.push("/")}
          className="p-2 -ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate mx-4">
          {project.name}
        </h1>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 -mr-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <MoreVertical size={24} />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-lg z-50 w-44 overflow-hidden">
                <button
                  onClick={() => {
                    setNameValue(project.name);
                    setEditingName(true);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Pencil size={16} />
                  名前を編集
                </button>
                <button
                  onClick={() => {
                    setTargetValue(project.targetRow?.toString() ?? "");
                    setEditingTarget(true);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Pencil size={16} />
                  目標段数を編集
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setDeleteDialogOpen(true);
                  }}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-gray-50 dark:border-gray-700"
                >
                  削除
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Name Dialog */}
      {editingName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditingName(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-[85%] max-w-xs p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">名前を編集</h3>
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-700 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditingName(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-medium"
              >
                キャンセル
              </button>
              <button
                onClick={handleNameSave}
                disabled={!nameValue.trim()}
                className="flex-1 py-3 rounded-xl bg-[#3B82F6] text-white font-medium disabled:opacity-40"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Target Dialog */}
      {editingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditingTarget(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-[85%] max-w-xs p-6 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">目標段数を編集</h3>
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              placeholder="空欄で目標なし"
              min="1"
              inputMode="numeric"
              autoFocus
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-700 placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setEditingTarget(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-medium"
              >
                キャンセル
              </button>
              <button
                onClick={handleTargetSave}
                className="flex-1 py-3 rounded-xl bg-[#3B82F6] text-white font-medium"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Counter Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-4">
        <div className="text-center mb-2">
          <span
            className={`text-8xl font-bold text-gray-800 dark:text-gray-100 tabular-nums inline-block transition-transform duration-150 ${
              animating ? "scale-110" : "scale-100"
            }`}
          >
            {project.currentRow}
          </span>
          <p className="text-gray-400 dark:text-gray-500 text-lg mt-1">段目</p>
        </div>

        {project.targetRow && remaining !== null && (
          <div className="w-full max-w-[240px] mt-2 mb-4">
            <p className="text-center text-gray-400 dark:text-gray-500 text-sm mb-2">
              {remaining > 0 ? `あと${remaining}段` : "目標達成！"}
            </p>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  project.completedAt ? "bg-green-500" : "bg-[#3B82F6]"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* +1 Button */}
        <button
          onClick={handleIncrement}
          className="w-[200px] h-[200px] rounded-full bg-[#3B82F6] text-white text-5xl font-bold shadow-lg shadow-blue-200 dark:shadow-blue-900/30 active:scale-95 transition-transform duration-100 mt-4 select-none"
        >
          +1
        </button>

        {/* -1 and Reset */}
        <div className="flex items-center gap-8 mt-6">
          <button
            onClick={handleDecrement}
            className="w-[60px] h-[60px] rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 flex items-center justify-center active:scale-90 transition-transform select-none"
          >
            <Minus size={24} />
          </button>
          <button
            onClick={() => setResetDialogOpen(true)}
            className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-sm py-2 px-3 hover:text-gray-500 dark:hover:text-gray-300 transition-colors select-none"
          >
            <RotateCcw size={16} />
            リセット
          </button>
        </div>
      </div>

      {/* Memo Area */}
      <div className="px-4 pb-22 mb-2">
        {editingMemo ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={memoValue}
              onChange={(e) => setMemoValue(e.target.value)}
              autoFocus
              placeholder="メモを入力"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleMemoSave();
              }}
              className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-slate-700 focus:outline-none focus:border-[#3B82F6]"
            />
            <button
              onClick={handleMemoSave}
              className="px-3 py-2 text-sm text-[#3B82F6] dark:text-blue-400 font-medium"
            >
              保存
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setMemoValue(project.memo || "");
              setEditingMemo(true);
            }}
            className="w-full text-left text-sm py-2 px-3 rounded-lg bg-gray-50 dark:bg-slate-800 truncate"
          >
            {project.memo ? (
              <span className="text-gray-600 dark:text-gray-400">メモ: {project.memo}</span>
            ) : (
              <span className="text-gray-300 dark:text-gray-600">タップでメモ追加</span>
            )}
          </button>
        )}
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={resetDialogOpen}
        title="リセット"
        message="本当にリセットしますか？段数が0に戻ります。"
        confirmLabel="リセット"
        onConfirm={handleReset}
        onCancel={() => setResetDialogOpen(false)}
      />
      <ConfirmDialog
        open={deleteDialogOpen}
        title="プロジェクト削除"
        message={`「${project.name}」を削除しますか？この操作は元に戻せません。`}
        confirmLabel="削除"
        onConfirm={handleDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />

      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCompletionModal(false)} />
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-[85%] max-w-xs p-8 shadow-xl text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">完成おめでとう！</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              「{project.name}」が目標の{project.targetRow}段に到達しました
            </p>
            <button
              onClick={() => setShowCompletionModal(false)}
              className="w-full py-3 rounded-xl bg-green-500 text-white font-medium active:scale-95 transition-transform"
            >
              やったー！
            </button>
          </div>
        </div>
      )}

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
