import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    (async () => {
      // @ts-ignore (em versões novas existe auth.authStateReady)
      if (typeof auth.authStateReady === "function") {
        try { await auth.authStateReady(); } catch {}
      }
      if (auth.currentUser) {
        console.log("Already logged:", auth.currentUser.uid);
        history.replace("/tabs/tab1");
      }
    })();
  }, [history]);

  const doSignIn = async () => {
    if (loading) return;
    setResp("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      console.log("Signed in:", cred.user.uid);

      // força a troca de token (STS). Se isso falhar, loga o erro mas segue a navegação.
      try {
        const t = await cred.user.getIdToken();
        console.log("Token length:", t.length);
      } catch (e) {
        console.warn("getIdToken failed (ok em dev):", e);
      }

      // navega imediatamente (sem esperar observer)
      history.replace("/tabs/tab1");
    } catch (error: any) {
      console.error("Firebase sign-in error:", error);
      const code = error?.code || "unknown";
      if (code === "auth/invalid-credential") setResp("User not created or found.");
      else if (code === "auth/user-not-found") setResp("User not found.");
      else if (code === "auth/wrong-password") setResp("Incorrect password.");
      else if (code === "auth/network-request-failed") setResp("Network error. Confira conexão/ATS/App Check/API key.");
      else setResp(`Login failed (${code}): ${error?.message ?? "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doSignIn();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding container">
        <div className="container">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="exemplo@email.com"
            required
            className="custom-input"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="email"
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="********"
            required
            className="custom-input"
          />

          <p>{resp}</p>

          <button
            type="button"
            className="button-login"
            onClick={doSignIn}
            disabled={loading || !email || !password}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <Link to="/signup" className="link-register">Click here to register</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
