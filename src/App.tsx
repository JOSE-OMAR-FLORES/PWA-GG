import { useState, useEffect } from 'react'
import './App.css'
import AppShell from './components/AppShell'
import HomeScreen from './components/HomeScreen'
import SplashScreen from './components/SplashScreen'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Simular carga inicial de la aplicación
    const initApp = async () => {
      try {
        // Simular carga de recursos críticos
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Verificar Service Worker (opcional)
        if ('serviceWorker' in navigator) {
          try {
            await navigator.serviceWorker.ready
          } catch (swError) {
            console.log('Service Worker no disponible, continuando...')
          }
        }
        
        // La carga se completa cuando termina el splash
      } catch (error) {
        console.error('Error durante la inicialización:', error)
      }
    }

    initApp()
  }, [])

  const handleLoadingComplete = () => {
    setShowSplash(false)
  }

  // Mostrar Splash Screen mientras carga
  if (showSplash) {
    return <SplashScreen onLoadingComplete={handleLoadingComplete} />
  }

  // Mostrar App Shell con contenido
  return (
    <AppShell>
      <HomeScreen />
    </AppShell>
  )
}

export default App
