import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./firebaseConfig"; // Certifique-se de inicializar o Firebase
// ✅ Ionic CSS global
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import "./App.css";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        removeDelay: 700,
        style: {
          background: "#363636",
          color: "#fff",
          minWidth: "250px",
          fontSize: "12px",
          marginTop: "40px"
        },
      }}
    />
  </React.StrictMode>
);
