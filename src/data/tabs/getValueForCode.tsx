interface ProductInfo {
  product: string;
  right: string;
  left: string;
  mid: string;
}

export const getValueForCode = (code: string): ProductInfo => {
  switch (code) {
    // Cheek (Ck)
    case "Ck1":
      return { right: "0.5", mid: "0", left: "0.5", product: "VM" };
    case "Ck2":
      return { right: "0.2", mid: "0", left: "0.2", product: "VM" };
    case "Ck3":
      return { right: "0.3", mid: "0", left: "0.3", product: "VM" };
    case "Ck4":
      return { right: "0.5", mid: "0", left: "0.5", product: "VM" };
    case "Ck5":
      return { right: "0.5", mid: "0", left: "0.5", product: "VM" };
    // Orbital (O)
    case "O1":
      return { right: "0.2", mid: "0", left: "0.2", product: "VB" };
    case "O2":
      return { right: "0.2", mid: "0", left: "0.2", product: "VB" };
    case "O3":
      return { right: "0.1", mid: "0", left: "0.1", product: "VB" };
    // Eyebrows (E)
    case "E1":
      return { right: "0.2", mid: "0", left: "0.2", product: "VB" };
    case "E2":
      return { right: "0.2", mid: "0", left: "0.2", product: "VB" };
    case "E3":
      return { right: "0.1", mid: "0", left: "0.1", product: "VB" };
    // Temple (T)
    case "T1":
      return { right: "0.5", mid: "0", left: "0.5", product: "VM" };
    case "T2":
      return { right: "0.5", mid: "0", left: "0.5", product: "VM" };
    // Tear trough (Tt)
    case "Tt1":
      return { right: "0.2", mid: "0", left: "0.2", product: "VB" };
    case "Tt2":
      return { right: "0.2", mid: "0", left: "0.2", product: "VB" };
    case "Tt3":
      return { right: "0.1", mid: "0", left: "0.1", product: "VB" };
    // Nasolabial folds (NL)
    case "NL1":
      return { right: "0.3", mid: "0", left: "0.3", product: "VL" };
    case "NL2":
      return { right: "0.2", mid: "0", left: "0.2", product: "VL" };
    case "NL3":
      return { right: "0.2", mid: "0", left: "0.2", product: "VL" };
    // Marionette lines (M)
    case "M1":
      return { right: "0.2", mid: "0", left: "0.2", product: "VL" };
    case "M2":
      return { right: "0.2", mid: "0", left: "0.2", product: "VL" };
    case "M3":
      return { right: "0.1", mid: "0", left: "0.1", product: "VL" };
    // Jawline (Jw)
    case "Jw1":
      return { right: "0.5", mid: "0", left: "0.5", product: "VX" };
    case "Jw2":
      return { right: "0.5", mid: "0", left: "0.5", product: "VX" };
    case "Jw3":
      return { right: "1", mid: "0", left: "1", product: "VX" };
    case "Jw4":
      return { right: "0.5", mid: "0", left: "0.5", product: "VX" };
    case "Jw5":
      return { right: "0.5", mid: "0", left: "0.5", product: "VX" };
    // Chin (C)
    case "C1":
      return { right: "0.5", mid: "0", left: "0.5", product: "VX" };
    case "C2":
      return { right: "0", mid: "0.3", left: "0", product: "VX" };
    case "C3":
      return { right: "0.3", mid: "0", left: "0.3", product: "VX" };
    case "C4":
      return { right: "0", mid: "0.3", left: "0", product: "VX" };
    case "C5":
      return { right: "0.3", mid: "0", left: "0.3", product: "VX" };
    case "C6":
      return { right: "0.5", mid: "0", left: "0.5", product: "VX" };
    // Lip (Lp)
    case "Lp₁":
      return { right: "0.2", mid: "0", left: "0.2", product: "VL" };
    case "Lp¹":
      return { right: "0.2", mid: "0", left: "0.2", product: "VL" };
    case "Lp2":
      return { right: "0.05", mid: "0", left: "0.05", product: "VL" };
    case "Lp³":
      return { right: "0.15", mid: "0", left: "0.15", product: "VL" };
    case "Lp₃":
      return { right: "0.15", mid: "0", left: "0.15", product: "VL" };
    case "Lp4":
      return { right: "0", mid: "0.1", left: "0", product: "VL" };
    case "Lp5":
      return { right: "0.05", mid: "0", left: "0.05", product: "VL" };
    case "Lp6":
      return { right: "0.1", mid: "0", left: "0.1", product: "VL" };
    case "Lp7":
      return { right: "0.05", mid: "0", left: "0.05", product: "VL" };
    case "Lp⁸":
      return { right: "0.25", mid: "0", left: "0.25", product: "VL" };
    case "Lp₈":
      return { right: "0.25", mid: "0", left: "0.25", product: "VT" };
    // Nose (N)
    case "N1":
      return { right: "0", mid: "0.3", left: "0", product: "VM" };
    case "N2":
      return { right: "0", mid: "0.2", left: "0", product: "VM" };
    case "N3":
      return { right: "0", mid: "0.3", left: "0", product: "VM" };
    case "N4":
      return { right: "0", mid: "0.2", left: "0", product: "VM" };
    case "N5":
      return { right: "0", mid: "0.2", left: "0", product: "VM" };
    // Glabella (G)
    case "G1":
      return { right: "0.1", mid: "0", left: "0.1", product: "VB" };
    case "G2":
      return { right: "0.1", mid: "0", left: "0.1", product: "VB" };
    // Forehead (F)
    case "F1":
      return { right: "0.5", mid: "0", left: "0.5", product: "VL" };
    case "F2":
      return { right: "0.5", mid: "0", left: "0.5", product: "VL" };
    case "F3":
      return { right: "0.5", mid: "0", left: "0.5", product: "VB" };
    // Return a default value if no case matches
    default:
      return { right: "0", mid: "0", left: "0", product: "VM" };
  }
};
