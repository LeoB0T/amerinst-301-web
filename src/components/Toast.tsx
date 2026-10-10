import React, { useEffect } from 'react';

export interface ToastData {
  id: number;
  message: string;
  icon?: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#283044] text-[#eef0ff] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-md border border-[#5c403c]/40">
        <span className="material-symbols-outlined text-[#95f8a7] text-[22px] shrink-0">
          {toast.icon || 'check_circle'}
        </span>
        <span className="text-xs sm:text-sm font-medium leading-snug">
          {toast.message}
        </span>
        <button
          onClick={onClose}
          className="ml-auto text-[#dae2fd] hover:text-white p-1 rounded-md transition-colors"
          aria-label="Cerrar notificación"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
