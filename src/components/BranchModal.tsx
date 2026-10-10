import React from 'react';
import { BranchInfo } from '../types.ts';

interface BranchModalProps {
  branch: BranchInfo | null;
  onClose: () => void;
  onSelectForSignup: (branchId: string) => void;
}

export const BranchModal: React.FC<BranchModalProps> = ({
  branch,
  onClose,
  onSelectForSignup,
}) => {
  if (!branch) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col gap-4 border border-[#e2e7ff]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#eaedff] pb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-white ${branch.colorBg} shadow-sm`}
            >
              <span className="material-symbols-outlined text-[22px]">{branch.icon}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-xl text-[#131b2e] font-bold">
                {branch.title}
              </h3>
              <span className="font-label-sm text-[#5c403c] font-bold uppercase tracking-wider">
                {branch.age} • Lema: "{branch.motto}"
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5c403c] hover:bg-[#f2f3ff] transition-colors"
            type="button"
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="text-sm text-[#5c403c] leading-relaxed space-y-3">
          <p>{branch.description}</p>
          <p className="bg-[#f2f3ff] p-3 rounded-lg border-l-4 border-[#b70011] text-[#131b2e]">
            {branch.longDescription}
          </p>
        </div>

        <div className="mt-2 flex items-center justify-end gap-3 pt-3 border-t border-[#eaedff]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-[#5c403c] hover:bg-[#f2f3ff] transition-colors"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectForSignup(branch.id);
              onClose();
            }}
            className="bg-[#b70011] hover:bg-[#b02d29] text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>Inscribirse en esta Rama</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
