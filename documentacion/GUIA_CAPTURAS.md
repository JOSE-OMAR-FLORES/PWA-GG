# 📸 Guía para Capturar Pantallas - PWA JOFM

## Capturas Requeridas para la Entrega

Esta guía te ayudará a tomar todas las capturas de pantalla necesarias para tu documentación PDF.

---

## 🖥️ DESKTOP - Chrome/Edge (7 capturas)

### 1. PWA en el Navegador - Antes de Instalar
**Qué mostrar:**
- URL completa: https://pwa-jofm.netlify.app
- Página cargada con el contenido visible
- Icono de instalación (➕) en la barra de direcciones

**Cómo capturar:**
- Windows: `Win + Shift + S` o Snipping Tool
- Mac: `Cmd + Shift + 4`
- Guardar como: `01-desktop-navegador-antes.png`

### 2. Diálogo de Instalación
**Qué mostrar:**
- Pop-up de "¿Instalar Mi Aplicación PWA - JOFM?"
- Botones "Instalar" y "Cancelar"
- Información del manifest visible

**Cómo capturar:**
- Haz clic en el icono de instalación
- Captura el diálogo completo
- Guardar como: `02-desktop-dialogo-instalacion.png`

### 3. App Instalada - Ventana Standalone
**Qué mostrar:**
- App abierta en ventana separada
- Sin barra de navegador (solo la ventana de la app)
- Contenido completo visible
- Barra de título con el nombre de la app

**Cómo capturar:**
- Captura toda la ventana de la app
- Guardar como: `03-desktop-app-standalone.png`

### 4. DevTools - Application Tab (Manifest)
**Qué mostrar:**
- DevTools abierto (F12)
- Pestaña "Application" seleccionada
- Sección "Manifest" desplegada
- Todos los campos del manifest visibles (nombre, iconos, colores)

**Cómo capturar:**
```
1. Presiona F12
2. Click en "Application"
3. Click en "Manifest" en el panel izquierdo
4. Captura toda la pantalla
```
- Guardar como: `04-desktop-devtools-manifest.png`

### 5. DevTools - Service Worker Activo
**Qué mostrar:**
- DevTools → Application → Service Workers
- Estado: "activated and is running"
- Ruta del SW: /sw.js
- Opciones de update y unregister

**Cómo capturar:**
```
1. En DevTools, click en "Service Workers"
2. Verifica que esté "activated"
3. Captura el panel completo
```
- Guardar como: `05-desktop-devtools-sw.png`

### 6. DevTools - Cache Storage
**Qué mostrar:**
- DevTools → Application → Cache Storage
- Despliega el cache
- Muestra los 42 recursos cacheados
- Lista de archivos visible

**Cómo capturar:**
```
1. En DevTools, click en "Cache Storage"
2. Despliega "workbox-precache-v2" o similar
3. Scroll para mostrar varios archivos
4. Captura mostrando la lista
```
- Guardar como: `06-desktop-devtools-cache.png`

### 7. Prueba Offline
**Qué mostrar:**
- DevTools → Network → Checkbox "Offline" marcado
- Página funcionando normalmente
- Indicador de offline visible

**Cómo capturar:**
```
1. Abre DevTools → Network tab
2. Marca checkbox "Offline"
3. Recarga la página (F5)
4. Captura mostrando que funciona
```
- Guardar como: `07-desktop-prueba-offline.png`

---

## 📱 MOBILE - Android (6 capturas)

### 8. Navegador Mobile - Antes de Instalar
**Qué mostrar:**
- Chrome mobile abierto
- URL: https://pwa-jofm.netlify.app
- Banner de instalación (si aparece)

**Cómo capturar:**
- Android: `Botón Power + Volumen Abajo`
- Guardar como: `08-mobile-navegador-antes.png`

### 9. Banner/Menú de Instalación
**Qué mostrar:**
- Banner de "Agregar a pantalla de inicio"
- O menú (⋮) con opción visible

**Cómo capturar:**
- Si hay banner: captura con el banner visible
- Si no: abre menú y captura
- Guardar como: `09-mobile-banner-instalacion.png`

### 10. Diálogo "Agregar a Inicio"
**Qué mostrar:**
- Pop-up de confirmación
- Icono del pirata
- Nombre "PWA-JOFM"
- Botón "Agregar"

**Cómo capturar:**
- Después de seleccionar "Agregar a inicio"
- Captura el diálogo completo
- Guardar como: `10-mobile-dialogo-agregar.png`

### 11. Icono en Home Screen
**Qué mostrar:**
- Pantalla de inicio del teléfono
- Icono de la PWA visible con el pirata
- Nombre debajo del icono

