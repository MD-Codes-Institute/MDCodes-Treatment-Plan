import { VerifyErroCode } from "../../../contents/auth/ContentForms";
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { schemaSignUp } from "../../../contents/auth/ContentForms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import createUser from "../../../api/auth/createUser";

export type formDataSchema = z.infer<typeof schemaSignUp>;

const useSignUp = () => {
  const [err, setErr] = useState<string>("");
  const { sendVerification } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataSchema>({ resolver: zodResolver(schemaSignUp) });

  const onRegister = async (data: formDataSchema) => {
    try {
      console.log("Tentando criar usuário");
      await createUser({ form: data });

      // Envia o e-mail de verificação logo após criar o usuário
      await sendVerification();
    } catch (error) {
      let msg: string = "";
      if (error && typeof error === "object" && "code" in error) {
        // passando mensagem para o loop VerifyErroCode para verficar qual erro que teve ao tentar criar usuário
        msg = String(VerifyErroCode((error as any).code));
        setErr(msg);
        console.log(error, msg);
      } else {
        msg = "Error creating user; we are experiencing an error on our servers.";
        setErr(msg);
        alert(msg);
      }
      console.log(error);
    }
  };
  return { onRegister, register, err, errors, handleSubmit };
};

export default useSignUp;
