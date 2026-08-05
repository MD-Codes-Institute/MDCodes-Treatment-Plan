import { IonPage, IonContent } from "@ionic/react";
import { useProfile } from "../contexts/ProfileContext";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { preferences } from "../data/tabs/ContentsTab3";
import deleteAccount from "../api/auth/deleteAccount";
import Loader from "../components/Loader";
import ActionButton from "../components/button/ActionButton";
import Card from "../components/Card";
import { useState } from "react";
import { Modal } from "../components/modal";

interface Fields {
  type: string;
  label: string;
  value: string;
}

interface SelectedPreference {
  id: string;
  title: string;
  description: string;
  fields: Fields[];
}

const Tab3: React.FC = () => {
  const { userInfo, isLoading, preferenceData } = useProfile();
  const { signOutUser, user } = useAuth();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const currency = preferenceData
    ?.flatMap((item) => item.items)
    .find((v) => v.key === "currency")?.value;

  if (isLoading || !userInfo) {
    return <Loader />;
  }

  const handleNavigatePreferences = (data: SelectedPreference) => {
    localStorage.setItem("preference", JSON.stringify(data));
    history.push("/tabs/profile-preferences");
  };

  const handleToggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <IonPage>
      <IonContent>
        <section className="flex flex-col gap-1 items-center justify-between h-full w-full">
          <h1 className="text-white pt-12">Profile info</h1>
          <section className="flex flex-col gap-3 w-[90%] pt-10">
            <div className="flex flex-row items-center gap-1">
              <p>Name:</p>
              <Card className="max-w-[80%]">
                <p className="">{userInfo.user_name}</p>
              </Card>
            </div>
            <div className="flex flex-row items-center gap-1">
              <p>E-mail:</p>
              <Card className="max-w-[80%]">
                <p className="">{userInfo.user_email}</p>
              </Card>
            </div>
          </section>

          <aside className="flex flex-col flex-1 gap-3 items-center max-h-70 justify-center w-[90%]">
            <h4 className="text-white">Edit your planning preferences</h4>
            {preferences.map((item) => (
              <Card className="flex items-center justify-center h-12" key={item.id}>
                <button
                  className="text-white text-lg w-full"
                  onClick={() => handleNavigatePreferences(item)}
                >
                  {item.title}
                </button>
              </Card>
            ))}
          </aside>

          <div className="w-[90%] flex flex-col gap-1 mt-5 pb-18">
            {preferenceData !== null && (
              <h3 className="text-white text-2xl! text-center">Saved Preferences</h3>
            )}
            {preferenceData?.map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  {item.title.split("_").map((name) => (
                    <h2 key={name} className="text-white text-[1.2em]!">
                      {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
                    </h2>
                  ))}
                </div>

                {item.items.map((v) => (
                  <Card key={v.key} className="h-8 flex items-center">
                    <p className="text-white font-regular! text-[0.9em] flex flex-row gap-1">
                      <strong>
                        {v.key
                          .split("_")
                          .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
                          .join(" ")}
                        :
                      </strong>
                      {/* {currency} */}
                      {v.key !== "currency" && currency} {v.value}
                    </p>
                  </Card>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-row gap-5 items-center justify-between px-5 w-full fixed -bottom-1 bg-(--ion-background-containers)! h-17">
            <ActionButton
              type="button"
              color="warning"
              className="flex-1 h-10 rounded-md!"
              onClick={handleToggleModal}
            >
              Delete Account
            </ActionButton>
            <ActionButton
              type="button"
              className="flex-1 h-10 rounded-md!"
              onClick={() => history.push("edit-settings")}
            >
              Edit settings
            </ActionButton>
            <ActionButton
              type="button"
              className="flex-1 h-10 rounded-md!"
              onClick={() => signOutUser()}
            >
              Logout
            </ActionButton>
          </div>
        </section>

        {isModalOpen && (
          <Modal.Root className="flex flex-col items-center justify-center h-[50vh] w-[80vw]">
            <Modal.Content className="px-10">
              <h2 className="text-white text-center">
                Do you confirm the deletion of your account? This action is permanent
              </h2>
            </Modal.Content>
            <Modal.Actions>
              <ActionButton
                onClick={handleToggleModal}
                type="button"
                className="h-10 flex-1 rounded-md!"
              >
                Cancel
              </ActionButton>
              <ActionButton
                onClick={() => deleteAccount(user, history)}
                type="button"
                color="warning"
                className="flex-2 rounded-md! h-10"
              >
                Confirm Delete
              </ActionButton>
            </Modal.Actions>
          </Modal.Root>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
