# 📱 Guía de Instalación - PWA JOFM

## Índice
1. [Instalación en Desktop (Windows/Mac/Linux)](#instalación-desktop)
2. [Instalación en Android](#instalación-android)
3. [Instalación en iOS](#instalación-ios)
4. [Verificación de Instalación](#verificación)
5. [Uso Offline](#uso-offline)

---

## 🖥️ Instalación Desktop

### Chrome / Edge (Windows, Mac, Linux)

#### Paso 1: Abrir la aplicación
1. Abre tu navegador Chrome o Edge
2. Navega a: **https://pwa-jofm.netlify.app**
3. Espera a que la página cargue completamente

#### Paso 2: Buscar el icono de instalación
- **Opción A:** Busca el icono ➕ o 📱 en la barra de direcciones (lado derecho)
- **Opción B:** Abre el menú (⋮) → "Instalar Mi Aplicación PWA - JOFM"

#### Paso 3: Confirmar instalación
1. Haz clic en "Instalar" en el diálogo que aparece
2. La app se instalará y abrirá en una ventana nueva
3. Puedes encontrarla en:
   - Windows: Menú Inicio → Apps instaladas
   - Mac: Aplicaciones
   - Linux: Menú de aplicaciones

#### Características de la app instalada:
- ✅ Ventana standalone (sin barra de navegador)
- ✅ Icono en el escritorio/dock
- ✅ Se inicia como una aplicación nativa
- ✅ Funciona sin internet

---

## 📱 Instalación Android

### Chrome Mobile

#### Paso 1: Visitar la PWA
1. Abre Chrome en tu dispositivo Android
2. Ve a: **https://pwa-jofm.netlify.app**

#### Paso 2: Banner de instalación
Verás uno de estos dos métodos:

**Método A - Banner automático:**
- Aparece un banner en la parte inferior: "Agregar Mi Aplicación PWA - JOFM a la pantalla de inicio"
- Toca "Agregar"

**Método B - Menú manual:**
1. Toca el menú (⋮) en la esquina superior derecha
2. Selecciona "Agregar a pantalla de inicio"
3. Edita el nombre si deseas (opcional)
4. Toca "Agregar"

#### Paso 3: Uso
- El icono aparecerá en tu pantalla de inicio
- Tócalo para abrir la app
- Se abrirá en pantalla completa sin navegador

### Características en Android:
- ✅ Icono del pirata en el launcher
- ✅ Splash screen al abrir
- ✅ Modo fullscreen
- ✅ Funciona offline completamente
- ✅ Se integra con el sistema (puede estar en el cajón de apps)

---

## 🍎 Instalación iOS

### Safari (iPhone/iPad)

#### Paso 1: Abrir Safari
1. Abre **Safari** (debe ser Safari, no Chrome)
2. Navega a: **https://pwa-jofm.netlify.app**
3. Espera a que cargue completamente

#### Paso 2: Compartir
1. Toca el botón "Compartir" (□↑) en la barra inferior
2. Aparecerá el menú de compartir

#### Paso 3: Agregar a inicio
1. Desplázate hacia abajo en el menú
2. Encuentra y toca "Agregar a inicio" o "Add to Home Screen"
3. Edita el nombre si deseas
4. Toca "Agregar" en la esquina superior derecha

#### Paso 4: Uso
- El icono aparecerá en tu pantalla de inicio
- Tócalo para abrir
- Se abrirá como una app nativa

### Características en iOS:
- ✅ Icono personalizado
- ✅ Sin barra de Safari
- ✅ Orientación portrait
- ✅ Integración con iOS
- ⚠️ Funcionalidad offline limitada por Safari (mejorando en iOS 16+)

---

## ✅ Verificación de Instalación

### Cómo verificar que está instalada correctamente:

#### Desktop (Chrome DevTools)
1. Abre la app instalada
2. Presiona `F12` o `Ctrl+Shift+I` (Windows/Linux) o `Cmd+Option+I` (Mac)
3. Ve a la pestaña **Application**
4. Verifica:
   - ✅ **Manifest:** Debe mostrar todos los datos
   - ✅ **Service Workers:** Debe estar "activated and running"
   - ✅ **Cache Storage:** Debe mostrar recursos cacheados

#### Mobile
1. Abre la app instalada
2. Verifica que:
   - ✅ Se abre en pantalla completa (sin navegador)
   - ✅ Tiene el icono del pirata
   - ✅ El título es "PWA-JOFM" o "Mi Aplicación PWA - JOFM"
   - ✅ Funciona sin desactivar el WiFi

---

## 🔌 Uso Offline

### Cómo probar la funcionalidad offline:

#### Desktop
1. Abre la app instalada
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Network**
4. Marca la casilla "Offline" en la parte superior
5. Recarga la página (`F5`)
6. ✅ La app debe cargar normalmente

**Alternativa sin DevTools:**
1. Desconecta tu WiFi / cable de red
2. Abre la app instalada
3. ✅ Debe funcionar completamente

#### Mobile
1. Abre la app
2. Activa el modo avión
3. Cierra y vuelve a abrir la app
4. ✅ Debe cargar sin problemas

### Lo que funciona offline:
- ✅ Navegación entre secciones
- ✅ Interfaz completa (App Shell)
- ✅ Todos los estilos y diseño
- ✅ Iconos e imágenes cacheadas
- ✅ Animaciones y transiciones
- ⚠️ API calls o datos dinámicos (requieren conexión)

---

## 🛠️ Solución de Problemas

### El botón de instalación no aparece

**Causas posibles:**
- La PWA ya está instalada
- El navegador no soporta PWA
- No estás usando HTTPS
- El manifest.json no es válido

**Soluciones:**
1. Verifica que usas Chrome/Edge/Safari actualizado
2. Revisa que la URL sea https://
3. Intenta abrir en modo incógnito
4. Limpia cache y recarga

### La app no funciona offline

**Soluciones:**
1. Visita la app con internet primero
2. Espera a que el Service Worker se active
3. Verifica en DevTools → Application → Service Workers
4. Desinstala y reinstala la app

### El icono no se muestra correctamente

**Soluciones:**
1. Desinstala la app
2. Limpia cache del navegador
3. Reinstala desde https://pwa-jofm.netlify.app
4. Los iconos se deberían actualizar automáticamente

### En iOS no funciona offline

**Nota:** Safari tiene limitaciones con PWA:
- Cache limitado (50MB)
- Service Worker con restricciones
- Mejora en iOS 16+

**Recomendaciones:**
- Usa la versión más reciente de iOS
- Abre la app regularmente para refrescar cache
- Ten en cuenta las limitaciones de Safari

---

## 📊 Información Técnica

### Requisitos Mínimos

#### Desktop:
- **Chrome:** Versión 67+
- **Edge:** Versión 79+
- **Firefox:** Versión 44+ (soporte limitado)
- **Safari:** macOS 11.3+

#### Mobile:
- **Android:** Chrome 67+, Android 5.0+
- **iOS:** Safari 11.3+, iOS 11.3+
- **Samsung Internet:** 8.2+

### Tamaño de la Aplicación
- **Descarga inicial:** ~550 KB
- **Cache total:** 546.24 KB (42 recursos)
- **Con imágenes adicionales:** Variable

### Recursos Cacheados
```
Total: 42 archivos
├── HTML: 1 archivo
├── CSS: 1 archivo (~20 KB)
├── JavaScript: 3 archivos (~200 KB)
├── Iconos: 8 archivos (~300 KB)
├── Manifest: 1 archivo
└── Otros: 28 archivos
```

---

## 🎯 Checklist de Instalación Exitosa

Marca cada punto después de instalar:

- [ ] La app aparece en mi lista de aplicaciones
- [ ] Tiene el icono del pirata de Culiacán
- [ ] Se abre en ventana standalone (sin navegador)
- [ ] Funciona sin internet
- [ ] El diseño es responsive
- [ ] Los colores son negro y azul
- [ ] La navegación funciona correctamente
- [ ] Aparece el splash screen al abrir

Si todos los puntos están marcados, ¡tu instalación fue exitosa! 🎉

---

## 📞 Soporte

**Repositorio:** https://github.com/JOSE-OMAR-FLORES/PWA-GG  
**Issues:** https://github.com/JOSE-OMAR-FLORES/PWA-GG/issues  
**Autor:** José Omar Flores

---

**Última actualización:** 1 de octubre de 2025
