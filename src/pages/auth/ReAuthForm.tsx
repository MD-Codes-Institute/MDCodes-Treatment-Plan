import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useForm } from "react-hook-form";
import { IonContent, IonPage } from "@ionic/react";
import { reAuth } from "../../data/schema-form/re-authform";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from "react-router";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";
import z from "zod";
import InputField from "../../components/InputField";
import ActionButton from "../../components/button/ActionButton";
import toast from "react-hot-toast";

const ReAuthForm: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(false);

  type FormProp = z.infer<typeof reAuth>;
  const { control, handleSubmit, reset } = useForm<FormProp>({
    resolver: zodResolver(reAuth),
  });

  const onSubmit = async (data: FormProp) => {
    setIsSubmitDisabled(true);
    try {
      if (!user) {
        return toast.error("User not logged in");
      }
      const credential = EmailAuthProvider.credential(data.email, data.password);
      const response = await toast.promise(reauthenticateWithCredential(user, credential), {
        loading: "Loading...",
        success: "Re-authentication successful",
        error: (err: FirebaseError) => err.message,
      });
      console.log(response);
      setTimeout(() => {
        reset();
        history.goBack();
      }, 800);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else if (err instanceof FirebaseError) {
        console.log(err.code);
        toast.error(err.message);
      }
    } finally {
      setIsSubmitDisabled(false);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="min-h-full min-w-[90vw] flex flex-col items-center justify-between">
          <h1 className="pt-15! text-white text-center">Reauthenticate page</h1>
          <form id="re-auth" className="flex items-center justify-center flex-col w-[90%] gap-5" onSubmit={handleSubmit(onSubmit)}>

            <InputField label="Enter your e-mail addres" name="email" control={control} className="w-[80%]" />
            <InputField label="Enter your password" name="password" control={control} className="w-[80%]" type="password" />

          </form>
          <div className="flex flex-row gap-5 w-[80%] py-5">
            <ActionButton type="button" onClick={() => history.goBack()} className="flex-1 h-8 rounded-md!" color="default" >
              Cancel
            </ActionButton>
            <ActionButton type="submit" form="re-auth" className="flex-2 h-8 rounded-md!" color="gold" disabled={isSubmitDisabled}>
              Send
            </ActionButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default ReAuthForm;
