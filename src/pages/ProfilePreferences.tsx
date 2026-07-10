import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import z, { string } from "zod";
import { useProfile } from "../contexts/ProfileContext";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import ActionButton from "../components/button/ActionButton";

interface NewData {
  [x: string]: { value: string };
}
const ProfilePreferences: React.FC = () => {
  const { createNewPreference } = useProfile()
  const { user } = useAuth()
  const localDb = localStorage.getItem("preference") || "";
  const preference = JSON.parse(localDb);
  const { fields: fieldArray } = preference;
  
  const history = useHistory();

  const isProductValue = preference.id === "product_value";
  const [wantAddAnotherProduct, setWantAddAnotherProduct] = useState<boolean>(false);

  const schema = z.object({
    answers: z.array(
      z.object({
        type: string("Enter text only").min(2, "Enter the name of your preferred product."),
        label: z.string("Enter a value"),
        value: z.string().min(1, "You need to enter at least 1 character."),
      })
    ),
  });

  type PropsForm = z.infer<typeof schema>;
  
  const { control, handleSubmit, reset } = useForm<PropsForm>({
    resolver: zodResolver(schema),
    defaultValues: { answers: fieldArray },
  });

  const prevPreferenceRef = useRef(JSON.stringify(fieldArray));
  useEffect(() => {
    const currentPreference = JSON.stringify(fieldArray);
    if (prevPreferenceRef.current !== currentPreference) {
      reset({ answers: fieldArray });
      prevPreferenceRef.current = currentPreference;
    }
  }, [fieldArray, reset]);

  const { fields, append } = useFieldArray({ control, name: "answers" });

  const handleAddAnotherProduct = () => {
    append({ type: "", label: "Enter name of your product", value: "" });
    setWantAddAnotherProduct(true);
  };

  const handleCancelAnotherProduct = () => {
    setWantAddAnotherProduct(false);
    reset();
  };

  const handleReturnPreviousPage = () => history.push("/tabs/tab3");

  const onSubmit =  async (data: PropsForm) => {
    const updates: NewData = {}
    data.answers.forEach((item) => {
      const path  = `/preferences/user-${user?.uid}/${preference.id}/${item.type}`
      updates[path] = { 
        value: item.value
      }
    })
    await toast.promise(createNewPreference(updates), {
      loading: "Loading...",
      success: (data) => {
        if(data.status !== 201){ 
        throw new Error(data.message)
      }
        return data.message
      },
      error: (err) => {return err.message}
    })
    reset()
    history.push("/tabs/tab3")
  };

  return (
    <IonPage>
      <IonContent>
        <section className="flex flex-col gap-5 items-center justify-center w-full min-h-full overflow-y-auto">
          <h1 className="text-white pt-15">Profile Preferences</h1>
          <p className="text-white">{preference.title} settings</p>

          <section className="flex flex-col flex-1 items-center justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="preference"
              className="flex flex-col gap-5 max-w-[95vw]"
            >
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-row gap-4 overflow-x-hidden! whitespace-nowrap"
                >
                  {wantAddAnotherProduct && isProductValue && (
                    <InputField name={`answers.${index}.type`} label="Enter a name of your product" control={control} />
                  )}
                  <InputField 
                  name={`answers.${index}.value`} 
                  {...preference.id !== "local_currency" && {type: "number", inputMode: "numeric"}}
                  {...(isProductValue ? { label: `Enter a value of product ${item.label}`} : { label: item.label })} 
                  control={control} />
                </div>
              ))}
            </form>
          </section>
          <div className="flex flex-row gap-5 w-full sticky bottom-0  bg-(--ion-background-containers) py-3 px-5">
            <ActionButton type="button"  className="h-8 flex-1 rounded-md!" onClick={handleReturnPreviousPage}> 
              Return 
            </ActionButton>
            {(wantAddAnotherProduct && isProductValue) && (
              <ActionButton type="button" color="default" className="h-8 flex-1 rounded-md!" onClick={handleCancelAnotherProduct} >
                Cancel
              </ActionButton>
            )}
            {isProductValue && (
              <ActionButton type="button" onClick={handleAddAnotherProduct} className="h-8 flex-3  rounded-md!">
                Add another product
              </ActionButton>
            )}
            <ActionButton type="submit" form="preference" color="gold" className="h-8 flex-1 rounded-md!">
              Save
            </ActionButton>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};
export default ProfilePreferences;
