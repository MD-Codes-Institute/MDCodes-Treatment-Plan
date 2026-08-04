import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import React from "react";
import useSignUp from "./useSignUp";
import InputField from "../../../components/InputField";
import ActionButton from "../../../components/button/ActionButton";

const SignUp: React.FC = () => {
  const { onRegister, control, handleSubmit } = useSignUp();
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col justify-center items-center h-full pt-20 pb-20">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-white flex items-center">Sign Up</h1>
            <p className="text-white">If you don't have an account, create one now.</p>
          </div>
          <form
            id="create-user"
            onSubmit={handleSubmit(onRegister)}
            className="flex justify-center items-center flex-col gap-7 h-[80vh]"
          >
            <InputField
              type="text"
              name="name"
              className="w-[80%]"
              control={control}
              autoComplete="name"
              label="Enter your name"
            />

            <InputField
              type="email"
              name="email"
              className="w-[80%]"
              control={control}
              autoComplete="email"
              label="Enter your email"
            />

            <InputField
              type="password"
              name="password"
              className="w-[80%]"
              control={control}
              autoComplete="password"
              label="Enter your password"
            />
          </form>

          <div className="flex flex-col gap-5 items-center justify-center w-full px-10">
            <ActionButton
              form="create-user"
              type="submit"
              color="gold"
              className="w-[60%] h-6 rounded-sm!"
            >
              Send
            </ActionButton>
            <ActionButton
              type="submit"
              color="default"
              className="w-[25%] h-6 rounded-sm! bg-transparent! shadow-none!"
              onClick={() => history.push("/signin")}
            >
              Sign in
            </ActionButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
