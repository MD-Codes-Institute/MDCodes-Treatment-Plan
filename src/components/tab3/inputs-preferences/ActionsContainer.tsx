import { localCurrency, codeValue, productValue, productsProfit, classInputs, PreferencesData } from "../../../contents/tabs/ContentsTab3";
import { useState } from "react";
import ModalPreferences from "./Modal";

const ActionsContainer: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const [data, setData] = useState<PreferencesData | null>(null);
  const openModal = (data: PreferencesData) => {
    setData(data);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setData(null);
  };
  const saveDb = () => {};
  const editDb = () => {};
  const doYouNeedHelp = (state: boolean) => {
    setNeedHelp(state);
  };
  return (
    <div className="w-[70%] grid grid-flow-col grid-rows-4 gap-3">
      <button style={classInputs} onClick={() => openModal(localCurrency)}>
        Local Currency
      </button>
      <button style={classInputs} onClick={() => {openModal(codeValue); doYouNeedHelp(true);}}>
        Code value
      </button>
      <button style={classInputs} onClick={() => openModal(productValue)}>
        Product value
      </button>
      <button style={classInputs} onClick={() => openModal(productsProfit)}>
        Profit margin
      </button>
      {modal && data && (
        <ModalPreferences dataType={data} editDb={editDb} saveDb={saveDb} closeModal={closeModal} doYouNeedHelp={doYouNeedHelp} needHelp={needHelp}/>
      )}
    </div>
  );
};

export default ActionsContainer;
