// import CartContext from "../contexts/CartContext";
import { getPatients } from "../api/database/getPatients";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Patient, PatientFormatted, TreatmentPlan } from "../types/Patients";
import { useAuth } from "./AuthContext";
import { push, set, child, remove, type DatabaseReference } from "firebase/database";
import { patientsDatabase } from "../api/routes/patients";
import { flushSync } from "react-dom";

type PatientResponse = { message: string; status: number };

interface PatientProps {
  displayed: PatientFormatted[] | null;
  isLoading: boolean;
  searchPatient: (name: string) => void;
  saveNewPatient: (infoPatient: Patient, treatmentPlan: TreatmentPlan) => Promise<PatientResponse>;
  saveExistingPatient: (
    patientId: string,
    treatmentPlan: TreatmentPlan
  ) => Promise<PatientResponse>;
  deletePatient: (patientId: string, planId?: string) => Promise<PatientResponse>;
  patients: PatientFormatted[] | null;
}

const PatientContext = createContext<PatientProps | undefined>(undefined);

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [patients, setPatients] = useState<PatientFormatted[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [databaseRef, setDatabaseRef] = useState<DatabaseReference | null>(null);
  const [query, setQuery] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setDatabaseRef(patientsDatabase(user.uid));
    getPatients(user.uid).then((res) => {
      if (res.havePatient) {
        setPatients(res.dataPatient);
      }
      setIsLoading(false);
    });
  }, [user]);

  const displayed = useMemo(() => {
    const existingPatient = query
      ? patients?.filter((value) => value.name.toLowerCase().includes(query.toLowerCase()))
      : patients;
    return existingPatient ?? [];
  }, [query, patients]);

  const searchPatient = (name: string) => {
    flushSync(() => setQuery(name));
  };

  const saveNewPatient = async (
    infoPatient: Patient,
    treatment: TreatmentPlan
  ): Promise<PatientResponse> => {
    if (!user) return { message: "User not found", status: 404 };
    if (!databaseRef) return { message: "Database reference not set", status: 500 };
    setIsLoading(true);
    try {
      const newPatientId = push(databaseRef);
      const newPlanId = push(child(newPatientId, `treatmentPlan`));
      const { age, name } = infoPatient;
      const newData: Patient = {
        age,
        name,
        treatmentPlan: { [newPlanId.key]: treatment },
      };
      await set(newPatientId, newData);
      await user.reload();
      return { message: "Patient created successfully", status: 201 };
    } catch (err) {
      if (err instanceof Error) {
        return { message: err.message, status: 500 };
      }
      return { message: "Unknow error, please try again later", status: 400 };
    } finally {
      setIsLoading(false);
    }
  };

  const saveExistingPatient = async (
    patientId: string,
    treatmentPlan: TreatmentPlan
  ): Promise<PatientResponse> => {
    if (!user) return { message: "User not found", status: 404 };
    if (!databaseRef) return { message: "Database reference not set", status: 500 };
    setIsLoading(true);
    try {
      const newPlanId = push(child(databaseRef, `${patientId}/treatmentPlan`));
      await set(newPlanId, treatmentPlan);
      await user.reload();
      return { message: "TreatmentPlan created successfully", status: 201 };
    } catch (err) {
      if (err instanceof Error) {
        return { message: err.message, status: 500 };
      }
      return { message: "Unknow error, please try again later", status: 500 };
    } finally {
      setIsLoading(false);
    }
  };

  const deletePatient = async (patientId: string, planId?: string): Promise<PatientResponse> => {
    if (!user) return { message: "User not found", status: 404 };
    if (!databaseRef) return { message: "Database reference not set", status: 500 };
    setIsLoading(true);
    try {
      if (planId !== undefined && planId !== null) {
        await remove(child(databaseRef, `${patientId}/treatmentPlan/${planId}`));
        user.reload();
        return { message: "Success in deleting Treatment Plan of this patient.", status: 204 };
      }
      await remove(child(databaseRef, patientId));
      await user.reload();
      return { message: "Success in deleting patient.", status: 204 };
    } catch (err) {
      if (err instanceof Error) {
        return { message: err.message, status: 500 };
      }
      return { message: "Unknow error, please try again later", status: 500 };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        displayed,
        isLoading,
        searchPatient,
        saveNewPatient,
        saveExistingPatient,
        deletePatient,
        patients,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("O PatientCcontext deve ser utilizado dentro de tab2 ou saveTreatmentPlan");
  }
  return context;
};
