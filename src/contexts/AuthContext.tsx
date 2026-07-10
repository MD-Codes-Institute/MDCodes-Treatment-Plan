import { createContext, useContext, useState, useEffect } from "react";
import { User, onAuthStateChanged, sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useHistory } from "react-router";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";

interface ContextProps {
  user: User | null;
  loading: boolean;
  sendVerification: () => void;
  signOutUser: () => void;
}

const AuthContext = createContext<ContextProps | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
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
  }, [user, user?.email]);

  const sendVerification = async () => {
    try{
      if (user) {
        await sendEmailVerification(user);
        toast.success("Email sent successfully")
      }
    }catch (err){ 
      if(err instanceof FirebaseError){
        toast.error(err.message)
      }
      if(err instanceof Error){
        toast.error(err.message)
      }
    }
  };

  //function para remover usuário
  const signOutUser = async () => {
    try {
      if (auth.currentUser) {
        const unsubUser = await signOut(auth);
        console.log(unsubUser);
      }
      toast.error("Sign out with sucess");
      history.push("/signin");
    } catch (err) {
      toast.error("Unknow error");
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, sendVerification, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("O useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
