import { auth } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  sendEmailVerification,
  deleteUser,
  signOut,
} from "firebase/auth";
import { useHistory } from "react-router";

function useAuth() {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // function que verifica se possui usuário e monitora
  useEffect(() => {
    let timeoutId = window.setTimeout(() => {
      setLoading(false);
    }, 6000);

    // function para verificar o estado do usuário para trabalhar com as rotas
    const unsub = onAuthStateChanged(
      auth,
      (u) => {
        setUser(u);
        setLoading(false);
        window.clearTimeout(timeoutId);
      },
      (err) => {
        console.log("onAuthStateChanged error:", err);
        setLoading(false);
        window.clearTimeout(timeoutId);
      }
    );
    return () => {
      unsub();
      window.clearTimeout(timeoutId);
    };
  }, [user]);

  // function para verificar o e-mail está verificado ou não
  const actionSettings = {
    url: "https://treatment-plan-app.firebaseapp.com",
    handleCodeInApp: true,
    iOS: {
      bundleId: "com.mdcodes.treatmentplan",
    },
  };
  const sendVerification = async () => {
    try {
      if (auth.currentUser) {
        auth.currentUser.reload();
      }
      if (user) {
        await sendEmailVerification(user, actionSettings);
        console.log("Email enviado com sucesso");
      }
    } catch (err) {
      console.log(`Erro ao verificar e-mail: ${err}`);
    }
  };
//function para remover usuário
  const signOutUser = async () => {
    try {
      if (auth.currentUser) {
        const unsubUser = await signOut(auth);
        console.log(unsubUser);
      }
      history.push("/signup");
    } catch (err) {
      alert("Erro ao tentar retornar, volte mais tarde");
      console.log(err);
    }
  };
  return { user, loading, sendVerification, signOutUser };
}

export default useAuth;
