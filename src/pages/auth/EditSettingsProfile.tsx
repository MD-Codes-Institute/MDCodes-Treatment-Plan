import { IonContent, IonPage } from "@ionic/react";
import InputField from "../../components/InputField";
import { useProfileSettings } from "../../hooks/useProfileSettings";
import ActionButton from "../../components/button/ActionButton";
import { useHistory } from "react-router";

const EditSettingsProfile: React.FC = () => {
  const { handleSubmit, control, onSubmit, isLoading } = useProfileSettings();
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <main className="flex flex-col justify-between items-center h-full pt-20 pb-10 px-10 gap-5">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-white">Profile settings</h1>
            <p className="text-center text-[14px]">
              Fill in the fields you want to change; if you want to change everything, fill in all
              of them.
            </p>
          </div>
          <form
            id="profileSettings"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <InputField
              name="user_name"
              control={control}
              label="Enter your name"
              className="w-full max-w-100"
              type="text"
              autoComplete="name"
            />
            <InputField
              name="user_email"
              control={control}
              label="Enter your new e-mail"
              autoComplete="email"
            />
            <InputField
              name="user_password"
              control={control}
              label="Enter your new password"
              type="password"
            />
          </form>
          <div className="flex flex-row gap-5 items-center justify-center w-[90vw]">
            <ActionButton
              type="submit"
              form="profileSettings"
              color="gold"
              className="flex-1 min-w-15 h-8 rounded-md!"
              disabled={isLoading}
            >
              Send
            </ActionButton>
            <ActionButton
              type="button"
              onClick={() => history.goBack()}
              className="flex-1 min-w-15 h-8 rounded-md!"
              disabled={isLoading}
            >
              Go back
            </ActionButton>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};
export default EditSettingsProfile;