**Cómo capturar:**
- Ve a tu pantalla de inicio
- Localiza el icono de la app
- Captura mostrando el icono
- Guardar como: `11-mobile-homescreen-icono.png`

### 12. Splash Screen
**Qué mostrar:**
- Pantalla de carga al abrir la app
- Logo del pirata
- Nombre de la app
- Animación de carga

**Cómo capturar:**
- Cierra la app completamente
- Ábrela tocando el icono
- Captura rápidamente el splash screen
- (Puede requerir varios intentos)
- Guardar como: `12-mobile-splash-screen.png`

### 13. App Fullscreen
**Qué mostrar:**
- App abierta en pantalla completa
- Sin barra de Chrome
- Contenido completo visible
- Navegación de la app

**Cómo capturar:**
- Con la app abierta
- Captura normal
- Guardar como: `13-mobile-app-fullscreen.png`

---

## 🍎 iOS - Safari (OPCIONAL - 4 capturas)

### 14. Safari iOS - Antes de Instalar
**Qué mostrar:**
- Safari abierto
- URL visible
- Botón compartir resaltado

**Cómo capturar:**
- iPhone: `Botón Lateral + Volumen Arriba`
- iPad: `Botón Superior + Volumen Arriba`
- Guardar como: `14-ios-safari-antes.png`

### 15. Menú Compartir
**Qué mostrar:**
- Menú de compartir abierto
- Opción "Agregar a inicio" visible

**Cómo capturar:**
- Toca botón compartir (□↑)
- Captura el menú completo
- Guardar como: `15-ios-menu-compartir.png`

### 16. Diálogo Agregar a Inicio
**Qué mostrar:**
- Formulario para agregar
- Icono del pirata
- Campo de nombre editable
- Botón "Agregar"

**Cómo capturar:**
- Después de seleccionar "Agregar a inicio"
- Captura el formulario
- Guardar como: `16-ios-dialogo-agregar.png`

### 17. App en iOS Home Screen
**Qué mostrar:**
- Pantalla de inicio iOS
- Icono de la PWA
- Entre otras apps

**Cómo capturar:**
- Ve a la pantalla de inicio
- Captura mostrando el icono
- Guardar como: `17-ios-homescreen-icono.png`

---

## 🔧 LIGHTHOUSE AUDIT (3 capturas)

### 18. Lighthouse - Iniciar Audit
**Qué mostrar:**
- DevTools → Lighthouse tab
- Opciones de auditoría seleccionadas
- Botón "Analyze page load"

**Cómo capturar:**
```
1. Abre DevTools (F12)
2. Click en pestaña "Lighthouse"
3. Selecciona categorías (Performance, PWA, etc.)
4. Captura antes de generar reporte
```
- Guardar como: `18-lighthouse-inicio.png`

### 19. Lighthouse - Resultados PWA
**Qué mostrar:**
- Score: 100/100 PWA
- Checks verdes completos
- "Fast and reliable"
- "Installable"
- "PWA optimized"

**Cómo capturar:**
- Después de generar el reporte
- Scroll a la sección PWA
- Captura los resultados completos
- Guardar como: `19-lighthouse-pwa-score.png`

### 20. Lighthouse - Detalles Completos
**Qué mostrar:**
- Performance score
- Accessibility score
- Best Practices score
- SEO score
- Todos los scores visibles

**Cómo capturar:**
- Vista general del reporte
- Captura mostrando todos los scores
- Guardar como: `20-lighthouse-all-scores.png`

---

## 📊 CAPTURAS ADICIONALES (Opcionales pero recomendadas)

### 21. Responsive Design - Mobile View
**Qué mostrar:**
- DevTools → Toggle device toolbar
- Vista mobile (375x667)
- Diseño responsive funcionando

**Cómo capturar:**
```
1. DevTools → Ctrl+Shift+M (toggle device)
2. Selecciona iPhone SE o similar
3. Captura mostrando diseño mobile
```
- Guardar como: `21-responsive-mobile.png`

### 22. Responsive Design - Tablet View
**Qué mostrar:**
- Vista tablet (768x1024)
- Diseño adaptado

**Cómo capturar:**
- Selecciona iPad en DevTools
- Captura el diseño
- Guardar como: `22-responsive-tablet.png`

### 23. Responsive Design - Desktop View
**Qué mostrar:**
- Vista desktop (1920x1080)
- Diseño completo

**Cómo capturar:**
- Vista normal de escritorio
- Captura ventana completa
- Guardar como: `23-responsive-desktop.png`

### 24. App con Iconos Personalizados
**Qué mostrar:**
- Close-up del icono del pirata
- En múltiples lugares:
  - Favicon en pestaña
  - App instalada
  - Manifest en DevTools

