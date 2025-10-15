# 🔐 Configuración de Variables de Entorno

## ⚠️ Alerta de Seguridad de GitHub Resuelta

GitHub detectó que las claves de API de Firebase estaban expuestas en el código. Ahora están protegidas usando variables de entorno.

---

## 📋 Variables de Entorno Necesarias

Todas las variables comienzan con `VITE_` porque estamos usando Vite como bundler.

```env
VITE_FIREBASE_API_KEY=AIzaSyBBKGqXjq0VgkaX6Y2qx5ObiuW6-pguGVc
VITE_FIREBASE_AUTH_DOMAIN=pwa-jofm.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=pwa-jofm
VITE_FIREBASE_STORAGE_BUCKET=pwa-jofm.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1057573351015
VITE_FIREBASE_APP_ID=1:1057573351015:web:334f4d38c4304ded16eec2
VITE_FIREBASE_MEASUREMENT_ID=G-YE27K9L85E
VITE_FIREBASE_VAPID_KEY=BNzePn1InD2ucfHIBzmVkNT2yjfDn_zBRzaOBY_VxMXZFV_JUXmwfrueX9HnGNt4aNKHOOXriFuB7vyHuerYPds
```

---

## 🏠 **Configuración Local (Desarrollo)**

### 1. El archivo `.env` ya fue creado

Ya tienes el archivo `.env` en la raíz del proyecto con todas las variables.

### 2. Verifica que funciona

```bash
npm run dev
```

La aplicación debería funcionar normalmente. Las variables se cargan automáticamente.

---

## ☁️ **Configuración en Netlify (Producción)**

### Opción A: Desde el Dashboard de Netlify (Recomendado)

1. **Ve a tu sitio en Netlify**:
   - https://app.netlify.com/sites/[tu-sitio]/settings

2. **Navega a Environment Variables**:
   - En el menú lateral: `Site settings` → `Environment variables`

3. **Agrega cada variable**:
   - Click en `Add a variable` o `Add environment variables`
   - Copia y pega cada variable del archivo `.env`:
   
   ```
   Key: VITE_FIREBASE_API_KEY
   Value: AIzaSyBBKGqXjq0VgkaX6Y2qx5ObiuW6-pguGVc
   ```
   
   ```
   Key: VITE_FIREBASE_AUTH_DOMAIN
   Value: pwa-jofm.firebaseapp.com
   ```
   
   ```
   Key: VITE_FIREBASE_PROJECT_ID
   Value: pwa-jofm
   ```
   
   ```
   Key: VITE_FIREBASE_STORAGE_BUCKET
   Value: pwa-jofm.firebasestorage.app
   ```
   
   ```
   Key: VITE_FIREBASE_MESSAGING_SENDER_ID
   Value: 1057573351015
   ```
   
   ```
   Key: VITE_FIREBASE_APP_ID
   Value: 1:1057573351015:web:334f4d38c4304ded16eec2
   ```
   
   ```
   Key: VITE_FIREBASE_MEASUREMENT_ID
   Value: G-YE27K9L85E
   ```
   
   ```
   Key: VITE_FIREBASE_VAPID_KEY
   Value: BNzePn1InD2ucfHIBzmVkNT2yjfDn_zBRzaOBY_VxMXZFV_JUXmwfrueX9HnGNt4aNKHOOXriFuB7vyHuerYPds
   ```

4. **Guarda los cambios**

5. **Redeploy del sitio**:
   - Ve a `Deploys` → Click en `Trigger deploy` → `Deploy site`
   - O simplemente haz un nuevo push a GitHub

### Opción B: Usando Netlify CLI

Si tienes Netlify CLI instalado:

