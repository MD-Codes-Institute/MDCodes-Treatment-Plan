import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useForm, useFieldArray } from "react-hook-form";
import { products, volumes } from "../data/tabs/ContentsTab2";
import { getValueForCode } from "../data/tabs/getValueForCode";
import { useCart } from "../contexts/CartContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatient } from "../contexts/PatientsContext";
import { Modal } from "../components/modal";
import { TreatmentPlan } from "../types/Patients";
import { formSchema } from "../data/schema-form/treatmentPlan";
import ActionButton from "../components/button/ActionButton";
import z from "zod";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import "./TreatmentPlanForm.css";

const TreatmentPlanForm: React.FC = () => {
  const { cart, deleteCart } = useCart();
  const history = useHistory();
  const { saveNewPatient, saveExistingPatient, displayed, searchPatient, isLoading } = usePatient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(null);
  const [confirmNew, setConfirmNew] = useState<boolean>(false);
  const dateNow: string = new Date().toISOString().slice(0, 10);

  type formData = z.infer<typeof formSchema>;
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      treatmentPlan: {
        dateTreatment: dateNow,
        cart: [
          { code: "", product: products[0], right: volumes[0], mid: volumes[0], left: volumes[0] },
        ],
      },
    },
  });

  const { fields, replace } = useFieldArray({ control, name: "treatmentPlan.cart" });

  useEffect(() => {
    if (cart.length === 0) history.push("/tabs/tab2");
    const replaceFields = cart.map((item) => {
      const response = getValueForCode(item.code);
      return {
        code: item.code,
        product: response.product,
        right: response.right,
        mid: response.mid,
        left: response.left,
      };
    });
    replace(replaceFields);
}, [cart, replace, history]);

  const handleSaveExistingPatient = async (patientId: string, treatmentPlan: TreatmentPlan) => {
    const response = await toast.promise(saveExistingPatient(patientId, treatmentPlan), {
      loading: "Loading...",
      success: (data) => {
        if (data.status !== 201) throw new Error(data.message);
        return data.message;
      },
      error: (err) => err.message,
    });
    if (response.status === 201) {
      setTimeout(() => {
        setIsModalOpen(false);
        deleteCart();
      }, 700);
    }
  };

  const handleCancelSaveExistingPatient = () => { setIsModalOpen(false); setConfirmNew(true); };

  const onSubmit = async (data: formData) => {
    const { name, age, treatmentPlan } = data;
    setTreatmentPlan(treatmentPlan);
    searchPatient(name.split(" ")[0]);
    if (displayed && displayed?.length >= 1 && !confirmNew) {
      setIsModalOpen(true);
    } else {
      const shippingConfirmation = confirm(
        "Are you sure you want to save this treatment plan? After this, you will not be able to edit any of this patient's information. Please review all information before saving."
      );
      if (shippingConfirmation) {
        const response = await toast.promise(saveNewPatient({ name, age }, treatmentPlan), {
          loading: "Loading...",
          success: (data) => {
            if (data.status !== 201) throw new Error(data.message);
            return data.message;
          },
          error: (err) => err.message,
        });
        if (response.status === 201) {
          setTimeout(() => {
            setIsModalOpen(false);
            deleteCart();
          }, 700);
        }
      }
    }
  };

  if (isLoading) { return <Loader /> }

  return (
    <IonPage>
      <IonContent>
        <section className="h-full w-full flex items-center justify-center flex-col gap-5 pt-10">
          <h1 className="text-white font">Save Treatment Plan</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            id="save-patient"
            className="flex flex-col gap-2 w-full h-full items-center justify-start overflow-y-auto"
          >
            <div className="flex flex-col items-start justify-between w-full px-8 gap-3 mb-4">
              <p className="text-white text-sm font-bold"> Date: {dateNow} </p>
              <label htmlFor="age" className="text-white">Age:</label>
              <input
                type="number"
                inputMode="numeric"
                max={100}
                className="rounded-md! custom-input max-w-20"
                {...register("age")}
              />
              {errors.age && <p className="text-red-500!">{errors.age.message}</p>}

              <label htmlFor="name" className="text-white">Name:</label>
              <input type="text" className="rounded-md! custom-input w-full max-w-150!" {...register("name")} />
              {errors.name && <p className="text-red-500!">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <div className="w-full grid grid-cols-5 grid-flow-col gap-5 px-3 whitespace-nowrap place-items-center title-container">
                <p>Code</p>
                <p>Product</p>
                <p>Right</p>
                <p>Mid</p>
                <p>Left</p>
              </div>
              {fields.map((item, index) => (
                <li key={item.id} className="w-full grid grid-cols-5 grid-flow-col gap-5 px-3 place-items-center register-list" >

                  <input {...register(`treatmentPlan.cart.${index}.code`)} disabled className="whitespace-nowrap max-w-15!" />
                  
                  <select {...register(`treatmentPlan.cart.${index}.product`)}>
                    {products.map((product, index) => (
                      <option key={product + index}>{product}</option>
                    ))}
                  </select>
                  <select {...register(`treatmentPlan.cart.${index}.right`)}>
                    {volumes.map((volume, index) => (
                      <option key={volume + index}>{volume}</option>
                    ))}
                  </select>
                  <select {...register(`treatmentPlan.cart.${index}.mid`)}>
                    {volumes.map((volume, index) => (
                      <option key={volume + index}>{volume}</option>
                    ))}
                  </select>
                  <select {...register(`treatmentPlan.cart.${index}.left`)}>
                    {volumes.map((volume, index) => (
                      <option key={volume + index}>{volume}</option>
                    ))}
                  </select>
                </li>
              ))}
            </div>
          </form>

          <div className="flex flex-row w-[90%] gap-5 items-center justify-between my-2 pb-5">
            <ActionButton type="button" disabled={isModalOpen} onClick={() => history.push("/tabs/tab1")} className="h-8 w-auto px-5! rounded-md!" >
              Return
            </ActionButton>
            <ActionButton type="button" onClick={deleteCart} disabled={isModalOpen} className="h-8 w-auto px-5! rounded-md!" color="warning">
              Delete Treatment Plan
            </ActionButton>
            <ActionButton type="submit" form="save-patient" className="h-8 w-auto px-5! rounded-md!" color="gold" disabled={isLoading}>
              Save
            </ActionButton>
          </div>
        </section>

        {isModalOpen && displayed && displayed.length >= 1 && (
          <Modal.Root className="h-[70vh] w-[90vw] items-center justify-start pt-10">
            <Modal.Header>
              <Modal.Title className="text-[23px]! md:text-[28px]! text-center py-10">
                Do you want to add this patient to a folder?
              </Modal.Title>
            </Modal.Header>
            <Modal.Content className="gap-5 px-10 flex-col">
              <p className="text-md text-white"> If desired, click on a folder to insert this treatment plan. </p>
              {displayed.map((value) => (
                <button
                  onClick={() => handleSaveExistingPatient(value.id, treatmentPlan!)}
                  className="w-full h-[7vh] bg-(--ion-background-inputs) flex flex-row items-center justify-center gap-5 rounded-md! shadow-[0px_0px_10px_#000]"
                >
                  <p> Name: {value.name} - Age: {value.age} </p>
                </button>
              ))}
            </Modal.Content>
            <Modal.Actions>
              <ActionButton disabled={isLoading} type="button" onClick={() => setIsModalOpen(false)} className="h-8 w-25 rounded-md!" >
                Cancel
              </ActionButton>
              <ActionButton disabled={isLoading} type="button" color="gold" className="h-8 w-full rounded-md!" onClick={handleCancelSaveExistingPatient}>
                No, I want to create a new folder
              </ActionButton>
            </Modal.Actions>
          </Modal.Root>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TreatmentPlanForm;
