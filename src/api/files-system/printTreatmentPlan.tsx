import { pdf } from "@react-pdf/renderer";
import PdfTreatmentPlan from "../../components/PdfTreatmentPlan";
import { Filesystem, Directory, WriteFileResult } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import type { PatientFormatted } from "../../types/Patients";

const convertBlobToBase = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Error in convert to PDF, please try again later."));
        return;
      }
      resolve(reader.result.split(",")[1]);
    };

    reader.onerror = () =>
      reject(
        reader.error ?? new Error("Error in our system, please try again later")
      );
    reader.readAsDataURL(blob);
  });
};

export const printTreatment = async (patient: PatientFormatted) => {
  try {
    const blob = await pdf(<PdfTreatmentPlan patient={patient} />).toBlob();
    const base64 = await convertBlobToBase(blob);

    const file: WriteFileResult = await Filesystem.writeFile({
      path: `treatment-plan.pdf`,
      data: base64,
      directory: Directory.Cache,
    });

    await Share.share({
      title: "Treatment Plan",
      files: [file.uri],
      dialogTitle: "Save or share your treatment",
    });
  } catch (err) {
    console.error("Error in print your file", err);
  }
};
