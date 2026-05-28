import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import useUserInfo from "../../api/auth/getUserInfo";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import editICon from "../../../resources/edit-icon.png";
import InputName from "./inputs-edit/InputName";
import InputPhone from "./inputs-edit/InputPhone";
import { useState } from "react";
import InputEmail from "./inputs-edit/InputEmail";
import InputPassword from "./inputs-edit/InputPassword";

const EditProfileInfo = () => {
  const history = useHistory();
  const { getCredentialUser, userInfo } = useUserInfo();
  const { user } = useAuth();
  const [editField, setEditField] = useState<string>("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (user) {
      getCredentialUser(user?.uid).then(() => {
        console.log("Dados obtidos");
      });
    }
  }, [user, refresh]);

  return (
    <IonPage>
      <IonContent>
        <div className="flex flex-col justify-center items-center h-full">
          <h1 className="text-center text-white absolute top-30">Edit Profile</h1>
          {editField === "Name" && (
            <InputName setEditField={setEditField} setRefresh={setRefresh} />
          )}
          {editField === "Phone" && (
            <InputPhone setEditField={setEditField} setRefresh={setRefresh} />
          )}
          {editField === "Email" && <InputEmail />}
          {editField === "password" && <InputPassword />}

          {editField === "" && (
            <div className="flex flex-col justify-center items-center gap-5 px-0 w-full overflow-y-hidden">
              {userInfo.map((v, i) => (
                <div className="flex flex-row w-[90%]" key={i}>
                  <span className="text-white text-xl mx-2">{v.id}: </span>
                  <input
                    className="bg-(--ion-background-inputs) px-7 py-2 -mt-1 rounded-md text-start shadow-2xs h-10 text-white w-full"
                    disabled
                    value={v.info}
                  />
                  <img className="w-8 h-8" src={editICon} onClick={() => setEditField(v.id)} />
                </div>
              ))}
              <div className="flex w-full justify-center pl-10">
                <span className="bg-(--ion-background-inputs) px-7 py-2 rounded-md text-center shadow-2xs h-10 text-red-600 w-[40%]">
                  Password
                </span>
                <img className="w-8 h-8" src={editICon} onClick={() => setEditField("password")} />
              </div>
              <button onClick={() => history.push("/tabs/tab3")} className="text-white mt-5">
                Back
              </button>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditProfileInfo;
