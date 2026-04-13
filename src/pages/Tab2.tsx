import { IonContent, IonPage } from "@ionic/react";
import useTab2Handlers from "../components/hooks/useTab2Handlers";
import Loader from "../components/Loader";
import "./Tab2.css";
import AddInfoModal from "../components/tab2/AddInfoModal";
import { useEffect } from "react";
import hasPatientData from "../services/database/hasPatientData";
import { useState } from "react";
import { useLocation } from "react-router";
import GoToTab1 from "../components/tab2/GoToTab1";
import ViewPlanModal from "../components/tab2/ViewPlanModal";

const Tab2: React.FC = () => {
  const { username, loading, user } = useTab2Handlers();
  const [hasPatient, setHasPatient] = useState<boolean>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [patients, setPatients] = useState<any>();
  const location = useLocation();
  const localDb = JSON.parse(localStorage.getItem("codeList") || "[]");
  useEffect(() => {
    if (!user) return;
    hasPatientData(user.uid).then((v) => {
      setHasPatient(v.state);
      if (v.state) setPatients(v.dataPatients || "[]");
    });
    localDb.length > 0 && location.pathname === "/tabs/tab2"
      ? setOpenModal(true)
      : setOpenModal(false);
  }, [user, location.pathname]);
  if (loading) return <Loader />;

  if (!user) return null;
  return (
    <>
      {openModal && <AddInfoModal codeList={localDb} />}
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
            {hasPatient && <ViewPlanModal patients={patients}/>}
          </section>
          <GoToTab1 />
        </IonContent>
      </IonPage>
    </>
  );
};
export default Tab2;
