import { IonPage, IonContent } from "@ionic/react";
import useAuth from "./UseAuth";
import { Redirect, useHistory } from "react-router";

const VerifiedEmail = () => {
  console.log("Página recarregada");
  const { user, sendVerification, signOutUser } = useAuth();
  const history = useHistory();

  if (!user?.emailVerified) {
    return (
      <IonPage>
        <IonContent className="h-screen overflow-y-hidden ">
          <div className="flex flex-col items-center justify-center gap-30 h-screen">
            <h1 className="text-center text-white">Email verification</h1>
            <p className="text-center px-10">
              E-mail não verificado, por favor verifique seu e-mail
            </p>
            <div className="flex flex-wrap justify-center w-[70vw] md:w-[20vw] gap-7">
              <button
                onClick={() => {history.push("/tabs"), console.log("Tentando acessar App")}}
                style={{
                  color: "#fff",
                  border: "1px solid #fff",
                  borderRadius: "2rem",
                  height: "2.5rem",
                  width: "6.25rem",
                  background: "#967F43",
                  boxShadow: "0px 0px 7px #967F43",
                }}
              >
                Continue
              </button>
              <button onClick={sendVerification} className=" text-white">
                Enviar verificação
              </button>
              <button className="text-white" onClick={signOutUser}>
                Return
              </button>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    return <Redirect to="/tabs" />;
  }
};

export default VerifiedEmail;
