import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onLoadingComplete: () => void;
  minDisplayTime?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onLoadingComplete, 
  minDisplayTime = 1500 
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Iniciando...');

  useEffect(() => {
    const messages = [
      'Iniciando...',
      'Cargando recursos...',
      'Configurando PWA...',
      'Preparando experiencia...',
      '¡Casi listo!'
    ];

    // Simular progreso de carga
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 25;
        
        // Actualizar mensaje según progreso
        const messageIndex = Math.floor((newProgress / 100) * messages.length);
        if (messageIndex < messages.length) {
          setLoadingText(messages[messageIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setProgress(100);
          setLoadingText('¡Listo!');
          
          // Esperar un poco más después de completar
          setTimeout(() => {
            onLoadingComplete();
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    // Asegurar tiempo mínimo de display
    const minTimeTimeout = setTimeout(() => {
      if (progress < 100) {
        setProgress(100);
        setLoadingText('¡Listo!');
      }
    }, minDisplayTime);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minTimeTimeout);
    };
  }, [onLoadingComplete, minDisplayTime, progress]);

  return (
    <div className="splash-screen">
      <div className="splash-background">
        <div className="splash-gradient"></div>
        <div className="splash-particles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
      </div>
      
      <div className="splash-content">
        <div className="splash-logo">
          <div className="logo-container">
            <div className="logo-ring"></div>
            <div className="logo-icon">🚀</div>
          </div>
        </div>
        
        <h1 className="splash-title">Mi PWA - JOFM</h1>
        <p className="splash-subtitle">Aplicación Web Progresiva</p>
        
        <div className="loading-section">
          <div className="loading-bar">
            <div 
              className="loading-fill" 
              style={{ width: `${progress}%` }}
            ></div>
            <div className="loading-glow" style={{ left: `${progress}%` }}></div>
          </div>
          
          <div className="loading-info">
            <span className="loading-text">{loadingText}</span>
            <span className="loading-percentage">{Math.floor(progress)}%</span>
          </div>
        </div>
        
        <div className="splash-features">
          <div className="feature-badge">
            <span className="feature-icon">📱</span>
            <span>Instalable</span>
          </div>
          <div className="feature-badge">
            <span className="feature-icon">⚡</span>
            <span>Rápida</span>
          </div>
          <div className="feature-badge">
            <span className="feature-icon">🔄</span>
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;