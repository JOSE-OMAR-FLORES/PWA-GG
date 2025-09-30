# Mi PWA - JOFM

Progressive Web Application desarrollada con React, TypeScript y Vite.

## 🏗️ Arquitectura

### Tecnologías Principales
- **React 19** - Framework frontend
- **TypeScript** - Tipado estático
- **Vite 7** - Build tool y desarrollo
- **Workbox** - Service Worker management
- **vite-plugin-pwa** - PWA capabilities

## 📱 Características PWA

### Web App Manifest
- **Archivo**: `/public/manifest.json`
- **Modo**: `standalone` (experiencia nativa)
- **Iconos**: 8 tamaños (72px-512px) en formato SVG/PNG
- **Compatibilidad**: Android, iOS, Windows, Desktop
- **Orientación**: Portrait primary

### Service Worker
- **Archivo**: `/public/service-worker.js`
- **Estrategias de cacheo**:
  - Cache First: Recursos estáticos (imágenes, CSS, JS)
  - Network First: APIs y JSON
  - Stale While Revalidate: HTML y otros recursos
- **Funcionalidades**:
  - Offline support completo
  - Auto-updates automáticos
  - Background sync preparado
  - Push notifications preparado

### App Shell Architecture
- **Componente**: `AppShell.tsx`
- **Splash Screen**: `SplashScreen.tsx` con animaciones CSS
- **Home Screen**: `HomeScreen.tsx` responsive
- **Tiempo de carga**: < 1 segundo para shell básico

## 🔧 Componentes PWA

### PWAInfo Component
- **Ubicación**: `/src/components/PWAInfo.tsx`
- **Funcionalidad**:
  - Detección de instalabilidad PWA
  - Botón de instalación automática/manual
  - Estado visual en tiempo real
  - Instrucciones específicas por navegador

### ServiceWorkerInfo Component
- **Ubicación**: `/src/components/ServiceWorkerInfo.tsx`
- **Funcionalidad**:
  - Monitoreo estado Service Worker
  - Gestión de cache (actualizar/limpiar)
  - Estadísticas de recursos cacheados
  - Estado conexión online/offline

## 🎨 Estilos y UI

### Sistema de Colores
- **Tema**: Negro (#000000) / Blanco (#ffffff)
- **Acentos**: Azul (#007acc) / Verde (#4caf50)
- **Variables CSS**: Definidas en `/src/App.css`

### Responsive Design
- **Breakpoints**: Mobile-first approach
- **Grid**: CSS Grid para layouts
- **Flexbox**: Para componentes individuales

## 📦 Estructura de Archivos

```
src/
├── components/
│   ├── AppShell.tsx|css      # App Shell Architecture
│   ├── HomeScreen.tsx|css    # Pantalla principal
│   ├── SplashScreen.tsx|css  # Pantalla de carga
│   ├── PWAInfo.tsx|css       # Estado PWA
│   └── ServiceWorkerInfo.tsx|css # Estado Service Worker
├── hooks/
│   └── useServiceWorker.ts   # Hook gestión SW
├── config/
│   └── pwa.config.ts        # Configuración PWA
└── pwa/
    └── registerSW.ts        # Registro Service Worker

public/
├── manifest.json            # Web App Manifest
├── service-worker.js        # Service Worker personalizado
├── browserconfig.xml        # Config Microsoft
└── icons/                   # Iconos PWA (múltiples tamaños)
```

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo (puerto 5173/5174)

# Build
npm run build            # Build producción con PWA
npm run preview          # Preview build local

# PWA Utils
npm run pwa:icons        # Info iconos
npm run pwa:manifest     # Verificar manifest
npm run pwa:check        # Estado PWA general
```

## ⚙️ Configuración

### Vite PWA
- **Estrategia**: `injectManifest`
- **Service Worker**: Personalizado con Workbox
- **Registro**: Automático con auto-update
- **Dev mode**: Habilitado para testing

### Build Output
- **Archivos principales**: HTML, CSS, JS optimizados
- **Service Worker**: `service-worker.js` generado
- **Manifest**: Integrado automáticamente
- **Precaching**: 11+ recursos precacheados

## 🌐 Funcionalidades Offline

### Recursos Cacheados
- App Shell completo
- Assets estáticos (CSS, JS, imágenes)
- Iconos y manifest
- Fuentes y recursos externos

### Estrategias de Red
- **Sin conexión**: App funciona completamente offline
- **Conexión intermitente**: Sincronización automática
- **Reconexión**: Actualización automática de datos

## 🔍 Estado PWA

### Verificaciones Implementadas
- Manifest válido y accesible
- Service Worker registrado y activo
- HTTPS/localhost (contexto seguro)
- Instalabilidad detectada automáticamente

### Indicadores Visuales
- Estado de instalación (Sí/No disponible)
- Estado Service Worker (Activo/Error/Cargando)
- Estado conexión (Online/Offline)
- Recursos en cache (contador en tiempo real)

## 📱 Compatibilidad

### Navegadores Soportados
- **Chrome/Edge**: Soporte completo con instalación automática
- **Firefox**: Soporte PWA básico
- **Safari**: Soporte con "Add to Home Screen"
- **Mobile**: Android e iOS completamente compatibles

### Dispositivos
- **Desktop**: Windows, macOS, Linux
- **Mobile**: Android, iOS
- **Tablet**: Responsive design adaptativo

## 🛠️ Desarrollo

### Requisitos
- Node.js 18+
- npm 9+
- Navegador moderno con soporte PWA

### Instalación

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
### Instalación
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm run preview
```

La aplicación estará disponible en `http://localhost:5173` (desarrollo) o `http://localhost:4173` (preview).
```
