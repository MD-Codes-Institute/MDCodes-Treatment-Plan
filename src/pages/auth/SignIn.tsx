import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import z from "zod";
import {
  schemaSignIn,
  contentFormSignIn,
  VerifyErroCode,
} from "../../Contents/ContentsAuth/ContentForms";
import { useState } from "react";

const SignIn: React.FC = () => {
  type formSchema = z.infer<typeof schemaSignIn>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formSchema>({ resolver: zodResolver(schemaSignIn) });
  const history = useHistory();

  const [err, setErr] = useState<string>("");
  const onSubmit = async (data: formSchema) => {
    try {
      console.log("Tentando conectar usuário");
      const user = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("Conexão feita");
    } catch (error: any) {
      let msg: string = "";
      if (error && typeof error === "object" && "code" in error) {
        msg = String(VerifyErroCode((error as any).code));
        setErr(msg);
        console.log(error, msg);
      } else {
        msg =
          "Error connecting user, we are experiencing an error on our servers.";
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
          <h1 className="text-white h-[15vh] flex items-center">Sign In</h1>
          {err && (
            <span className="text-red-400 mb-2 px-10 text-center">{err}</span>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col gap-5"
          >
            {contentFormSignIn.map((v, i) => (
              <>
                <label key={i} htmlFor={v.id}>
                  {v.name}
                </label>
                <input
                  key={i + 1}
                  type={v.id == "password" ? "password" : "text"}
                  style={{
                    textTransform: v.id == "email" ? "lowercase" : "none",
                  }}
                  {...register(v.id as keyof formSchema)}
                  className="border border-amber-50 rounded-2xl w-70 h-10 custom-input"
                />
                {errors[v.id as keyof formSchema] && (
                  <span className="text-white px-10">
                    {errors[v.id as keyof formSchema]?.message}
                  </span>
                )}
              </>
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
                Log in
              </button>
              <button
                onClick={() => history.push("/signup")}
                style={{
                  borderRadius: 16,
                  color: "#fff",
                  fontSize: "0.85rem",
                  width: "70%",
                  height: "4vh",
                  background: "transparent",
                }}
              >
                Don't have an account?{" "}
                <span style={{ color: "#8686fd" }}>Sign Up.</span>
              </button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
