import { IonContent, IonPage } from "@ionic/react";
import useSignIn from "./useSignIn";
import ForgetPassword from "../ForgetPassword";
import { useHistory } from "react-router";
import { useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import InputField from "../../../components/InputField";

const SignIn: React.FC = () => {
  const { onSubmit, handleSubmit, control } = useSignIn();
  const history = useHistory();
  const [showForgot, setShowForgot] = useState<boolean>(false);
  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col h-full justify-center items-center max-w-[90vw] py-20 m-auto gap-10">
          {!showForgot && (
            <>
              <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-white flex items-center">Sign In</h1>
                <p className="text-white text-center">
                  Enter your email and password to log in to the app.
                </p>
              </div>
              <form
                id="signin-form"
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-center items-center flex-col gap-5 h-[80vh]"
              >
                <InputField
                  name="email"
                  control={control}
                  autoComplete="email"
                  type="email"
                  label="Enter your email"
                  className="w-[80%]"
                />
                <InputField
                  name="password"
                  control={control}
                  autoComplete="password"
                  type="password"
                  label="Enter your password"
                  className="w-[80%]"
                />
              </form>
              <div className="flex flex-row items-center justify-center gap-5 w-full">
                <ActionButton
                  type="submit"
                  form="signin-form"
                  color="gold"
                  className="flex-1 h-7 rounded-md!"
                >
                  Sign In
                </ActionButton>
                <ActionButton
                  type="button"
                  color="default"
                  className="flex-1 bg-transparent! shadow-none! text-[13px]"
                  onClick={() => history.push("/signup")}
                >
                  Sign Up
                </ActionButton>
              </div>
              <ActionButton
                type="button"
                className="bg-transparent! shadow-none! font-extralight! h-8 text-[13px] text-white"
                onClick={() => setShowForgot(true)}
              >
                If you forget your password, <br />
                click here for reset
              </ActionButton>
            </>
          )}
          {showForgot && <ForgetPassword setShowForgot={setShowForgot} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
