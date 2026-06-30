import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useCart } from "../contexts/CartContext";
import { usePatient } from "../contexts/PatientsContext";
import { add } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { PatientFormatted } from "../types/Patients";
import { AnimatePresence } from "framer-motion";
import Card from "../components/Card";
import Loader from "../components/Loader";
import arrowIcon from "/resources/icon-arrow.png";
import PatientDetailsPage from "../components/PatientDetailsPage";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const { searchPatient, displayed, isLoading, patients } = usePatient();
  const [activePatient, setActivePatient] = useState<PatientFormatted | null>(null);
  const [isPageOpen, setIsPageOpen] = useState<boolean>(false);

  const history = useHistory();
  const { cart } = useCart();

  useEffect(() => {
    if (cart.length >= 1) history.push("/tabs/tab2/save-treatmentplan");
  }, [cart, history]);

  const openPage = (patient: PatientFormatted) => {
    setActivePatient(patient);
    setIsPageOpen(true);
  };

  const closePage = () => {
    setIsPageOpen(false);
    setActivePatient(null);
  };

  if (isLoading) return <Loader />;

  if (!patients) {
    return (
      <h1 className="text-white text-md md:text-lgc text-center fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%]">
        You dont have patient's saved. First you needed save patient's for to view them here
      </h1>
    );
  }

  return (
    <IonPage>
      <IonContent>
        <section className="flex flex-col gap-5 items-center justify-center">
          <h1 className="text-white text-3xl! text-start w-[90%] sticky top-15">Treatment Plans</h1>
          <section className="w-[90%] flex flex-col gap-10 items-center justify-center mt-15">
            <div className="w-full flex flex-col gap-2 ">
              <label htmlFor="search" className="text-start w-full">
                Search your patient
              </label>
              <div className="flex flex-row search-input">
                <input
                  id="search"
                  placeholder="Ex: Mauricio de Maio"
                  onChange={(e) => searchPatient(e.target.value)}
                  className="border border-[#ffcc66] focus:shadow-[0px_0px_5px_#ffcc66] rounded-xl h-8 p-5 w-full outline-none text-white"
                />
              </div>
            </div>
            <aside className="w-full flex flex-col gap-3">
              {displayed!.map((value) => (
                <button onClick={() => openPage(value)} key={value.id}>
                  <Card className="flex-row items-center justify-between whitespace-nowrap text-[14px]">
                    <p>{value.name} - <span>Last save: {value.treatmentPlan.at(-1)!.dateTreatment}</span> </p>
                    <img src={arrowIcon} className="w-8" />
                  </Card>
                </button>
              ))}
              <AnimatePresence>
                {isPageOpen && activePatient !== null && (
                  <PatientDetailsPage patient={activePatient} closePage={closePage} />
                )}
              </AnimatePresence>
            </aside>
          </section>
          {!isPageOpen && (
            <div className="h-20 fixed bottom-0 left-1/2 -translate-x-1/2">
              <IonButton routerLink="/tabs/tab1" className="icon-add">
                <IonIcon icon={add} />
              </IonButton>
            </div>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};
export default Tab2;
