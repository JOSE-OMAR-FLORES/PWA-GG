# 🔔 Guía de Notificaciones Push con Firebase Cloud Messaging

## 📋 Resumen Ejecutivo

Esta guía documenta la implementación completa de notificaciones push en la PWA utilizando Firebase Cloud Messaging (FCM). El sistema permite enviar y recibir notificaciones tanto cuando la aplicación está abierta como cerrada.

---

## 🎯 Funcionalidades Implementadas

✅ **Registro del Service Worker** para manejar eventos push  
✅ **Solicitud de permisos** al usuario para recibir notificaciones  
✅ **Generación de token FCM** usando la Push API  
✅ **Recepción de notificaciones** en primer plano y segundo plano  
✅ **Interfaz visual** para gestionar notificaciones  
✅ **Notificaciones de prueba locales**  

---

## 🗂️ Archivos Creados

### 1. **`src/config/firebase.ts`**
- Configuración de Firebase
- Inicialización de Firebase Cloud Messaging
- Exportación de funciones de FCM

### 2. **`public/firebase-messaging-sw.js`**
- Service Worker específico para Firebase
- Manejo de notificaciones en segundo plano
- Eventos de click en notificaciones

### 3. **`src/hooks/usePushNotifications.ts`**
- Hook personalizado para manejar notificaciones
- Solicitud de permisos
- Obtención de token FCM
- Envío de notificaciones de prueba

### 4. **`src/components/PushNotifications.tsx`**
- Componente visual para gestionar notificaciones
- Mostrar estado de permisos
- Copiar token FCM
- Instrucciones de uso

### 5. **`src/components/PushNotifications.css`**
- Estilos del componente de notificaciones
- Diseño responsive y moderno

---

## 🚀 Cómo Probar las Notificaciones

### Paso 1: Iniciar la aplicación

```bash
npm run dev
```

### Paso 2: Abrir la aplicación en el navegador

Navega a: `http://localhost:5173`

### Paso 3: Solicitar permisos

1. Busca la sección **"🔔 Notificaciones Push"** en la página principal
2. Haz clic en el botón **"🔔 Solicitar Permiso"**
3. En el popup del navegador, haz clic en **"Permitir"**

### Paso 4: Obtener el token FCM

1. Una vez concedido el permiso, haz clic en **"👁️ Ver Token FCM"**
2. Haz clic en **"📋 Copiar"** para copiar el token al portapapeles
3. **Guarda este token**, lo necesitarás para enviar notificaciones desde Firebase

### Paso 5A: Enviar notificación local (PRUEBA RÁPIDA)

1. Haz clic en el botón **"🚀 Enviar Notificación Local"**
2. Verás una notificación inmediatamente
3. ✅ **Captura de pantalla**: Toma una foto de la notificación

### Paso 5B: Enviar notificación desde Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto **"pwa-jofm"**
3. En el menú lateral, ve a **"Engagement"** → **"Cloud Messaging"**
4. Haz clic en **"Send your first message"** (o "Create campaign")
5. En **"Notification title"**, escribe: `Prueba desde Firebase`
6. En **"Notification text"**, escribe: `Esta notificación se envió desde Firebase Console`
7. Haz clic en **"Send test message"**
8. Pega tu **token FCM** en el campo
9. Haz clic en el botón **"+"** (agregar)
10. Haz clic en **"Test"**
11. ✅ **Captura de pantalla**: Toma una foto de la notificación recibida

---

## 📸 Evidencias a Capturar

### 1. Permiso solicitado
- Captura del popup del navegador pidiendo permiso

### 2. Token FCM generado
- Captura de la sección mostrando el token FCM

### 3. Notificación local
- Captura de la notificación enviada con el botón local

### 4. Notificación desde Firebase
- Captura de la notificación enviada desde Firebase Console

### 5. Estado del servicio
- Captura mostrando "Estado del permiso: Concedido ✅"

---

## 🔧 Configuración de Firebase

### Proyecto Firebase
- **Nombre**: pwa-jofm
- **Project ID**: pwa-jofm
- **Auth Domain**: pwa-jofm.firebaseapp.com

### VAPID Key
```
BNzePn1InD2ucfHIBzmVkNT2yjfDn_zBRzaOBY_VxMXZFV_JUXmwfrueX9HnGNt4aNKHOOXriFuB7vyHuerYPds
```

---

## 🧪 Escenarios de Prueba

### ✅ Notificación con app en primer plano
1. Mantén la aplicación abierta
2. Envía una notificación desde Firebase Console
3. Deberías ver la notificación aparecer

### ✅ Notificación con app en segundo plano
1. Minimiza el navegador o cambia a otra pestaña
2. Envía una notificación desde Firebase Console
3. Deberías ver la notificación del sistema operativo

### ✅ Notificación con app cerrada
1. Cierra completamente el navegador
2. Envía una notificación desde Firebase Console
3. Deberías ver la notificación del sistema operativo

### ✅ Click en notificación
1. Cierra o minimiza la aplicación
2. Envía una notificación
3. Haz click en la notificación
4. La aplicación debería abrirse/enfocarse

---

## 🎨 Personalización de Notificaciones

Las notificaciones incluyen:
- **Título**: Personalizable
- **Cuerpo**: Mensaje de la notificación
- **Icono**: `/icons/icon-192x192.png`
- **Badge**: `/icons/icon-96x96.png`
- **Vibración**: Patrón personalizado `[200, 100, 200]`
- **Sonido**: Sonido por defecto del sistema

---

## 🐛 Solución de Problemas

### El token no se genera
- Verifica que hayas aceptado los permisos
- Revisa la consola del navegador por errores
- Asegúrate de estar usando HTTPS o localhost

### Las notificaciones no llegan
- Verifica que el token sea correcto
- Comprueba que Firebase esté configurado correctamente
- Revisa los permisos del navegador

### Service Worker no se registra
- Abre DevTools → Application → Service Workers
- Verifica que `firebase-messaging-sw.js` esté registrado
- Haz clic en "Update" o "Unregister" y recarga

---

## 📱 Compatibilidad de Navegadores

| Navegador | Compatibilidad |
|-----------|----------------|
| Chrome    | ✅ Completa    |
| Firefox   | ✅ Completa    |
| Edge      | ✅ Completa    |
| Safari    | ⚠️ Parcial     |
| Opera     | ✅ Completa    |

**Nota**: Safari en iOS tiene soporte limitado de notificaciones push web.

---

## 🔐 Seguridad

- Las claves VAPID son públicas y están en el código cliente
- Las credenciales sensibles están protegidas en Firebase
- Solo los dominios autorizados pueden recibir notificaciones
- El token FCM se regenera si se revocan los permisos

---

## 📚 Recursos Adicionales

- [Firebase Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging)
- [Push API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)

---

## ✅ Checklist de Implementación

- [x] Instalación de Firebase SDK
- [x] Configuración de Firebase en el proyecto
- [x] Creación del Service Worker de Firebase
- [x] Implementación del hook de notificaciones
- [x] Creación del componente visual
- [x] Solicitud de permisos
- [x] Generación de token FCM
- [x] Recepción de notificaciones en primer plano
- [x] Recepción de notificaciones en segundo plano
- [x] Manejo de click en notificaciones
- [x] Notificaciones de prueba locales

---

## 🎉 ¡Todo Listo!

Tu PWA ahora tiene un sistema completo de notificaciones push con Firebase Cloud Messaging. Puedes enviar notificaciones desde la consola de Firebase, desde un backend personalizado, o programáticamente desde tu aplicación.

**¡Felicidades! 🚀**
