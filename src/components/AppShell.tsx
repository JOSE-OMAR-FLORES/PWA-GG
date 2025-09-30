import React from 'react';
import './AppShell.css';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="app-shell">
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