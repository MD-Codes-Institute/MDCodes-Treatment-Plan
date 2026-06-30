import {
  PatientFormatted,
  PromiseResolved,
  TreatmentPlan,
  PatientRaw,
} from "../../types/Patients";
import { patientsDatabase } from "../routes/patients";
import { get } from "firebase/database";

export const getPatients = async (uid: string): Promise<PromiseResolved> => {
  if (!uid) {
    return {message: "The user needs to log in to make the request.", status: 404, havePatient: false }}

  const snapshot = await get(patientsDatabase(uid));

  if (!snapshot.exists()) {
    return { message: "There no are patients", status: 404, havePatient: false };
  }

  const rawPatient = snapshot.val() as PatientRaw;
  const dataPatient: PatientFormatted[] = Object.entries(rawPatient).map(([key, value]) => {
    const objPlan = value.treatmentPlan ?? {}
    const treatmentPlan = Object.entries(objPlan).map(([idPlan, itemPlan]) => {
        return{ idPlan: idPlan, ...(itemPlan as TreatmentPlan) } 
    })
      return {
        id: key,
        name: value.name,
        age: value.age,  
        treatmentPlan: treatmentPlan
      };
    }
  );
  return { message: "Sucess in get all patients", status: 200, havePatient: true, dataPatient: dataPatient };
};
