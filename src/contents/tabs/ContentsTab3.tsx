const localCurrency = {
  id: "local_currency",
  title: "Currency",
  action: "local_currency",
  texts: ["Write your currency"]
};
const codeValue = {
  id: "code_value",
  title: "Enter the price you charge per region",
  action: "code_value",
  texts: [
    "Foundation",
    "Contour Upper Face",
    "Contour Lower Face",
    "Refinement Periorbital",
    "Refinement Perioral",
  ],
};
const productsProfit = {
  id: "productsProfit",
  title: "Enter the price you charge per region",
  action: "profit_margin",
  texts: ["VM", "VX", "VL", "VB", "BTX", "HACA", "SKV"],
  placeholder: "%",
};
const productValue = {
  id: "productsValue",
  title: "Please enter the product value",
  action: "product_value",
  texts: ["VM", "VX", "VL", "VB", "BTX", "HACA", "SKV"],
};

const classInputs = {
  color: "#FFF",
  borderRadius: "0.5rem",
  boxShadow: "0px 0px 2px #000",
  background: "var(--ion-background-inputs)",
  height: "2.5rem"
};
export interface PreferencesData {
  id: string;
  title: string;
  action: string;
  texts?: string[];
  placeholder?: string;
}
export interface ModalProps {
  dataType: PreferencesData | null;
  needHelp?: boolean;
  closeModal: () => void;
  saveDb: () => void | Promise<void>;
  editDb: () => void | Promise<void>;
  doYouNeedHelp: (state: boolean) => void;
}
export { localCurrency, codeValue, productValue, productsProfit, classInputs };
