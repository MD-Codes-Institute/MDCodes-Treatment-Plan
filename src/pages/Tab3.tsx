import { IonPage, IonContent } from "@ionic/react";
import "./Tab3.css";
import useAuth from "./auth/useAuth";
import { useEffect, useState } from "react";
import BtnsFirebase from "../components/tab3/BtnsFirebase";
import useUserInfo from "../services/crud-auth/getUserInfo";
import useUpdateUserInfo from "../services/crud-auth/updateUserInfo";
import ActionsContainer from "../components/tab3/inputs-preferences/ActionsContainer";
import { classInputs } from "../contents/tabs/ContentsTab3";

const Tab3: React.FC = () => {
  const { user } = useAuth();
  const { updateFirebase } = useUpdateUserInfo();
  const { getCredentialUser, userInfo } = useUserInfo();

  useEffect(() => {
    if (!user) return;
    getCredentialUser(user.uid).then(() => {
      console.log("dados do usuário obtidos");
      const authEmail = user.email ?? undefined;
      const dbEmail = userInfo.find((v) => v.info == authEmail);
      if (authEmail && dbEmail?.info !== authEmail) {
        updateFirebase({ user_email: authEmail }).then(() => {
          console.log("E-mail atualizado no database");
        });
      }
    });
  }, [user, userInfo, getCredentialUser, updateFirebase]);

  return (
    <IonPage>
      <IonContent className="ion-padding min-h-full">
        <section className="flex flex-col justify-center items-center h-full pb-10 gap-10">
          <h1 className="text-white text-5xl text-center pt-25">
            Profile Info
          </h1>
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
          <div>
            <p className="text-white text-[20px]">Planning preferences</p>
          </div>
          <ActionsContainer />
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
