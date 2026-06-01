import {
  localCurrency,
  codeValue,
  productValue,
  productsProfit,
  classInputs,
  PreferencesData,
  UserProps,
} from "../../../contents/tabs/ContentsTab3";
import { useState } from "react";
import ModalPreferences from "./Modal";
import { set, update } from "firebase/database";
import { profilePreferences } from "../../../api/routes/profile";

const ActionsContainer: React.FC<UserProps> = ({ user, preferences }) => {
  const [modal, setModal] = useState<boolean>(false);
  const [needHelp, setNeedHelp] = useState<boolean>(false);
  const [data, setData] = useState<PreferencesData | null>(null);
  const [disabledInput, setDisabledInput] = useState<boolean>();
  const [action, setAction] = useState<string>();

  const openModal = (data: PreferencesData, action: string) => {
    setAction(action);
    setData(data);
    setModal(true);
    preferences == true ? setDisabledInput(true) : setDisabledInput(false);
  };
  const closeModal = () => {
    setModal(false);
    setData(null);
  };
  const toggleInput = (e: any) => {
    e.preventDefault()
    setDisabledInput(!disabledInput);
  };
  const saveOrUpdateDb = async (
    newData: {
      local_currency?: string[];
      code_value?: string[];
      product_value?: string[];
      profit_margin?: string[];
    }, action: string
  ) => {
    if (preferences === true) {
      update(profilePreferences(user.uid, action), newData).then(() => {
        console.log("dados atualizados");
        window.location.reload()
        setModal(false);
      });
    } else {
      set(profilePreferences(user.uid, action), newData).then(() => {
        console.log("dados adicionados");
        window.location.reload()
        setModal(false);
      });
    }
  };

  const doYouNeedHelp = (state: boolean) => {
    setNeedHelp(state);
  };

  return (
    <div className="w-[70%] grid grid-flow-col grid-rows-4 gap-3">
      <button style={classInputs} onClick={() => openModal(localCurrency, "local_currency")}>
        Local Currency
      </button>
      <button
        style={classInputs}
        onClick={() => {
          openModal(codeValue, "code_value");
          doYouNeedHelp(true);
        }}
      >
        Code value
      </button>
      <button style={classInputs} onClick={() => openModal(productValue, "product_value")}>
        Product value
      </button>
      <button style={classInputs} onClick={() => openModal(productsProfit, "profit_margin")}>
        Profit margin
      </button>

      {modal && data && (
        <ModalPreferences
          toggleInput={toggleInput}
          dataType={data}
          saveOrUpdateDb={saveOrUpdateDb}
          closeModal={closeModal}
          doYouNeedHelp={doYouNeedHelp}
          needHelp={needHelp}
          disabledInput={disabledInput}
          action={action ?? ""}
        />
      )}
    </div>
  );
};

export default ActionsContainer;
