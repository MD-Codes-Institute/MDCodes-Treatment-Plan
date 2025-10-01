import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLoading,
  IonImg,
} from "@ionic/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Melhor nome para 'resp'
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const doSignIn = async () => {
    setErrorMessage(""); // Limpa mensagens de erro anteriores

    console.log("SignIn.tsx: 👉 doSignIn chamado para:", email);

    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      window.location.href = "/tabs";
    } catch (err: any) {
      console.error(
        "SignIn.tsx: ❌ signIn error:",
        err?.code,
        err?.message,
        err
      );
      const code = err?.code || "unknown";
      if (code === "auth/invalid-credential")
        setErrorMessage("Credencial inválida. Verifique e-mail e senha.");
      else if (code === "auth/user-not-found")
        setErrorMessage("Usuário não encontrado.");
      else if (code === "auth/wrong-password")
        setErrorMessage("Senha incorreta.");
      else if (code === "auth/network-request-failed")
        setErrorMessage("Erro de rede. Verifique sua conexão.");
      else setErrorMessage(`Erro (${code}): ${err?.message ?? "desconhecido"}`);
    } finally {
      setLoading(false); // Desativa o spinner, sucesso ou falha
      console.log("SignIn.tsx: Login finalizado.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonImg
            className="logo-header"
            src="/resources/MdCodes_White.png"
            alt="Logo"
          ></IonImg>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding container">
        <div className="container container-inputs">
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input"
            autoCapitalize="none"
            autoCorrect="off"
            inputMode="email"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="custom-input"
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <IonButton
            expand="block"
            onClick={doSignIn}
            disabled={loading || !email || !password}
            className="button-login"
          >
            {loading ? "logging in..." : "Login"}
          </IonButton>
    
          <Link
            to="/signup"
            className="link-register"
            style={{ display: "block", marginTop: 12, textAlign: "center" }}
          >
            Click here to register
          </Link>
        </div>

        {/* IonLoading para feedback visual durante o login */}
        <IonLoading isOpen={loading} message={"logging in..."} duration={0} />
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
