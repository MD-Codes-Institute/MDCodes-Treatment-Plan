import useUserInfo from "../../services/crud-auth/getUserInfo";
import useAuth from "../../pages/auth/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import { patientsDb } from "../../firebaseConfig";
import { push, set, remove, child } from "firebase/database";
import { regions } from "../../contents/tabs/ContentsTab2";
import { getProfilePreferences } from "../../services/database/preferencesProfile";
import getValueForCode from "../../contents/tabs/getValueForCode";

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
        const newPatient = push(patientsDb(user.uid));
        const response = await set(newPatient, data);
        localStorage.removeItem("codeList");
        alert("Treatment plan created");
        window.location.reload();
        return { message: "Sucesso ao cadastrar novo paciente", status: 201 };
      } else {
        return { message: "Usuário revisando alterações", status: 204 };
      }
    } catch (err) {
      return { message: "Error ao cadastrar novo paciente", status: 400 };
    }
  };

  const handleDeletePatient = async (id: string) => {
    try {
      if (!user) return null;
      const db = patientsDb(user.uid);
      const patientRef = child(db, id);
      await remove(patientRef);
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
    setValue(`treatmentPlan.${i}.right`, res.right);
    setValue(`treatmentPlan.${i}.mid`, res.mid);
    setValue(`treatmentPlan.${i}.left`, res.left);
    setValue(`treatmentPlan.${i}.product`, res.product);
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
