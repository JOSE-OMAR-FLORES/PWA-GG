import React, { useState } from 'react';
import { usePushNotifications } from '../hooks/usePushNotifications';
import './PushNotifications.css';

export const PushNotifications: React.FC = () => {
  const { 
    permission, 
    token, 
    error, 
    isSupported, 
    requestPermission, 
    sendTestNotification 
  } = usePushNotifications();

  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Detectar información del dispositivo
  React.useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      isMobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
      isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
      isAndroid: /Android/i.test(navigator.userAgent),
      hasNotification: 'Notification' in window,
      hasSW: 'serviceWorker' in navigator,
      permission: Notification.permission
    };
    
    setDebugInfo(JSON.stringify(info, null, 2));
    console.log('Información del dispositivo:', info);
    
    // Mostrar alerta específica para iOS
    if (info.isIOS) {
      console.warn('⚠️ iOS detectado: Las notificaciones web push NO están soportadas en Safari iOS');
    }
  }, []);

  const copyToClipboard = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { text: 'Concedido ✅', class: 'status-granted' };
      case 'denied':
        return { text: 'Denegado ❌', class: 'status-denied' };
      default:
        return { text: 'Pendiente ⏳', class: 'status-default' };
    }
  };

  const status = getPermissionStatus();

  return (
    <div className="push-notifications-container">
      <div className="push-header">
        <h2>🔔 Notificaciones Push</h2>
        <p className="push-subtitle">Firebase Cloud Messaging</p>
      </div>

      {!isSupported && (
        <div className="alert alert-error">
          ⚠️ Tu navegador no soporta notificaciones push
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          ❌ Error: {error}
        </div>
      )}

      <div className="push-info-card">
        <div className="info-row">
          <span className="info-label">Estado del permiso:</span>
          <span className={`info-value ${status.class}`}>{status.text}</span>
        </div>

        <div className="info-row">
          <span className="info-label">Navegador compatible:</span>
          <span className="info-value">{isSupported ? '✅ Sí' : '❌ No'}</span>
        </div>

        {token && (
          <div className="info-row">
            <span className="info-label">Token FCM:</span>
            <span className="info-value token-status">✅ Generado</span>
          </div>
        )}
      </div>

      <div className="push-actions">
        {permission !== 'granted' && (
          <button 
            className="btn btn-primary"
            onClick={requestPermission}
            disabled={!isSupported}
          >
            🔔 Solicitar Permiso
          </button>
        )}

        {permission === 'granted' && (
          <>
            <button 
              className="btn btn-success"
              onClick={sendTestNotification}
            >
              🚀 Enviar Notificación Local
            </button>

            {token && (
              <button 
                className="btn btn-secondary"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? '🙈 Ocultar Token' : '👁️ Ver Token FCM'}
              </button>
            )}
          </>
        )}
      </div>

      {showToken && token && (
        <div className="token-container">
          <div className="token-header">
            <h3>🔑 Tu Token FCM:</h3>
            <button 
              className="btn btn-copy"
              onClick={copyToClipboard}
            >
              {copied ? '✅ Copiado!' : '📋 Copiar'}
            </button>
          </div>
          <div className="token-box">
            <code>{token}</code>
          </div>
          <div className="token-info">
            <p>📌 <strong>Usa este token para enviar notificaciones desde:</strong></p>
            <ul>
              <li>Firebase Console → Cloud Messaging → "Send test message"</li>
              <li>Herramientas de testing de FCM</li>
              <li>Tu backend personalizado</li>
            </ul>
          </div>
        </div>
      )}

      <div className="push-instructions">
        <h3>📖 Cómo enviar notificaciones de prueba:</h3>
        <ol>
          <li>Haz clic en "Solicitar Permiso" y acepta las notificaciones</li>
          <li>Copia tu Token FCM usando el botón "Ver Token FCM"</li>
          <li>Ve a <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
          <li>Selecciona tu proyecto "pwa-jofm"</li>
          <li>Ve a Cloud Messaging → "Send your first message"</li>
          <li>Escribe tu mensaje y en "Send test message" pega tu token FCM</li>
          <li>¡Recibe la notificación! 🎉</li>
        </ol>
      </div>

      {/* Debug Info Panel */}
      <div className="debug-panel">
        <button 
          className="btn btn-debug"
          onClick={() => setShowDebug(!showDebug)}
        >
          {showDebug ? '🙈 Ocultar Info Debug' : '🔍 Mostrar Info Debug'}
        </button>
        
        {showDebug && (
          <div className="debug-info">
            <h4>📱 Información del Dispositivo:</h4>
            <pre>{debugInfo}</pre>
            <div className="debug-tips">
              <h4>💡 Solución de Problemas:</h4>
              <ul>
                <li><strong>iOS (iPhone/iPad):</strong> Las notificaciones web push NO están soportadas en Safari. Solo funcionan en apps nativas.</li>
                <li><strong>Android Chrome:</strong> Debe funcionar correctamente. Si no funciona, asegúrate de que:
                  <ul>
                    <li>Estás usando HTTPS (o localhost)</li>
                    <li>El Service Worker está registrado</li>
                    <li>Has instalado la PWA en tu dispositivo</li>
                  </ul>
                </li>
                <li><strong>Desktop:</strong> Funciona en Chrome, Edge, Firefox y Opera</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
