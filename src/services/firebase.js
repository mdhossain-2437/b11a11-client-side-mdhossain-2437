import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Firebase web config — apiKey + the rest are public by design.
// Security is enforced via Auth Domain allowlist + Firestore/Storage rules,
// not by hiding the keys. Env vars take precedence so you can override per
// environment, with safe fallbacks so the build works out of the box.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBlEn89p3Q4umW_JBbg3xPhW5NnfYLHnT4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'car-rental-system-2437.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'car-rental-system-2437',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'car-rental-system-2437.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1051516074376',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1051516074376:web:c76f09f7c49b971cd4623d',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-XRF45FDT37',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
