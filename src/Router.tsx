import React from 'react';
import { useEffect, useState } from 'react';
import AppShell from './components/AppShell';
import HomeScreen from './components/HomeScreen';
import NotFound from './components/NotFound';
import SplashScreen from './components/SplashScreen';

type Page = 'home' | 'notfound' | 'loading';

export const Router: React.FC = () => {
  const [page, setPage] = useState<Page>('loading');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Obtener ruta actual
    const currentPath = window.location.pathname;
    console.log('🔀 Router: ruta actual =', currentPath);

    // Las rutas válidas
    const validRoutes = ['/', '/index.html'];
    const isValidRoute = validRoutes.includes(currentPath);

    if (isValidRoute) {
      setPage('home');
      console.log('✅ Ruta válida: home');
    } else {
      setPage('notfound');
      console.log('❌ Ruta no válida:', currentPath);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowSplash(false);
  };

  // Mostrar splash mientras carga
  if (showSplash && page === 'home') {
    return <SplashScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Mostrar página según ruta
  if (page === 'home') {
    return (
      <AppShell>
        <HomeScreen />
      </AppShell>
    );
  }

  if (page === 'notfound') {
    return <NotFound redirect={true} />;
  }

  return null;
};

export default Router;