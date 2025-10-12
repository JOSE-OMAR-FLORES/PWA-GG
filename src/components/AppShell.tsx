import React, { useEffect, useState } from 'react';
import './AppShell.css';


interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="app-shell">
      {isOffline && (
        <div style={{
          background: '#ffcc00',
          color: '#222',
          padding: '8px',
          textAlign: 'center',
          fontWeight: 'bold',
          zIndex: 1000
        }}>
          ⚠️ Estás en modo offline. Los cambios se guardarán localmente.
        </div>
      )}
      {/* Header fijo - parte del shell */}
      <header className="app-header">
        <div className="header-content">
          <div className="app-logo">
            <span className="logo-icon">🚀</span>
            <span className="app-title">Mi PWA - JOFM</span>
          </div>
          <nav className="app-nav">
            <button className="nav-item active">🏠 Inicio</button>
            <button className="nav-item">📊 Dashboard</button>
            <button className="nav-item">⚙️ Config</button>
          </nav>
        </div>
      </header>

      {/* Contenido principal - dinámico */}
      <main className="app-main">
        <div className="content-container">
          {children}
        </div>
      </main>

      {/* Footer fijo - parte del shell */}
      <footer className="app-footer">
        <div className="footer-content">
          <span>© 2025 Mi PWA - JOFM</span>
          <div className="footer-links">
            <span className="footer-link">Privacidad</span>
            <span className="footer-link">Términos</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;
