import React, { useEffect } from 'react';
import './NotFound.css';

interface NotFoundProps {
  redirect?: boolean;
}

export const NotFound: React.FC<NotFoundProps> = ({ redirect = true }) => {
  useEffect(() => {
    if (redirect) {
      console.log('🔄 Ruta no encontrada, redirigiendo a inicio en 3 segundos...');
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [redirect]);

  return (
    <div className="not-found-container">
      <div className="not-found-icon">🔍</div>
      <h1 className="not-found-title">404 - No Encontrado</h1>
      <p className="not-found-subtitle">
        La página que buscas no existe.
      </p>
      
      {redirect && (
        <p className="not-found-redirect">
          Redirigiendo al inicio en 3 segundos...
        </p>
      )}

      <div className="not-found-actions">
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.href = '/'}
        >
          🏠 Ir al Inicio
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => window.history.back()}
        >
          ⬅️ Volver Atrás
        </button>
      </div>
    </div>
  );
};

export default NotFound;