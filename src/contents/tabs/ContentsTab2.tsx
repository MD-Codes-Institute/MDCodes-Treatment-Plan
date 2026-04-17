import { scale, stagger, type Variants } from "framer-motion";

export const volumes = [
  "0",
  "0.05",
  "0.1",
  "0.15",
  "0.2",
  "0.25",
  "0.3",
  "0.4",
  "0.5",
  "0.6",
  "0.7",
  "0.8",
  "0.9",
  "1",
];
export const products = ["VM", "VX", "VL", "VB", "BTX", "HACA", "SKV", "VT"];
export const regions = [
  {
    area: "counter_lower",
    values: ["C1", "C2", "C3", "C4", "C5", "C6", "Jw1", "Jw2", "Jw3", "Jw4", "Jw5"],
  },
  { area: "countor_upper", values: ["T1", "T2"] },
  { area: "foundation", values: ["Ck1", "Ck2", "Ck3", "Ck4", "Ck5"] },
  {
    area: "refinement_periorbital",
    values: ["Tt1", "Tt2", "Tt3", "O1", "O2", "O3", "E1", "E2", "E3", "F1", "F2", "F3", "G1", "G2"],
  },
  {
    area: "refinement_perioral",
    values: [
      "N1",
      "N2",
      "N3",
      "N4",
      "N5",
      "NL1",
      "NL2",
      "NL3",
      "Lp¹",
      "Lp₁",
      "Lp2",
      "Lp³",
      "Lp₃",
      "Lp4",
      "Lp5",
      "Lp6",
      "Lp7",
      "Lp⁸",
      "Lp₈",
      "M1",
      "M2",
      "M3",
    ],
  },
];
// conteudos da tab2 => criação da planilha de códigos
export type Row = {
  id: string;
  code: string;
  product: string;
  right: string;
  mid: string;
  left: string;
};
export interface InfosCodeList {
  code: string;
  region: string;
}
export interface PropsModal {
  codeList: InfosCodeList[];
}
export interface TreatmentItem {
  code: string;
  product: string;
  right: string;
  mid: string;
  left: string;
}
export interface Patients {
  id: string;
  namePatient: string;
  patientAge: string;
  treatmentPlan: [{ dateTreatment: string; rows: TreatmentItem[] }];
}
export interface PropsPlanModal {
  patients: Patients[];
}

export const variantsDetails: Variants = {
  hidden: { opacity: 0 },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    height: 0,
    zIndex: -5,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
  },
};

export const classBtnPrice = {
  color: "#fff",
  border: "1px solid #fff",
  borderRadius: "0.5rem",
  height: "2.5rem",
  width: "6rem",
  background: "#967F43",
  boxShadow: "0px 0px 7px #967F43",
};

export const dragConstraints = {
  top: 0,
  bottom: 0,
  left: -10,
  right: 0,
};

export const containerVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};
export const itemVariants = {
  hidden: {
    x: -10,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};
export const variantsViewPlaModal: Variants = {
  hidden: { opacity: 0, y: -100, transition: { duration: 0.5, ease: "easeInOut" } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

export const variantsBtnArrow: Variants = {
  initial: { rotateX: 0 },
  animate: { rotateX: 0, transition: { duration: 0.7, ease: "easeInOut" } },
  hidden: { rotateX: 180, transition: { duration: 0.7, ease: "easeInOut" } },
};
