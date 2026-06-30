import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import z from "zod";
import { schemaSignIn, VerifyErroCode } from "../../../data/auth/ContentForms";
import { useState } from "react";

export type formSchema = z.infer<typeof schemaSignIn>;

const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({ resolver: zodResolver(schemaSignIn) });

  const [err, setErr] = useState<string>("");

  const onSubmit = async (data: formSchema) => {
    try {
      console.log("Tentando conectar usuário");
      const user = await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("Conexão feita");
    } catch (error: any) {
      let msg: string = "";
      if (error && typeof error === "object" && "code" in error) {
        msg = String(VerifyErroCode((error as any).code));
        setErr(msg);
        console.log(error, msg);
      } else {
        msg = "Error connecting user, we are experiencing an error on our servers.";
        setErr(msg);
        alert(msg);
      }
      console.log(error);
    }
  };

  return { onSubmit, err, errors, register, handleSubmit };
};

export default useSignIn;
