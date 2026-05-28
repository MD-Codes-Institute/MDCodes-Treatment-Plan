import useUserInfo from "../api/auth/getUserInfo";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { patientsDb } from "../firebaseConfig";
import { push, set, remove, child, query, orderByChild, get, equalTo } from "firebase/database";
import { regions } from "../contents/tabs/ContentsTab2";
import { getProfilePreferences } from "../services/database/preferencesProfile";
import getValueForCode from "../contents/tabs/getValueForCode";

const useTab2Handlers = () => {
  const { user } = useAuth();
  const { userInfo, getCredentialUser } = useUserInfo();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    if (!user) return;
    getCredentialUser(user.uid).then(() => {});
    const findValue = userInfo.find((v) => v.id === "Name");
    findValue && setUsername(findValue.info);
    getProfilePreferences(user.uid).then((v) => {
      setPreferences([v?.local_currency, v?.code_value, v?.product_value, v?.profit_margin]);
    });
    setTimeout(() => setLoading(false), 1000);
  }, [user, userInfo]);

  const handleDeleteLocalDb = () => {
    const deleteDb = confirm(
      "Do you want to delete your treatment plan? Your changes were not saved."
    );
    if (deleteDb) {
      localStorage.removeItem("codeList");
      window.location.reload();
    }
  };

  const handleSavePatient = async (data: any) => {
    try {
      if (!user) return null;
      const confirmChanges = confirm(
        "Are you sure about these changes? Because, after this action, it will not be possible to alter the patient's treatment plan. Please review the treatment plan."
      );
      if (confirmChanges) {
        const ref = patientsDb(user.uid);
        // Search for existing patient by name and date of birth
        const consultation = query(
          ref,
          orderByChild("namePatient".trim()),
          equalTo(data.namePatient)
        );
        const snapshot = await get(consultation);
        if (snapshot.exists()) {
          // Check among results if any has the same dateBirth
          let existingPatientKey: string | null = null;
          snapshot.forEach((childSnapshot) => {
            if (childSnapshot.val().dateBirth === data.dateBirth) {
              existingPatientKey = childSnapshot.key;
            }
          });
          if (existingPatientKey) {
            const existingTreatments =
              snapshot.child(existingPatientKey).val()?.treatmentPlan || {};
            const nextIndex = Object.keys(existingTreatments).length; // 0 se vazio
            const targetRef = child(ref, `${existingPatientKey}/treatmentPlan/${nextIndex}`);
            await set(targetRef, data.treatmentPlan);
            localStorage.removeItem("codeList");
            alert("Treatment plan added to existing patient.");
            window.location.reload();
            return { message: "Treatment plan added to existing patient", status: 200 };
          }
        }

        // Patient does not exist → create a new folder for them
        const newPatient = push(ref);
        await set(newPatient, { ...data, treatmentPlan: { 0: data.treatmentPlan } });
        localStorage.removeItem("codeList");
        alert("Treatment plan created for new patient.");
        window.location.reload();
        return { message: "New patient created successfully", status: 201 };
      } else {
        return { message: "User reviewing changes", status: 204 };
      }
    } catch (err) {
      console.log(err);
      return { message: "Error saving patient", status: 400 };
    }
  };

  const handleDeletePatient = async (id: string, indice?: number) => {
    try {
      if (!user) return null;
      const db = patientsDb(user.uid);
      if (indice !== null && indice !== undefined) {
        const referenceList = child(db, `${id}/treatmentPlan/${indice}`);
        await remove(referenceList);
      } else {
        const patientRef = child(db, id);
        await remove(patientRef);
      }
      return { message: "Sucess", status: 200 };
    } catch (err) {
      console.log("error to delete patient", err);
      return { message: err, status: 400 };
    }
  };

  const handlePriceTreatment = async (patient: any) => {
    if (!patient?.treatmentPlan) {
      console.error("treatmentPlan is undefined", patient);
      return;
    }
    const [localCurrency, codeValue, productValue, profitMargin] = preferences;
    patient.treatmentPlan.forEach((item: any) => {
      const { code, product, right, left, mid } = item;
      const treatedRegion = regions.filter((v) => v.values.includes(code.trim()));
      const productApply = Number(productValue[product.toLowerCase()]);
      const sideRight = Number(right);
      const sideMid = Number(mid);
      const sideLeft = Number(left);
      const regionValue = Number(codeValue[treatedRegion[0].area]);
    });
  };

  const fillVolumeCodeApply = (i: number, code: string, setValue: any) => {
    const res = getValueForCode(code);
    setValue(`treatmentPlan.rows.${i}.right`, res.right);
    setValue(`treatmentPlan.rows.${i}.mid`, res.mid);
    setValue(`treatmentPlan.rows.${i}.left`, res.left);
    setValue(`treatmentPlan.rows.${i}.product`, res.product);
  };
  return {
    username,
    user,
    loading,
    handleDeleteLocalDb,
    handleSavePatient,
    handleDeletePatient,
    handlePriceTreatment,
    fillVolumeCodeApply,
  };
};

export default useTab2Handlers;
