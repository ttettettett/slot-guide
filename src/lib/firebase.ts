import type { FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getApp, getApps, initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseEnvConfig = {
  NEXT_PUBLIC_FB_API_KEY: process.env.NEXT_PUBLIC_FB_API_KEY,
  NEXT_PUBLIC_FB_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  NEXT_PUBLIC_FB_PROJECT_ID: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  NEXT_PUBLIC_FB_APP_ID: process.env.NEXT_PUBLIC_FB_APP_ID
} as const;

const firebaseOptions: FirebaseOptions = {
  apiKey: firebaseEnvConfig.NEXT_PUBLIC_FB_API_KEY ?? '',
  authDomain: firebaseEnvConfig.NEXT_PUBLIC_FB_AUTH_DOMAIN ?? '',
  projectId: firebaseEnvConfig.NEXT_PUBLIC_FB_PROJECT_ID ?? '',
  appId: firebaseEnvConfig.NEXT_PUBLIC_FB_APP_ID ?? ''
};

const missingKeys = Object.entries(firebaseEnvConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key);

export const firebaseConfigStatus = {
  isConfigComplete: missingKeys.length === 0,
  missingKeys
};

const shouldUseEmulators = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS === 'true';
const isBrowser = typeof window !== 'undefined';

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;
const googleAuthProvider = new GoogleAuthProvider();

const getOrInitializeApp = (): FirebaseApp | null => {
  if (!firebaseConfigStatus.isConfigComplete) {
    return null;
  }
  if (firebaseApp) {
    return firebaseApp;
  }
  firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseOptions);
  return firebaseApp;
};

export const getFirebaseAuth = (): Auth | null => {
  const app = getOrInitializeApp();
  if (!app) {
    return null;
  }
  if (!firebaseAuth) {
    firebaseAuth = getAuth(app);
    if (shouldUseEmulators && isBrowser) {
      connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099', { disableWarnings: true });
    }
  }
  return firebaseAuth;
};

export const getFirestoreDb = (): Firestore | null => {
  const app = getOrInitializeApp();
  if (!app) {
    return null;
  }
  if (!firebaseDb) {
    firebaseDb = getFirestore(app);
    if (shouldUseEmulators && isBrowser) {
      connectFirestoreEmulator(firebaseDb, '127.0.0.1', 8080);
    }
  }
  return firebaseDb;
};

export const getGoogleAuthProvider = () => googleAuthProvider;
