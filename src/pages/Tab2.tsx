import { IonContent, IonPage } from "@ionic/react";
import useTab2Handlers from "../hooks/useTab2Handlers";
import Loader from "../components/Loader";
import "./Tab2.css";
import PatientFormLayout from "../components/tab2/PatientFormLayout";
import { useEffect } from "react";
import hasPatientData from "../services/database/hasPatientData";
import { useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import ActionButton from "../components/button/ActionButton";
import PatientsPlans from "../components/tab2/PatientsPlans";
import iconPlus from "/resources/plus-icon.svg";
import { useCart } from "../contexts/CartContext";
const Tab2: React.FC = () => {
  const { username, loading, user } = useTab2Handlers();
  const { uid } = useCart();
  const [hasPatient, setHasPatient] = useState<boolean>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [patients, setPatients] = useState<any>();
  const location = useLocation();
  const history = useHistory();
  const localDb = JSON.parse(localStorage.getItem("codeList") || "[]");
  useEffect(() => {
    if (!user) return;
    console.log(uid);
    hasPatientData(user.uid).then((v) => {
      setHasPatient(v.state);
      if (v.state) setPatients(v.dataPatients || "[]");
    });
    const showModal =
      localDb.length > 0 && location.pathname === "/tabs/tab2"
        ? setOpenModal(true)
        : setOpenModal(false);
  }, [user, location.pathname]);
  if (loading) return <Loader />;

  if (!user) return null;
  return (
    <>
      {openModal && <PatientFormLayout codeList={localDb} />}
      <IonPage>
        <IonContent>
          <section className="flex justify-center flex-col items-center mt-10 px-5 gap-3">
            <h1 className="text-white text-start w-full">Treatment Plans</h1>
            {!hasPatient && (
              <p className="text-white text-justify">
                No patients could be found. If you haven't saved or started a treatment plan, go to
                the MD Codes tab and start your treatment plan.
              </p>
            )}
            <p className="text-white text-start w-full ">
              Doctor: <span className="text-white font-extrabold">{username}</span>
            </p>
            {hasPatient && <PatientsPlans patients={patients} />}
          </section>
          <ActionButton
            onClick={() => history.push("/tabs/tab1")}
            type="button"
            className="bg-transparent rounded-full! fixed bottom-10 -translate-x-1/2 left-1/2 "
          >
            <img src={iconPlus} alt="icon to add more" width={48} height={48} />
          </ActionButton>
        </IonContent>
      </IonPage>
    </>
  );
};
export default Tab2;
