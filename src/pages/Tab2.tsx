import { IonContent, IonPage } from "@ionic/react";
import useTab2Handlers from "../components/hooks/useTab2Handlers";
import Loader from "../components/Loader";
import "./Tab2.css";
import AddInfoModal from "../components/tab2/AddInfoModal";
import { useEffect } from "react";
import hasPatientData from "../services/database/hasPatientData";
import { useState } from "react";
import { useLocation } from "react-router";

const Tab2: React.FC = () => {
  const { username, loading, user } = useTab2Handlers();
  const [hasPatient, setHasPatient] = useState<boolean>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const location = useLocation();
  const localDb = JSON.parse(localStorage.getItem("codeList") || "[]");
  useEffect(() => {
    if (!user) return;
    hasPatientData(user.uid).then((v) => {
      console.log(v.message, v.status);
      setHasPatient(v.state);
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
          <section className="flex justify-center flex-col items-center mt-10 px-10">
            <h1 className="text-white text-start w-full">Treatment Plans</h1>
            {!hasPatient && (
              <p className="text-white text-justify">
                No patients could be found. If you haven't saved or started a treatment plan, go to
                the MD Codes tab and start your treatment plan.
              </p>
            )}
          </section>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab2;
