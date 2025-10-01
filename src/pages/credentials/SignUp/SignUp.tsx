import {
  IonContent,
  IonHeader,
  IonPage,
  IonImg,
  IonToolbar,
  IonButton,
  IonLoading, // Importar IonLoading
} from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom"; // Não precisamos mais de 'useHistory' aqui
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { getApp } from "firebase/app";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Melhor nome para 'resp'
  const [loading, setLoading] = useState(false);

  const isPasswordValid = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/.test(pwd);

  const doSignUp = async () => {
    setErrorMessage("");
    if (!isPasswordValid(password)) {
      setErrorMessage(
        "Password must be 6+ characters long, with uppercase, lowercase, and special characters."
      );
      return;
    }
    setLoading(true);

    console.log("SignUp.tsx: 👉 doSignUp chamado para:", email);

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      window.location.href = "/tabs";
    } catch (err: any) {
      console.error(
        "SignUp.tsx: ❌ signUp error:",
        err?.code,
        err?.message,
        err
      );
      const code = err?.code || "unknown";
      if (code === "auth/email-already-in-use")
        setErrorMessage("E-mail already in use.");
      else if (code === "auth/invalid-email")
        setErrorMessage("Invalid e-mail.");
      else if (code === "auth/weak-password")
        setErrorMessage("Password is too weak.");
      else if (code === "auth/network-request-failed")
        setErrorMessage("Network error. Please check your connection.");
      else setErrorMessage(`Error (${code}): ${err?.message ?? "unknown"}`);
    } finally {
      setLoading(false);
      console.log("SignUp.tsx: Registration completed.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonImg className='logo-header' src='/resources/MdCodes_White.png' alt='Logo'></IonImg>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding container">
        <div className="container-inputs">
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
            onClick={doSignUp}
            disabled={loading || !email || !password}
            className="button-login"
          >
            {loading ? "Criando..." : "Registrar"}
          </IonButton>

          <Link
            to="/signin"
            className="link-register"
            style={{ display: "block", marginTop: 12 }}
          >
            Click here to login
          </Link>
        </div>

        {/* IonLoading para feedback visual durante o cadastro */}
        <IonLoading isOpen={loading} message={"Register..."} duration={0} />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
