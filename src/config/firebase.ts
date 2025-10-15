// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBKGqXjq0VgkaX6Y2qx5ObiuW6-pguGVc",
  authDomain: "pwa-jofm.firebaseapp.com",
  projectId: "pwa-jofm",
  storageBucket: "pwa-jofm.firebasestorage.app",
  messagingSenderId: "1057573351015",
  appId: "1:1057573351015:web:334f4d38c4304ded16eec2",
  measurementId: "G-YE27K9L85E"
};

// VAPID Key (Web Push certificate)
export const VAPID_KEY = "BNzePn1InD2ucfHIBzmVkNT2yjfDn_zBRzaOBY_VxMXZFV_JUXmwfrueX9HnGNt4aNKHOOXriFuB7vyHuerYPds";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
let messaging: any = null;

// Solo inicializar messaging si estamos en un navegador que lo soporta
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.error("Error initializing Firebase Messaging:", error);
  }
}

export { messaging, getToken, onMessage };
