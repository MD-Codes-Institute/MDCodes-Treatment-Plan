// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  Auth,
  initializeAuth,
  indexedDBLocalPersistence,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_SENDERID,
  appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);

const db = getDatabase()
let auth: Auth;

try {
  auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence,
  });
} catch (error) {
  auth = getAuth(app);
}

export { auth, db };
