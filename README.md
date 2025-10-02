# 🚀 Mi Aplicación PWA - JOFM

<div align="center">

![PWA Badge](https://img.shields.io/badge/PWA-Ready-success)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.6-purple)
![Lighthouse](https://img.shields.io/badge/Lighthouse-100%2F100-success)
![License](https://img.shields.io/badge/License-MIT-green)

Progressive Web Application profesional con funcionalidad offline completa, diseño responsive y branding personalizado del pirata de Culiacán.

[🌐 Demo en Vivo](https://pwa-jofm.netlify.app) | [📚 Documentación](./DOCUMENTACION.md) | [🐛 Reportar Bug](https://github.com/JOSE-OMAR-FLORES/PWA-GG/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demo y URLs](#-demo-y-urls)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [PWA Features](#-pwa-features)
- [Documentación](#-documentación)
- [Estructura](#-estructura-del-proyecto)
- [Scripts](#-scripts-disponibles)
- [Deploy](#-deploy)
- [Autor](#-autor)
- [Licencia](#-licencia)

---

## ✨ Características

### 🎯 Funcionalidades Core

- ✅ **Progressive Web App** - Instalable en todos los dispositivos
- ✅ **Offline First** - Funciona completamente sin internet desde cero
- ✅ **Service Worker** - Cache inteligente multinivel con Workbox
- ✅ **App Shell Architecture** - Carga instantánea (< 1s)
- ✅ **Responsive Design** - Mobile-first con sistema fluido
- ✅ **TypeScript** - Type safety completo
- ✅ **Performance** - Lighthouse 100/100 PWA

### 🎨 Diseño y UX

- 🎨 Diseño responsive con sistema de diseño fluido
- 🏴‍☠️ Branding personalizado del pirata de Culiacán
- 🌗 Tema oscuro elegante
- ⚡ Animaciones y transiciones suaves
- 📱 Touch-friendly (mínimo 44px)
- ♿ Accesible (ARIA labels, contraste AA)

### 🔧 Técnicas

- 🛠️ React 19 + TypeScript 5.8
- ⚙️ Vite 7 con Hot Module Replacement
- 📦 Workbox para Service Worker
- 🖼️ Sharp para generación de iconos
- 🎭 CSS Modules con clamp()
- 🔄 Auto-update de SW

---

## 🌐 Demo y URLs

| Recurso | URL |
|---------|-----|
| **🌐 PWA en Vivo** | [https://pwa-jofm.netlify.app](https://pwa-jofm.netlify.app) |
| **📦 Repositorio** | [https://github.com/JOSE-OMAR-FLORES/PWA-GG](https://github.com/JOSE-OMAR-FLORES/PWA-GG) |
| **📚 Documentación** | [Ver DOCUMENTACION.md](./DOCUMENTACION.md) |
| **📸 Guía de Instalación** | [Ver GUIA_INSTALACION.md](./documentacion/GUIA_INSTALACION.md) |

---

## 🛠️ Tecnologías

### Stack Principal

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [React](https://react.dev/) | 19.1.1 | Framework UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3 | Type Safety |
| [Vite](https://vite.dev/) | 7.1.6 | Build Tool |
| [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) | 1.0.3 | PWA Automation |
| [Workbox](https://developers.google.com/web/tools/workbox) | 7.3.0 | Service Worker |
| [Sharp](https://sharp.pixelplumbing.com/) | Latest | Image Processing |

### Dependencias PWA

```json
{
  "vite-plugin-pwa": "^1.0.3",
  "workbox-window": "^7.3.0",
  "workbox-precaching": "^7.3.0",
  "workbox-routing": "^7.3.0",
  "workbox-strategies": "^7.3.0"
}
```

---

## 📥 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm 9+ o pnpm 8+
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/JOSE-OMAR-FLORES/PWA-GG.git
cd PWA-GG
```

2. **Instalar dependencias**
```bash
npm install
# o
pnpm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

---

## 🚀 Uso

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

### Generar Iconos PWA

```bash
# Generar iconos desde icon-original.png
npm run pwa:icons

# O manualmente
node scripts/generate-icons-from-source.js
```

### Deploy

```bash
# Push a main para auto-deploy en Netlify
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

---

## 📱 PWA Features

### 1. Web App Manifest

**Ubicación:** `/public/manifest.json`

```json
{
  "name": "Mi Aplicación PWA - JOFM",
  "short_name": "PWA-JOFM",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "display": "standalone",
  "icons": [
    // 8 tamaños: 72x72 hasta 512x512
  ]
}
```

**Características:**
- ✅ 8 iconos en formato PNG
- ✅ Modo standalone (sin navegador)
- ✅ Orientation portrait
- ✅ Theme color personalizado

### 2. Service Worker

**Estrategias de Caché:**

| Tipo de Recurso | Estrategia | Timeout |
|-----------------|------------|---------|
| **Navegación (HTML)** | Network First | 2s |
| **CSS/JS** | Cache First | - |
| **Imágenes** | Cache First | - |
| **API Calls** | Network First | 3s |

**Recursos Precacheados:** 42 archivos (546.24 KiB)

**Funcionalidades:**
- ✅ Offline completo desde instalación
- ✅ Update automático de versiones
- ✅ Skip waiting habilitado
- ✅ Client claim inmediato

### 3. App Shell Architecture

**Componentes:**
- `AppShell.tsx` - Shell persistente
- `SplashScreen.tsx` - Splash animado
- `HomeScreen.tsx` - Pantalla principal
- `PWAInfo.tsx` - Info de instalación
- `ServiceWorkerInfo.tsx` - Estado del SW

**Performance:**
- ⚡ First Contentful Paint: < 1.0s
- ⚡ Largest Contentful Paint: < 1.5s
- ⚡ Time to Interactive: < 2.0s

---

## 📚 Documentación

### Documentos Disponibles

| Documento | Descripción |
|-----------|-------------|
| [**DOCUMENTACION.md**](./DOCUMENTACION.md) | 📖 Documentación técnica completa (47 páginas) |
| [**RESUMEN_EJECUTIVO.md**](./documentacion/RESUMEN_EJECUTIVO.md) | 📄 Resumen ejecutivo para entrega |
| [**GUIA_INSTALACION.md**](./documentacion/GUIA_INSTALACION.md) | 📱 Guía de instalación paso a paso |
| [**GUIA_CAPTURAS.md**](./documentacion/GUIA_CAPTURAS.md) | 📸 Instrucciones para tomar capturas |
| **README.md** | 📝 Este archivo |

### Contenido de la Documentación

La documentación completa incluye:
- ✅ Implementación del Web App Manifest
- ✅ Arquitectura del App Shell
- ✅ Configuración del Service Worker
- ✅ Estrategias de caché detalladas
- ✅ Justificación de branding y diseño
- ✅ Guías de instalación para todos los dispositivos
- ✅ Capturas de pantalla profesionales
- ✅ Auditoría Lighthouse
- ✅ Métricas de performance

---

## 📁 Estructura del Proyecto

```
my-pwa-jofm/
├── public/
│   ├── icons/                      # 8 iconos PWA (72-512px)
│   │   ├── icon-72x72.png
│   │   ├── icon-96x96.png
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   ├── screenshots/                # Capturas para manifest
│   ├── favicon.ico                 # Favicon personalizado
│   ├── icon-original.png          # Imagen fuente (pirata)
│   ├── manifest.json              # Web App Manifest
│   └── service-worker.js          # SW personalizado
│
├── src/
│   ├── components/
│   │   ├── AppShell.tsx           # App Shell Architecture
│   │   ├── AppShell.css
│   │   ├── HomeScreen.tsx         # Pantalla principal
│   │   ├── HomeScreen.css
│   │   ├── SplashScreen.tsx       # Splash screen animado
│   │   ├── SplashScreen.css
│   │   ├── PWAInfo.tsx            # Info de PWA
│   │   └── ServiceWorkerInfo.tsx  # Info del SW
│   │
│   ├── pwa/                        # Lógica PWA
│   │   ├── sw-register.ts         # Registro SW
│   │   └── pwa-utils.ts           # Utilidades
│   │
│   ├── assets/                     # Assets estáticos
│   ├── App.tsx                     # Componente raíz
│   ├── App.css                     # Estilos globales
│   ├── main.tsx                    # Entry point + SW register
│   ├── index.css                   # CSS responsive global
│   └── sw.ts                       # SW TypeScript
│
├── scripts/
│   └── generate-icons-from-source.js  # Generador de iconos
│
├── documentacion/
│   ├── capturas/                   # Capturas de pantalla
│   │   ├── desktop/
│   │   ├── mobile/
│   │   └── lighthouse/
│   ├── DOCUMENTACION.md           # Doc técnica completa
│   ├── RESUMEN_EJECUTIVO.md       # Resumen para entrega
│   ├── GUIA_INSTALACION.md        # Guía instalación
│   └── GUIA_CAPTURAS.md           # Guía capturas
│
├── dist/                           # Build de producción
│   ├── sw.js                      # Service Worker compilado
│   ├── workbox-*.js              # Workbox runtime
│   └── assets/                   # Assets optimizados
│
├── vite.config.ts                 # Config Vite + PWA
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
├── index.html                     # HTML principal
└── README.md                      # Este archivo
```

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo con HMR
npm run dev
# Puerto: http://localhost:5173

# Build de producción optimizado
npm run build

# Preview del build localmente
npm run preview
```

### Linting y Formateo

```bash
# Linting con ESLint
npm run lint

# Fix automático de errores
npm run lint:fix
```

### PWA Tools

```bash
# Generar todos los iconos PWA desde icon-original.png
npm run pwa:icons

# Manualmente
node scripts/generate-icons-from-source.js
```

### Git

```bash
# Commit con Commitlint
git add .
git commit -m "tipo: mensaje"
# Tipos: feat, fix, docs, style, refactor, test, chore

# Push con auto-deploy
git push origin main
```

---

## 🚀 Deploy

### Netlify (Actual)

**URL:** https://pwa-jofm.netlify.app

**Configuración:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

**Features:**
- ✅ Auto-deploy desde GitHub
- ✅ HTTPS automático (requerido PWA)
- ✅ Deploy previews en PRs
- ✅ Rollback instantáneo

### Alternativas

#### Vercel
```bash
npm install -g vercel
vercel
```

#### GitHub Pages
```bash
npm run build
# Configurar GitHub Pages → dist/
```

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

---

## 🎯 Lighthouse Audit

### Resultados Actuales

```
┌─────────────────┬──────────┐
│ Performance     │  98/100  │
│ Accessibility   │  95/100  │
│ Best Practices  │ 100/100  │
│ SEO             │ 100/100  │
│ PWA             │ 100/100  │ ✅
└─────────────────┴──────────┘
```

### PWA Checklist

- ✅ Fast and reliable
- ✅ Installable
- ✅ PWA optimized
- ✅ Works offline
- ✅ HTTPS enabled
- ✅ Service Worker registered
- ✅ Responsive design
- ✅ Themed address bar

---

## 🎨 Branding

### Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Negro | `#000000` | Theme color, header |
| Blanco | `#ffffff` | Background, texto |
| Azul Vite | `#646cff` | Acento principal |
| Gris Oscuro | `#1a1a1a` | Fondo app |

### Iconografía

- 🏴‍☠️ **Icono principal:** Pirata de Culiacán
- 📱 **Formatos:** PNG (8 tamaños)
- 🎨 **Generación:** Automatizada con Sharp

**Justificación:**
- Identidad regional (Culiacán)
- Cultural y memorable
- Branding distintivo

---

## 🤝 Contribuir

### Pull Requests

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Conventional Commits

```bash
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formateo, sin cambios de código
refactor: refactorización de código
test: agregar tests
chore: tareas de mantenimiento
```

---

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor [abre un issue](https://github.com/JOSE-OMAR-FLORES/PWA-GG/issues) con:

- Descripción del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots si aplica
- Navegador y versión

---

## 📊 Roadmap

### ✅ Completado (v1.0)
- ✅ Web App Manifest completo
- ✅ Service Worker con Workbox
- ✅ App Shell Architecture
- ✅ Offline functionality
- ✅ Responsive design
- ✅ Custom branding
- ✅ Documentación completa

### 🔄 En Progreso
- 🔄 Unit tests con Vitest
- 🔄 E2E tests con Playwright
- 🔄 Internacionalización (i18n)

### 📅 Futuro (v2.0)
- 📅 Push notifications
- 📅 Background sync
- 📅 Periodic sync
- 📅 Share target API
- 📅 File system API
- 📅 Web payments API

---

## 👤 Autor

**José Omar Flores**

- GitHub: [@JOSE-OMAR-FLORES](https://github.com/JOSE-OMAR-FLORES)
- Repositorio: [PWA-GG](https://github.com/JOSE-OMAR-FLORES/PWA-GG)
- PWA: [https://pwa-jofm.netlify.app](https://pwa-jofm.netlify.app)

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [React Team](https://react.dev/) - Framework
- [Vite Team](https://vitejs.dev/) - Build tool
- [Google Workbox](https://developers.google.com/web/tools/workbox) - Service Worker
- [Netlify](https://www.netlify.com/) - Hosting
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación
- [Web.dev](https://web.dev/) - Best practices PWA

---

## 📞 Soporte

Para preguntas y soporte:

- 📧 Issues: [GitHub Issues](https://github.com/JOSE-OMAR-FLORES/PWA-GG/issues)
- 📚 Docs: [Documentación completa](./DOCUMENTACION.md)
- 🌐 Demo: [https://pwa-jofm.netlify.app](https://pwa-jofm.netlify.app)

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub ⭐**

![PWA Ready](https://img.shields.io/badge/PWA-Ready-success?style=for-the-badge)

Hecho con ❤️ por José Omar Flores

</div>

---

**Última actualización:** 1 de octubre de 2025  
**Versión:** 1.0.0
- ✅ Offline completo desde instalación
- ✅ Update automático de versiones
- ✅ Skip waiting habilitado
- ✅ Client claim inmediato

### 3. App Shell Architecture

**Componentes:**
- `AppShell.tsx` - Shell persistente
- `SplashScreen.tsx` - Splash animado
- `HomeScreen.tsx` - Pantalla principal
- `PWAInfo.tsx` - Info de instalación
- `ServiceWorkerInfo.tsx` - Estado del SW

**Performance:**
- ⚡ First Contentful Paint: < 1.0s
- ⚡ Largest Contentful Paint: < 1.5s
- ⚡ Time to Interactive: < 2.0s

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
