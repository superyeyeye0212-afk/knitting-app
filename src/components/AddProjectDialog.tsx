"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: { name: string; targetRow?: number }) => void;
}

export default function AddProjectDialog({ open, onClose, onAdd }: AddProjectDialogProps) {
  const [name, setName] = useState("");
  const [targetRow, setTargetRow] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      targetRow: targetRow ? parseInt(targetRow, 10) : undefined,
    });
    setName("");
    setTargetRow("");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setTargetRow("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-[90%] max-w-sm p-6 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">新しいプロジェクト</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              プロジェクト名 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例：マフラー"
              autoFocus
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-700 placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              目標段数（オプション）
            </label>
            <input
              type="number"
              value={targetRow}
              onChange={(e) => setTargetRow(e.target.value)}
              placeholder="例：50"
              min="1"
              inputMode="numeric"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-100 bg-white dark:bg-slate-700 placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-colors"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-3 rounded-xl bg-[#3B82F6] text-white font-medium hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              作成
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
