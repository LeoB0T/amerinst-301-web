import React, { useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [usuario, setUsuario] = useState('scouter.alejandro');
  const [password, setPassword] = useState('1912');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario.trim() || !password.trim()) {
      setError('Por favor ingresa usuario y contraseña');
      return;
    }
    setError('');
    // Critical Action: Close modal AND transition to dashboard view
    onLoginSuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#283044]/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative flex flex-col gap-4 border border-[#e2e7ff] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eaedff] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#b70011] text-white flex items-center justify-center font-bold shadow-sm">
              <span className="material-symbols-outlined text-[20px]">military_tech</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-[#b70011] uppercase tracking-wider font-bold">
                Jefatura de Grupo
              </span>
              <h2 id="modal-title" className="font-headline-md text-xl text-[#131b2e] font-bold">
                Panel de Jefatura
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5c403c] hover:bg-[#f2f3ff] transition-colors"
            aria-label="Cerrar modal"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-sm text-[#5c403c] -mt-1">
          Ingreso autorizado para dirigentes, comisionados y scouters del Grupo Scout Amerinst 301.
        </p>

        {error && (
          <div className="p-2.5 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#131b2e] uppercase tracking-wide">
              Usuario
            </label>
            <div className="relative">
              <span className="material-symbols-outlined text-[18px] text-[#916f6b] absolute left-3 top-3 pointer-events-none">
                badge
              </span>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="ej. scouter.alejandro o código scout"
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white transition-all"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#131b2e] uppercase tracking-wide">
                Contraseña
              </label>
              <span className="text-[11px] text-[#916f6b]">Clave predeterminada: 1912</span>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined text-[18px] text-[#916f6b] absolute left-3 top-3 pointer-events-none">
                lock
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-10 rounded-lg bg-[#f2f3ff] text-[#131b2e] text-sm border border-[#e2e7ff] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:bg-white transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#916f6b] hover:text-[#131b2e] transition-colors"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <div className="bg-[#f2f3ff] p-3 rounded-lg border border-[#e2e7ff] text-xs text-[#5c403c] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#1a8340]">verified_user</span>
              <span>Perfil predeterminado: Scouter Alejandro (Jefe de Tropa)</span>
            </span>
          </div>

          {/* Red Login Button */}
          <button
            type="submit"
            className="w-full h-11 bg-[#dc2626] hover:bg-[#b70011] active:bg-[#991b1b] text-white font-semibold text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <span className="material-symbols-outlined text-[20px]">login</span>
            <span>Iniciar Sesión</span>
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-[#916f6b]">
          Grupo Scout Amerinst 301 • La Paz, Bolivia • Sistema Integral de Jefatura
        </div>
      </div>
    </div>
  );
};
