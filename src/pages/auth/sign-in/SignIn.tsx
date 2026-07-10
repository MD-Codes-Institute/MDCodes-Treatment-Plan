import { IonContent, IonPage } from "@ionic/react";
import { classBtn, contentFormSignIn, classInput } from "../../../data/auth/ContentForms";
import { formSchema } from "./useSignIn";
import useSignIn from "./useSignIn";
import ForgetPassword from "../ForgetPassword";
import { useHistory } from "react-router";
import { useState } from "react";


const SignIn: React.FC = () => {
  const { onSubmit, err, errors, register, handleSubmit } = useSignIn();
  const history = useHistory();
  const [showForgot, setShowForgot] = useState<boolean>(false);
  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-screen justify-center items-center">
          <h1 className="text-white h-[15vh] flex items-center">Sign In</h1>
          {err && <span className="text-red-400 mb-2 px-10 text-center">{err}</span>}
          {!showForgot && (
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
                    key={v.id}
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
                <button type="submit" value="Enviar" style={classBtn}>
                  Log in
                </button>
                <button onClick={() => setShowForgot(true)} style={classInput}>
                  Forgot your password?
                  <span style={{ color: "#8686fd" }}>Click here.</span>
                </button>
                <button onClick={() => history.push("/signup")} style={classInput}>
                  Don't have an account?
                  <span style={{ color: "#8686fd" }}>Sign Up.</span>
                </button>
              </div>
            </form>
          )}
          {showForgot && <ForgetPassword setShowForgot={setShowForgot} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
