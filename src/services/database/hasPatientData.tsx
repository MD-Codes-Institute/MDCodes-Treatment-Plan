import { patientsDb } from "../../firebaseConfig";
import { get } from "firebase/database";

const hasPatientData = async (uid: string) => {
  const database = patientsDb(uid);
  const snapshot = await get(database);
  if (snapshot.exists()) {
    const rawData = snapshot.val();
    const dataPatients = Object.entries(rawData).map(([id, infoPatient]) => {
      return {
        id,
        ...(infoPatient as any),
      };
    });
    return { message: "Existe pacientes", status: 200, state: true, dataPatients };
  } else {
    return { message: "Não existe pactientes", status: 404, state: false };
  }
};
export default hasPatientData;
