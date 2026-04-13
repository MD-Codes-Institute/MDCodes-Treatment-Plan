import { useState } from "react";
import { useHistory } from "react-router";
import useTab2Handlers from "../hooks/useTab2Handlers";
import { styleBtn } from "../../contents/tabs/ContentsTab1";
import { PropsModal, InfosCodeList, products, volumes } from "../../contents/tabs/ContentsTab2";
import { useForm } from "react-hook-form";
import PatientForm from "./PatientForm";
import "../../pages/Tab2.css";

const AddInfoModal = ({ codeList }: PropsModal) => {
  const { handleDeleteLocalDb, handleSavePatient, user } = useTab2Handlers();
  const history = useHistory();
  const [localDb] = useState<InfosCodeList[]>(codeList);

  const date = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const codes = localDb.map((v) => v.code);

  if (!user) return null;
  return (
    <section className="fixed inset-0 z-200 flex flex-col bg-(--ion-background-containers)">
      {/* Conteúdo scrollável */}
      <div className="flex-1 overflow-y-auto pb-7">
        <div className="flex flex-col items-center mt-15">
          <PatientForm codeList={codes} date={date} />
        </div>
      </div>
      {/* Botões fixos no fundo */}
      <div className="w-full flex justify-center flex-row px-3 gap-6 py-4 bg-(--ion-background-containers)">
        <button onClick={() => history.push("/tabs/tab1")} style={styleBtn}>
          Back
        </button>
        <button onClick={() => handleDeleteLocalDb()} style={styleBtn}>
          Delete Treatment Plan
        </button>
        <input value="Save" type="submit" form="form-treatment-plan" style={styleBtn} />
      </div>
    </section>
  );
};
export default AddInfoModal;
