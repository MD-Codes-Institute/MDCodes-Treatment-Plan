import { IonPage, IonContent, IonSpinner } from "@ionic/react";
import "./Tab3.css";
import { useEffect, useState } from "react";
import BtnsFirebase from "../components/tab3/BtnsFirebase";
import useUserInfo from "../api/auth/getUserInfo";
import useUpdateUserInfo from "../api/auth/updateUserInfo";
import ActionsContainer from "../components/tab3/inputs-preferences/ActionsContainer";
import { classInputs } from "../contents/tabs/ContentsTab3";
import { getProfilePreferences } from "../services/database/preferencesProfile";
import { profileSettings, profilePreferences } from "../api/routes/profile";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/AuthContext";

const Tab3: React.FC = () => {
  const { user } = useAuth();
  const { updateFirebase } = useUpdateUserInfo();
  const { getCredentialUser, userInfo } = useUserInfo();
  const [preferences, setPreferences] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!user) return;
    getCredentialUser(user.uid).then(() => {
      const authEmail = user.email ?? undefined;
      const dbEmail = userInfo.find((v) => v.info == authEmail);
      if (authEmail && dbEmail?.info !== authEmail) {
        updateFirebase({ user_email: authEmail }, profileSettings(user.uid)).then(() => {
          console.log("E-mail atualizado no database");
        });
      }
    });
    getProfilePreferences(user.uid).then((v) => {
      setPreferences(v?.state);
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user, userInfo, getCredentialUser, updateFirebase, getProfilePreferences]);

  if (loading) {
    return <Loader />;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding min-h-full">
        <section className="flex flex-col justify-center items-center h-full pb-10 gap-10">
          <h1 className="text-white text-5xl text-center pt-25">Profile Info</h1>
          {/* container com info user */}
          <div className="w-full mt-5 gap-5 flex flex-col">
            {userInfo.map((v, i) => (
              <div className="flex flex-row" key={i}>
                <span className="text-white text-xl mx-2">{v.id}: </span>
                <span
                  className="px-7 flex items-center -mt-1 text-start h-10 w-full"
                  style={classInputs}
                >
                  {v.info}
                </span>
              </div>
            ))}
          </div>
          {/* fim  container com info user */}
          {/* container preferencias user */}
          <div>
            <p className="text-white text-[20px]">Planning preferences</p>
          </div>
          {user && <ActionsContainer user={user} preferences={preferences} />}
          <div>
            <BtnsFirebase />
          </div>
        </section>
        {/* fim container preferencias user */}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
