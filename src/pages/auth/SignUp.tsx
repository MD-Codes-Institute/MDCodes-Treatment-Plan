import { IonContent, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router";
import { ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";
import useAuth from "./UseAuth";
import React from "react";
import {
  schemaSignUp,
  contentFormSignUp,
  VerifyErroCode,
} from "../../Contents/ContentsAuth/ContentForms";
import { useState } from "react";

const SignUp: React.FC = () => {
  const [err, setErr] = useState<string>("");
  const { sendVerification } = useAuth();
  type formDataSchema = z.infer<typeof schemaSignUp>;
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataSchema>({ resolver: zodResolver(schemaSignUp) });

  const onSubmit = async (data: formDataSchema) => {
    try {
      console.log("Tentando criar usuário");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const uid = userCredential.user.uid;
      console.log("Usuário criado com sucesso!");

      // Envia o e-mail de verificação logo após criar o usuário
      await sendVerification();

      // Salva os dados do usuário no banco
      set(ref(db, `/users/user${uid}`), {
        userID: uid,
        username: data.name,
        user_email: data.email,
        userphone: data.phone,
      });
    } catch (error) {
      let msg: string = "";
      if (error && typeof error === "object" && "code" in error) {
        msg = String(VerifyErroCode((error as any).code));
        setErr(msg);
        console.log(error, msg);
      } else {
        msg =
          "Error creating user; we are experiencing an error on our servers.";
        setErr(msg);
        alert(msg);
      }
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-screen justify-center items-center">
          <h1 className="text-white h-[15vh] flex items-center">Sign Up</h1>
          {err && (
            <span className="text-red-400 mb-2 px-10 text-center">{err}</span>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col gap-5 h-[80vh]"
          >
            {contentFormSignUp.map((v, i) => (
              <React.Fragment key={v.id}>
                <label htmlFor={v.id}>{v.name}</label>
                <input
                  type={
                    v.id == "password"
                      ? "password"
                      : v.id == "phone"
                      ? "number"
                      : "text"
                  }
                  inputMode={v.id == "phone" ? "numeric" : "none"}
                  {...register(v.id as keyof formDataSchema)}
                  style={{
                    textTransform: v.id === "email" ? "lowercase" : "none",
                  }}
                  className="border border-amber-50 rounded-2xl w-70 h-10 custom-input placeholder:px-1"
                />
                {errors[v.id as keyof formDataSchema] && (
                  <span className="p-0 m-0 h-1 text-white">
                    {errors[v.id as keyof formDataSchema]?.message}
                  </span>
                )}
              </React.Fragment>
            ))}

            <div className="flex flex-col items-center justify-center w-[90vw]  p-10 gap-4 mt-20">
              <button
                type="submit"
                value="Enviar"
                style={{
                  border: "1px solid #fff",
                  boxShadow: "0px 0px 7px #967F43",
                  borderRadius: 16,
                  color: "#fff",
                  fontSize: "1.05rem",
                  width: "200px",
                  height: "40px",
                  background: "#967F43",
                }}
              >
                Register
              </button>
              <button
                onClick={() => history.push("/signin")}
                style={{
                  borderRadius: 16,
                  color: "#fff",
                  fontSize: "0.85rem",
                  width: "70%",
                  height: "5vh",
                  background: "transparent",
                }}
              >
                Do you already have an account?{" "}
                <span style={{ color: "#8686fd" }}>Log in.</span>
              </button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
