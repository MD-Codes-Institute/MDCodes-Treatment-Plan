import { IonContent, IonPage } from "@ionic/react";
import { volumes } from "../data/tabs/ContentsTab2";
import { Modal } from "../components/modal";
import ActionButton from "../components/button/ActionButton";
import Loader from "../components/Loader";
import "./TreatmentPlanForm.css";
import { useTreatmentPlanForm } from "../hooks/useTreatmentPlanForm";
import { useInputToggle } from "../hooks/useInputToggle";

const TreatmentPlanForm: React.FC = () => {
  const form = useTreatmentPlanForm();
  const toggleInput = useInputToggle();

  if (form.isLoading) {
    return <Loader />;
  }

  return (
    <IonPage>
      <IonContent>
        <section className="h-full w-full flex items-center justify-center flex-col gap-5 pt-10">
          <h1 className="text-white font">Save Treatment Plan</h1>

          <form
            onSubmit={form.formProps.handleSubmit(form.onSubmit)}
            id="save-patient"
            className="flex flex-col gap-2 w-full h-full items-center justify-start overflow-y-auto"
          >
            <div className="flex flex-col items-start justify-between w-full px-8 gap-3 mb-4">
              <p className="text-white text-sm font-bold">
                {" "}
                Date: {form.dateNow}{" "}
              </p>
              <label htmlFor="age" className="text-white">
                Age:
              </label>
              <input
                type="number"
                inputMode="numeric"
                max={100}
                className="rounded-md! custom-input max-w-20"
                {...form.formProps.register("age")}
              />
              {form.formProps.formState.errors.age && (
                <p className="text-red-500!">
                  {form.formProps.formState.errors.age.message}
                </p>
              )}

              <label htmlFor="name" className="text-white">
                Name:
              </label>
              <input
                type="text"
                className="rounded-md! custom-input w-full max-w-150!"
                {...form.formProps.register("name")}
              />
              {form.formProps.formState.errors.name && (
                <p className="text-red-500!">
                  {form.formProps.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <div className="w-full grid grid-cols-5 grid-flow-col gap-5 px-3 whitespace-nowrap place-items-center title-container">
                <p>Code</p>
                <p>Product</p>
                <p>Right</p>
                <p>Mid</p>
                <p>Left</p>
              </div>
              {form.fields.map((item, index) => (
                <li
                  key={item.id}
                  className="w-full grid grid-cols-5 grid-flow-col gap-5 px-3 place-items-center register-list"
                >
                  <input
                    {...form.formProps.register(
                      `treatmentPlan.cart.${index}.code`
                    )}
                    disabled
                    className="whitespace-nowrap max-w-15!"
                  />
                  {!toggleInput.isInputActive(
                    index,
                    undefined,
                    item.product
                  ) && (
                    <select
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.product`
                      )}
                      onChange={(e) =>
                        e.target.value === "Other" &&
                        toggleInput.toggleInput(index, undefined, item.product)
                      }
                    >
                      {form.databaseProducts.map((product) => (
                        <option key={product}>{product}</option>
                      ))}
                    </select>
                  )}
                  {toggleInput.isInputActive(
                    index,
                    undefined,
                    item.product
                  ) && (
                    <input
                      type="text"
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.product`
                      )}
                      onBlur={(e) =>
                        toggleInput.handleBlurInput(
                          index,
                          e.target.value,
                          form.formProps,
                          undefined,
                          item.product
                        )
                      }
                      autoFocus
                    />
                  )}
                  {!toggleInput.isInputActive(index, "right") && (
                    <select
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.right`
                      )}
                      onChange={(e) =>
                        e.target.value === "Other" &&
                        toggleInput.toggleInput(index, "right")
                      }
                    >
                      {volumes.map((volume, idx) => (
                        <option key={volume + idx}>{volume}</option>
                      ))}
                    </select>
                  )}
                  {toggleInput.isInputActive(index, "right") && (
                    <input
                      type="text"
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.right`
                      )}
                      onBlur={(e) =>
                        toggleInput.handleBlurInput(
                          index,
                          e.target.value,
                          form.formProps,
                          "right"
                        )
                      }
                      autoFocus
                    />
                  )}
                  {!toggleInput.isInputActive(index, "mid") && (
                    <select
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.mid`
                      )}
                      onChange={(e) =>
                        e.target.value === "Other" &&
                        toggleInput.toggleInput(index, "mid")
                      }
                    >
                      {volumes.map((volume, idx) => (
                        <option key={volume + idx}>{volume}</option>
                      ))}
                    </select>
                  )}
                  {toggleInput.isInputActive(index, "mid") && (
                    <input
                      type="text"
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.mid`
                      )}
                      onBlur={(e) =>
                        toggleInput.handleBlurInput(
                          index,
                          e.target.value,
                          form.formProps,
                          "mid"
                        )
                      }
                      autoFocus
                    />
                  )}
                  {!toggleInput.isInputActive(index, "left") && (
                    <select
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.left`
                      )}
                      onChange={(e) =>
                        e.target.value === "Other" &&
                        toggleInput.toggleInput(index, "left")
                      }
                    >
                      {volumes.map((volume, idx) => (
                        <option key={volume + idx}>{volume}</option>
                      ))}
                    </select>
                  )}
                  {toggleInput.isInputActive(index, "left") && (
                    <input
                      type="text"
                      {...form.formProps.register(
                        `treatmentPlan.cart.${index}.left`
                      )}
                      onBlur={(e) =>
                        toggleInput.handleBlurInput(
                          index,
                          e.target.value,
                          form.formProps,
                          "left"
                        )
                      }
                      autoFocus
                    />
                  )}
                </li>
              ))}
            </div>
          </form>
          <div className="flex flex-row w-[90%] gap-5 items-center justify-between my-2 pb-5">
            <ActionButton
              type="button"
              disabled={form.isModalOpen}
              onClick={() => form.history.push("/tabs/tab1")}
              className="h-8 w-auto px-5! rounded-md!"
            >
              Return
            </ActionButton>
            <ActionButton
              type="button"
              onClick={form.deleteCart}
              disabled={form.isModalOpen}
              className="h-8 w-auto px-5! rounded-md!"
              color="warning"
            >
              Delete Treatment Plan
            </ActionButton>
            <ActionButton
              type="submit"
              form="save-patient"
              className="h-8 w-auto px-5! rounded-md!"
              color="gold"
              disabled={form.isLoading}
            >
              Save
            </ActionButton>
          </div>
        </section>
        {form.isModalOpen && form.displayed && form.displayed.length >= 1 && (
          <Modal.Root className="h-[70vh] w-[90vw] items-center justify-start pt-10">
            <Modal.Header>
              <Modal.Title className="text-[23px]! md:text-[28px]! text-center py-10">
                Do you want to add this patient to a folder?
              </Modal.Title>
            </Modal.Header>
            <Modal.Content className="gap-5 px-10 flex-col">
              <p className="text-md text-white">
                {" "}
                If desired, click on a folder to insert this treatment plan.{" "}
              </p>
              {form.displayed.map((value) => (
                <button
                  key={value.id}
                  onClick={() =>
                    form.handleSaveExistingPatient(
                      value.id,
                      form.treatmentPlan!
                    )
                  }
                  className="w-full h-[7vh] bg-(--ion-background-inputs) flex flex-row items-center justify-center gap-5 rounded-md! shadow-[0px_0px_10px_#000]"
                >
                  <p>
                    Name: {value.name} - Age: {value.age}{" "}
                  </p>
                </button>
              ))}
            </Modal.Content>
            <Modal.Actions>
              <ActionButton
                disabled={form.isLoading}
                type="button"
                onClick={() => form.setIsModalOpen(false)}
                className="h-8 w-25 rounded-md!"
              >
                Cancel
              </ActionButton>
              <ActionButton
                disabled={form.isLoading}
                type="button"
                color="gold"
                className="h-8 w-full rounded-md!"
                onClick={form.handleCancelSaveExistingPatient}
              >
                No, I want to create a new patient
              </ActionButton>
            </Modal.Actions>
          </Modal.Root>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TreatmentPlanForm;
