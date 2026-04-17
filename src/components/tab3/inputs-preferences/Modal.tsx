import ActionButtons from "./ActionButtons";
import { classInputs, ModalProps, Inputs } from "../../../contents/tabs/ContentsTab3";
import { useForm } from "react-hook-form";
import { auth } from "../../../firebaseConfig";
import { getProfilePreferences } from "../../../services/database/preferencesProfile";
import { useEffect, useState } from "react";

const ModalPreferences: React.FC<ModalProps> = ({
  dataType, doYouNeedHelp, saveOrUpdateDb, needHelp, closeModal, disabledInput, action, toggleInput, 
}) => {
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    await saveOrUpdateDb(data, action);
  };

  useEffect(() => {
    const user = auth.currentUser?.uid;
    if (user) {
      getProfilePreferences(user).then((v) => {
        if (!v) return;
        // Salva a moeda do usuário
        const currency = v.local_currency?.currency || "";
        // Pega os valores salvos no banco para a ação atual
        const dbPreferences = (v as any)[action];
        if (dbPreferences && dataType?.texts) {
          dataType.texts.forEach((item) => {
            const savedValue = dbPreferences[item.id];
            if (savedValue !== undefined) {
              // Valor formatado para exibição (modo desabilitado)
              let formattedValue = savedValue;
              if (action === "product_value" || action === "code_value") {
                // Formata como moeda: "USD 100.00"
                const numValue = String(savedValue);
                formattedValue = `${currency} ${numValue.slice(0, -2)}.${numValue.slice(-2)}`;
              } else if (action === "profit_margin") {
                // Formata com porcentagem: "15%"
                formattedValue = `${savedValue}%`;
              }
              if(disabledInput) setValue(item.id as keyof Inputs, formattedValue)
            }
          });
        }
      });
    }
  }, [action, dataType, setValue, disabledInput]);

  if (!dataType) return null;
  return (
    <div className="min-h-full w-full absolute top-0 flex flex-col justify-center left-0 z-30 overflow-y-hidden bg-(--ion-background-containers) gap-4">
      <h1 className="text-white text-center w-full ">{dataType.title}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-flow-row grid-row-2 gap-5 justify-center items-center min-h-full"
      >
        {disabledInput && (
          <p className="px-10 m-5">
            If you have already saved any of your preferences, click the Edit button to add or
            update your settings.
          </p>
        )}

        {dataType.texts?.map((v, i) => (
          <div key={i} className="grid grid-cols-2 items-center gap-5 px-10 overflow-x-hidden">
            <label className="text-center">{v.value}</label>

            <input
              key={v.id}
              {...register(v.id as keyof Inputs, { required: true })}
              type={ disabledInput ? "text" :  action === "local_currency" ? "text" : "number" }
              min={1}
              max={action === "profit_margin" ? 100 : Infinity}
              inputMode={action === "local_currency" ? "text" : "decimal"}
              style={classInputs}
              disabled={disabledInput}
              placeholder={dataType.placeholder ?? ""}
              className="px-4 w-42"
            />

            {errors[v.id as keyof Inputs] && (
              <span className="text-white w-screen gap-10">This field is required</span>
            )}
          </div>
        ))}

        <ActionButtons
        disabledInput={disabledInput}
          dataType={dataType}
          doYouNeedHelp={doYouNeedHelp}
          saveOrUpdateDb={saveOrUpdateDb}
          needHelp={needHelp}
          closeModal={closeModal}
          action={action}
          toggleInput={toggleInput}
        />
      </form>
    </div>
  );
};
export default ModalPreferences;
