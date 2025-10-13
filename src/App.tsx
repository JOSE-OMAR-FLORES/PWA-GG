import './App.css'
import Router from './Router'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Solo si no hay conexión y no venimos de offline.html
    if (!navigator.onLine && window.location.pathname !== '/offline.html') {
      if (!localStorage.getItem('offline-visited')) {
        localStorage.setItem('offline-visited', 'true');
        window.location.href = '/offline.html';
      }
    }
    // Si vuelves a estar online, limpia el flag
    const clearFlag = () => localStorage.removeItem('offline-visited');
    window.addEventListener('online', clearFlag);
    return () => window.removeEventListener('online', clearFlag);
  }, []);
  return <Router />;
}

export default App;