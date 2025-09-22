import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  indexedDBLocalPersistence,
  browserPopupRedirectResolver,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCewh2jfhlFWUSjOl5ODPdg-xmFR9kVkeo",
  authDomain: "aprendendo-firabese.firebaseapp.com",
  projectId: "aprendendo-firabese",
  storageBucket: "aprendendo-firabese.firebasestorage.app",
  messagingSenderId: "773907117909",
  appId: "1:773907117909:web:ffded69e204df53a6b61dc"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver, // ok mesmo se usar só e-mail/senha
});