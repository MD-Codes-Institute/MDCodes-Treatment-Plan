import { IonPage, IonContent } from "@ionic/react";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebaseConfig";
import { Redirect } from "react-router";
import { classBtn } from "../../data/auth/ContentForms";

const VerifiedEmail: React.FC = () => {
  console.log("Página recarregada");
  const { user, sendVerification, signOutUser } = useAuth();

  if (!user?.emailVerified) {
    return (
      <IonPage>
        <IonContent className="h-screen overflow-y-hidden ">
          <div className="flex flex-col items-center justify-center gap-30 h-screen">
            <h1 className="text-center text-white">Email verification</h1>
            <p className="text-center px-10">
              This email is not verified. Please click on "Send Verification" and check your email.
            </p>
            <div className="flex flex-wrap justify-center w-[70vw] md:w-[20vw] gap-7">
              <button
                onClick={async () => {
                  await auth.currentUser?.reload();
                  if (user?.emailVerified) {
                    window.location.reload();
                  } else {
                    alert(
                      `Please check your email; if you haven't received the email, click on "send verification".`
                    );
                    return;
                  }
                }}
                style={classBtn}
              >
                Continue
              </button>
              <button onClick={sendVerification} className=" text-white">
                Send verification
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
