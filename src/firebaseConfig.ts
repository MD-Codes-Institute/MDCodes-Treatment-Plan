// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import {
  Auth, 
  initializeAuth,
  indexedDBLocalPersistence,
  getAuth
} from "firebase/auth";
import { Capacitor } from '@capacitor/core';

const firebaseConfig = {
  apiKey: "AIzaSyCewh2jfhlFWUSjOl5ODPdg-xmFR9kVkeo",
  authDomain: "aprendendo-firabese.firebaseapp.com",
  projectId: "aprendendo-firabese",
  storageBucket: "aprendendo-firabese.appspot.com",
  messagingSenderId: "773907117909",
  appId: "1:773907117909:web:ffded69e204df53a6b61dc"
};

const app = initializeApp(firebaseConfig);


let auth: Auth;

try {
  auth = initializeAuth(app, {
    persistence: indexedDBLocalPersistence
  });
} catch (error) {
  auth = getAuth(app);
}

export { auth };