/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ViewMode } from './types.ts';
import { LandingPage } from './components/LandingPage.tsx';
import { Dashboard } from './components/Dashboard.tsx';
import { LoginModal } from './components/LoginModal.tsx';
import { Toast, ToastData } from './components/Toast.tsx';

export default function App() {
  // Required State Management
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Toast feedback state
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (message: string, icon: string = 'check_circle') => {
    setToast({
      id: Date.now(),
      message,
      icon,
    });
  };

  // Critical Action: Iniciar Sesión inside Modal closes modal AND sets currentView to 'dashboard'
  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setCurrentView('dashboard');
    showToast('¡Bienvenido al Panel de Jefatura, Scouter Alejandro!', 'verified');
  };

  // Logout Action: In Sidebar of Dashboard, Cerrar Sesión sets currentView back to 'landing'
  const handleLogout = () => {
    setCurrentView('landing');
    showToast('Sesión de Jefatura cerrada correctamente.', 'logout');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans">
      {/* Dynamic View rendering based on currentView */}
      {currentView === 'landing' ? (
        <LandingPage
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onShowToast={showToast}
        />
      ) : (
        <Dashboard
          onLogout={handleLogout}
          onShowToast={showToast}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Interactive Toast Notifications */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
