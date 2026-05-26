import { User } from "firebase/auth";

const localCurrency = {
  id: "local_currency",
  title: "Currency",
  texts: [{ id: "currency", value: "Write your currency" }],
};
const codeValue = {
  id: "code_value",
  title: "Enter the price you charge per region",
  texts: [
    { id: "foundation", value: "Foundation" },
    { id: "countor_upper", value: "Contour Upper Face" },
    { id: "counter_lower", value: "Contour Lower Face" },
    { id: "refinement_periorbital", value: "Refinement Periorbital" },
    { id: "refinement_perioral", value: "Refinement Perioral" },
  ],
};
const productsProfit = {
  id: "product_profit",
  title: "Enter the price you charge per region",
  texts: [
    { id: "vm", value: "VM" },
    { id: "vx", value: "VX" },
    { id: "vl", value: "VL" },
    { id: "vb", value: "VB" },
    { id: "btx", value: "BTX" },
    { id: "haca", value: "HACA" },
    { id: "skv", value: "SKV" },
  ],
  placeholder: "%",
};
const productValue = {
  id: "product_value",
  title: "Please enter the product value",
  texts: [
    { id: "vm", value: "VM" },
    { id: "vx", value: "VX" },
    { id: "vl", value: "VL" },
    { id: "vb", value: "VB" },
    { id: "btx", value: "BTX" },
    { id: "haca", value: "HACA" },
    { id: "skv", value: "SKV" },
  ],
};

const classInputs = {
  color: "#FFF",
  borderRadius: "0.5rem",
  boxShadow: "0px 0px 2px #000",
  background: "var(--ion-background-inputs)",
  height: "2.5rem",
};

const classInputDisabled = {
  color: "#ccc",
  opacity: 0.7,
  borderRadius: "0.5rem",
  boxShadow: "0px 0px 2px #000",
  background: "var(--ion-background-inputs)",
  height: "2.5rem",
}

type TextItem = { id: string; value: string };

export interface PreferencesData {
  id: string;
  title: string;
  texts?: TextItem[];
  placeholder?: string;
}

export interface UserProps {
  user: User;
  preferences?: boolean;
}
export interface ModalProps {
  dataType: PreferencesData;
  needHelp?: boolean;
  closeModal: () => void;
  doYouNeedHelp: (state: boolean) => void;
  saveOrUpdateDb: ( newData: { local_currency?: string[]; code_value?: string[]; product_value?: string[]; profit_margin?: string[]; }, action: string
  ) => void | Promise<void>;
  disabledInput?: boolean;
  action: string
  toggleInput: (e: any) => void
}

export interface Inputs {
  local_currency?: string[];
  code_value?: string[];
  product_value?: string[];
  profit_margin?: string[];
}
export { localCurrency, codeValue, productValue, productsProfit, classInputs, classInputDisabled};
