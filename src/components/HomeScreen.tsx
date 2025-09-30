import React from 'react';
import PWAInfo from './PWAInfo';
import ServiceWorkerInfo from './ServiceWorkerInfo';
import './HomeScreen.css';

export const HomeScreen: React.FC = () => {
  return (
    <div className="home-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">🚀</div>
          <h1 className="hero-title">Bienvenido a Mi PWA</h1>
          <p className="hero-subtitle">
            Una aplicación web progresiva moderna, rápida y confiable
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              ✨ Comenzar
            </button>
            <button className="btn btn-secondary">
              📖 Más Info
            </button>
          </div>
        </div>
      </section>

      {/* PWA Status */}
      <PWAInfo />

      {/* Service Worker Info */}
      <ServiceWorkerInfo />

      {/* Features Grid */}
      <section className="features-section">
        <h2 className="section-title">🌟 Características</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Instalable</h3>
            <p>Instala la app en tu dispositivo como una aplicación nativa</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Rápida</h3>
            <p>Carga instantánea gracias al App Shell y cache inteligente</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Offline</h3>
            <p>Funciona sin conexión mediante Service Worker</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Notificaciones</h3>
            <p>Recibe actualizaciones importantes al instante</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3>Multiplataforma</h3>
            <p>Compatible con todos los dispositivos y navegadores</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Segura</h3>
            <p>Servida por HTTPS con las mejores prácticas de seguridad</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2 className="section-title">📊 Rendimiento</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">&lt; 1s</div>
            <div className="stat-label">Tiempo de Carga</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">PWA Score</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">A+</div>
            <div className="stat-label">Performance</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Disponibilidad</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;