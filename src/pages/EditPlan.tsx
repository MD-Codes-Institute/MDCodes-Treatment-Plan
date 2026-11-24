import Loader from "../components/Loader";
import InputField from "../components/InputField";
import ActionButton from "../components/button/ActionButton";
import "./TreatmentPlanForm.css";
import { useEditPlan } from "../hooks/useEditPlan";
import { useInputToggle } from "../hooks/useInputToggle";

const EditPLan: React.FC = () => {
  const { isLoading, onSubmit, field, form, history, productsList } =
    useEditPlan();
  const toggleInput = useInputToggle();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="flex flex-col gap-2 justify-center items-center px-5 pb-11 mt-15">
      <h1>Edit your Treatment Plan</h1>
      <div className="w-full flex flex-col gap-3">
        <InputField
          control={form.control}
          name="name"
          label="Patient name"
          autoComplete="name"
        />
        <InputField
          control={form.control}
          name="age"
          label="Age patient"
          autoComplete="age"
          inputMode="numeric"
          className="w-25 flex flex-col gap-2"
        />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} id="edit-form">
        <div className="grid grid-cols-5 grid-flow-col gap-5 place-items-center items-center w-full mt-7">
          <p>Code</p>
          <p>Product</p>
          <p>Right</p>
          <p>Mid</p>
          <p>Left</p>
        </div>
        {field.fields.map((field, index) => (
          <div key={field.id}>
            <div className="w-full grid grid-cols-5 grid-flow-col gap-15 px-4 py-1 place-items-center register-list">
              <input
                {...form.register(`treatmentPlan.cart.${index}.code`)}
                disabled
                className="whitespace-nowrap max-w-15!"
              />
              {!toggleInput.isInputActive(index, undefined, field.product) && (
                <select
                  {...form.register(`treatmentPlan.cart.${index}.product`)}
                  onChange={(e) =>
                    e.target.value === "Other" &&
                    toggleInput.toggleInput(index, undefined, field.product)
                  }
                >
                  {productsList.map((product) => (
                    <option key={product}>{product}</option>
                  ))}
                </select>
              )}
              {toggleInput.isInputActive(index, undefined, field.product) && (
                <input
                  type="text"
                  {...form.register(`treatmentPlan.cart.${index}.product`)}
                  onBlur={(e) => {
                    toggleInput.handleBlurInput(
                      index,
                      e.target.value,
                      form,
                      undefined,
                      field.product
                    );
                  }}
                />
              )}
              <input type="text" {...form.register(`treatmentPlan.cart.${index}.right`)} />

              <input type="text" {...form.register(`treatmentPlan.cart.${index}.mid`)} />

              <input type="text" {...form.register(`treatmentPlan.cart.${index}.left`)} />
            </div>
          </div>
        ))}
      </form>
      <div className="fixed bottom-0 bg-(--ion-background-containers) w-full h-11 flex items-center justify-start p-5 gap-5">
        <ActionButton
          type="submit"
          color="gold"
          form="edit-form"
          className="w-[25%] max-w-30 h-7 rounded-md!"
        >
          Update
        </ActionButton>
        <ActionButton
          color="default"
          type="button"
          onClick={() => history.push("tab2")}
          className="w-[25%] max-w-30 h-7 rounded-md!"
        >
          Return
        </ActionButton>
      </div>
    </main>
  );
};
export default EditPLan;
