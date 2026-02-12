import { IonPage, IonContent } from "@ionic/react";
import "./Tab3.css";
import { getCredentialUser } from "../Data/DataFirebase";
import useAuth from "./auth/UseAuth";
import { useEffect, useState } from "react";

const Tab3: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();
  useEffect(() => {
    if (user) {
      getCredentialUser(user.uid).then((userData) => {
        setName(userData?.name);
        setEmail(userData?.email);
        setPhone(userData?.phone);
      });
    }
  }, [user]);

  const userInfo = [
    { id: "Name", info: name },
    { id: "Email", info: email },
    { id: "Phone", info: phone },
  ];

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1 className="text-white text-5xl text-center">Profile Info</h1>

        <div className="w-full mt-10 gap-5 flex flex-col ">
          {userInfo.map((v, i) => (
            <div className="flex flex-row" key={i}>
              <span className="text-white text-xl mx-2">{v.id}: </span>
              <span className="bg-(--ion-background-inputs) px-7 py-2 rounded-md text-center shadow-2xs h-10 text-white">
                {v.info}
              </span>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
