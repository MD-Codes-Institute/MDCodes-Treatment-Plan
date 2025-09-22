import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState("");
  const [loading, setLoading] = useState(false);

  // Se já tiver sessão, redireciona ao abrir a tela
  useEffect(() => {
    (async () => {
      // @ts-ignore
      if (typeof auth.authStateReady === "function") {
        try { await auth.authStateReady(); } catch {}
      }``
      if (auth.currentUser) {
        history.replace("/tabs/tab1");
      }
    })();
  }, [history]);

  // validação: 6+ chars, 1 minúscula, 1 maiúscula, 1 caractere especial
  function isPasswordValid(pwd: string) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/.test(pwd);
  }

  const doSignUp = async () => {
    if (loading) return;
    setResp("");
    if (!isPasswordValid(password)) {
      setResp("Password must be 6+ chars with at least 1 uppercase, 1 lowercase and 1 special character.");
      return;
    }
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log("Account created:", cred.user.uid);

      try {
        const t = await cred.user.getIdToken();
        console.log("Token length:", t.length);
      } catch (e) {
        console.warn("getIdToken failed (ok em dev):", e);
      }

      history.replace("/tabs/tab1");
    } catch (error: any) {
      console.error("Firebase sign-up error:", error);
      const code = error?.code || "unknown";
      if (code === "auth/email-already-in-use") setResp("E-mail already in use.");
      else if (code === "auth/invalid-email") setResp("Invalid e-mail.");
      else if (code === "auth/weak-password") setResp("Weak password.");
      else if (code === "auth/network-request-failed") setResp("Network error. Confira conexão/ATS/App Check/API key.");
      else setResp(`Error creating account (${code}): ${error?.message ?? "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      doSignUp();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastro</IonTitle>
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
            onClick={doSignUp}
            disabled={loading || !email || !password}
          >
            {loading ? "Creating..." : "Register"}
          </button>

          <Link to="/signin" className="link-signin">Click here to login</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
