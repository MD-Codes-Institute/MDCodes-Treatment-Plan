import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import React from "react";
import { contentFormSignUp } from "../../../contents/auth/ContentForms";
import useSignUp from "./useSignUp";
import { formDataSchema } from "./useSignUp";
import { classBtn } from "../../../contents/auth/ContentForms";

const SignUp: React.FC = () => {
  const { onRegister, register, err, errors, handleSubmit } = useSignUp();
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-screen justify-center items-center">
          <h1 className="text-white h-[15vh] flex items-center">Sign Up</h1>
          {err && (
            <span className="text-red-400 mb-2 px-10 text-center">{err}</span>
          )}
          <form
            onSubmit={handleSubmit(onRegister)}
            className="flex justify-center items-center flex-col gap-5 h-[80vh]"
          >
            {contentFormSignUp.map((v, _) => (
              <React.Fragment key={v.id}>
                <label htmlFor={v.id}>{v.name}</label>
                <input
                  type={
                    v.id == "password"
                      ? "password"
                      : v.id == "phone"
                      ? "number"
                      : v.id == "email"
                      ? "email"
                      : "text"
                  }
                  inputMode={v.id == "phone" ? "numeric" : "text"}
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
              <button type="submit" value="Enviar" style={classBtn}>
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
