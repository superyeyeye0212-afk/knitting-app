"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "OK",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl w-[85%] max-w-xs p-6 shadow-xl text-center">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