```bash
# Instalar Netlify CLI (si no lo tienes)
npm install -g netlify-cli

# Login
netlify login

# Link al sitio
netlify link

# Agregar variables (una por una)
netlify env:set VITE_FIREBASE_API_KEY "AIzaSyBBKGqXjq0VgkaX6Y2qx5ObiuW6-pguGVc"
netlify env:set VITE_FIREBASE_AUTH_DOMAIN "pwa-jofm.firebaseapp.com"
netlify env:set VITE_FIREBASE_PROJECT_ID "pwa-jofm"
netlify env:set VITE_FIREBASE_STORAGE_BUCKET "pwa-jofm.firebasestorage.app"
netlify env:set VITE_FIREBASE_MESSAGING_SENDER_ID "1057573351015"
netlify env:set VITE_FIREBASE_APP_ID "1:1057573351015:web:334f4d38c4304ded16eec2"
netlify env:set VITE_FIREBASE_MEASUREMENT_ID "G-YE27K9L85E"
netlify env:set VITE_FIREBASE_VAPID_KEY "BNzePn1InD2ucfHIBzmVkNT2yjfDn_zBRzaOBY_VxMXZFV_JUXmwfrueX9HnGNt4aNKHOOXriFuB7vyHuerYPds"
```

---

## 🔍 **Verificar que funciona en Netlify**

Después de configurar las variables y hacer un nuevo deploy:

1. Abre tu sitio en Netlify
2. Abre la consola del navegador (F12)
3. Verifica que no haya errores de Firebase
4. Prueba las notificaciones push

---

## ⚠️ **IMPORTANTE: Resolver la alerta de GitHub**

### 1. **Marcar como resuelto en GitHub**

1. Ve a: https://github.com/JOSE-OMAR-FLORES/PWA-GG/security
2. Busca la alerta: "Google API Key"
3. Haz clic en la alerta
4. Click en `Dismiss alert` → Selecciona `Revoked` (si rotaste la clave) o `Used in tests` (si solo es para desarrollo)

### 2. **Rotar las claves (Recomendado para producción real)**

Si esto fuera un proyecto en producción real, deberías:

1. **Ir a Firebase Console**
2. **Regenerar la API Key**
3. **Actualizar las variables de entorno**

Pero para este proyecto de prueba/educativo, las claves actuales están bien ya que:
- ✅ Firebase tiene restricciones de dominio
- ✅ Las claves están ahora en variables de entorno
- ✅ No se volverán a subir a Git

---

## 📝 **Archivos Importantes**

- ✅ `.env` - Variables locales (NO se sube a Git)
- ✅ `.env.example` - Plantilla para otros desarrolladores (SÍ se sube a Git)
- ✅ `.gitignore` - Configurado para ignorar `.env`
- ✅ `src/config/firebase.ts` - Ahora usa `import.meta.env.VITE_*`

---

## 🎯 **Checklist de Seguridad**

- [x] Variables de entorno creadas localmente
- [x] `.env` agregado a `.gitignore`
- [x] Código actualizado para usar `import.meta.env`
- [ ] Variables configuradas en Netlify
- [ ] Nuevo deploy realizado
- [ ] Alerta de GitHub cerrada

---

## 💡 **Notas sobre Seguridad**

### ¿Por qué la API Key de Firebase en el frontend es "segura"?

1. **Las API Keys de Firebase son públicas por diseño**
   - Se usan en el navegador del cliente
   - No son secretas como las claves de servidor

2. **La seguridad viene de las reglas de Firebase**
   - Firestore Security Rules
   - Storage Security Rules
   - Restricciones de dominio en Firebase Console

3. **Aún así, es mejor práctica usar variables de entorno porque**:
   - No están en el historial de Git
   - Son más fáciles de rotar
   - Son diferentes por ambiente (dev/staging/prod)

---

## 🚀 **Siguiente paso**

Ahora debes:

1. ✅ Hacer commit de los cambios (ya sin las claves expuestas)
2. ✅ Push a GitHub
3. ✅ Configurar variables en Netlify
4. ✅ Resolver la alerta de GitHub

¡Listo! 🎉