**Cómo capturar:**
- Collage o captura múltiple
- Guardar como: `24-iconos-personalizados.png`

---

## 📁 Organización de Capturas

### Estructura de carpeta recomendada:

```
documentacion/
├── capturas/
│   ├── desktop/
│   │   ├── 01-desktop-navegador-antes.png
│   │   ├── 02-desktop-dialogo-instalacion.png
│   │   ├── 03-desktop-app-standalone.png
│   │   ├── 04-desktop-devtools-manifest.png
│   │   ├── 05-desktop-devtools-sw.png
│   │   ├── 06-desktop-devtools-cache.png
│   │   └── 07-desktop-prueba-offline.png
│   │
│   ├── mobile/
│   │   ├── 08-mobile-navegador-antes.png
│   │   ├── 09-mobile-banner-instalacion.png
│   │   ├── 10-mobile-dialogo-agregar.png
│   │   ├── 11-mobile-homescreen-icono.png
│   │   ├── 12-mobile-splash-screen.png
│   │   └── 13-mobile-app-fullscreen.png
│   │
│   ├── lighthouse/
│   │   ├── 18-lighthouse-inicio.png
│   │   ├── 19-lighthouse-pwa-score.png
│   │   └── 20-lighthouse-all-scores.png
│   │
│   └── responsive/
│       ├── 21-responsive-mobile.png
│       ├── 22-responsive-tablet.png
│       └── 23-responsive-desktop.png
│
└── GUIA_CAPTURAS.md (este archivo)
```

---

## ✅ Checklist de Capturas

### Mínimo Requerido (11 capturas):
- [ ] 01-07: Desktop (7 capturas)
- [ ] 08-13: Mobile (6 capturas) **O** 14-17: iOS (4 capturas)
- [ ] 19-20: Lighthouse PWA (2 capturas)

### Recomendado (20+ capturas):
- [ ] Todo lo de arriba
- [ ] 18: Lighthouse inicio
- [ ] 21-23: Responsive design
- [ ] 24: Iconos personalizados

---

## 🎨 Consejos para Mejores Capturas

### Calidad de Imagen:
- ✅ Usa formato PNG (no JPG) para capturas de interfaz
- ✅ Resolución mínima: 1280x720 para desktop
- ✅ Para mobile: resolución nativa del dispositivo
- ✅ No redimensiones después de capturar

### Contenido:
- ✅ Asegúrate de que el texto sea legible
- ✅ Captura toda la información relevante
- ✅ Evita información personal (marcas de agua, datos privados)
- ✅ Muestra URL completa cuando sea relevante

### Anotaciones (Opcional):
Puedes usar una herramienta como:
- Windows: **Snip & Sketch** (flechas y resaltado)
- Mac: **Preview** (herramientas de anotación)
- Multiplataforma: **ShareX**, **Greenshot**

Para agregar:
- Flechas señalando características importantes
- Cajas rojas resaltando elementos clave
- Números de paso si es un tutorial

---

## 🖼️ Formatos de Exportación

### Para PDF:
- PNG o JPG de alta calidad
- Resolución: 300 DPI (para impresión)
- Tamaño máximo: 2MB por imagen

### Para Presentación:
- PNG transparente cuando sea posible
- Resolución: 1920x1080 o 1280x720
- Optimizadas para pantalla

---

## 📝 Descripción de Capturas para PDF

Para cada captura en tu PDF, incluye:

```markdown
### [Número]. [Título Descriptivo]

**Plataforma:** [Desktop/Mobile/iOS]
**Navegador:** [Chrome/Safari/Edge]

**Descripción:**
[Explica qué muestra la imagen y por qué es importante]

**Elementos clave:**
- ✅ [Elemento 1]
- ✅ [Elemento 2]
- ✅ [Elemento 3]

![Captura](ruta/a/imagen.png)
```

---

## 🚀 Herramientas Recomendadas

### Captura de Pantalla:
- **Windows:** Snipping Tool, Snip & Sketch, ShareX
- **Mac:** Cmd+Shift+4, CleanShot X
- **Chrome:** Extensión "Full Page Screen Capture"
- **Mobile:** Captura nativa del sistema

### Edición:
- **Básica:** Paint, Preview (Mac)
- **Avanzada:** GIMP, Photoshop, Figma
- **Anotación:** Snagit, ShareX, Skitch

### Optimización:
- **TinyPNG:** Compresión sin pérdida
- **ImageOptim:** Optimizador para Mac
- **Squoosh:** Web, by Google

---

**Última actualización:** 1 de octubre de 2025

---

¡Con esta guía tendrás todas las capturas necesarias para una documentación completa! 📸✨
