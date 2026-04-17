import useViewPlanModal from "../hooks/useViewPlanModal";
import { PropsPlanModal, TreatmentItem, variantsBtnArrow } from "../../contents/tabs/ContentsTab2";
import SearchPatient from "./SearchPatient";
import { useState } from "react";
import ExpandableDetails from "./ExpandableDetails";
import ViewPlanModal from "./ViewPlanModal";
import { AnimatePresence, motion } from "framer-motion";
import BtnOption from "./BtnOption";

const PatientsPlans = ({ patients }: PropsPlanModal) => {
  const {
    handleSearch,
    handleClearSearch,
    handleOpenPlans,
    handleClosePlans,
    handleCancelBtnsOptions,
    handlePressStart,
    handlePressEnd,
    openPlan,
    listPatient,
    openBtnOptionId,
    setFilterPatient,
    filterPatient,
    isLongPressRef,
  } = useViewPlanModal(patients);
  const [treatmentPlan, setTreatmentPlan] = useState<
    { dateTreatment: string; rows: TreatmentItem[] }[] | null
  >(null);
  const [namePatient, setNamePatient] = useState<string>("");
  const [patientAge, setPatientAge] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");

  return (
    <div className="w-full">
      <SearchPatient
        handleClear={handleClearSearch}
        handleSearch={handleSearch}
        filterPatient={filterPatient}
        setFilterPatient={setFilterPatient}
      />
      <div className="mt-10 overflow-y-auto overflow-x-hidden flex flex-col gap-3">
        {listPatient.map((v, i) => (
          <div key={i}>
            <motion.div
              className={`bg-(--ion-background-inputs) py-3 ${
                openPlan && patientId == v.id ? "rounded-t-xl" : "rounded-xl"
              } flex flex-nowrap w-full`}
              onPointerDown={() => {
                handlePressStart(v.id), setPatientId(v.id);
              }}
              onPointerUp={handlePressEnd}
              onPointerLeave={handlePressEnd}
            >
              <p
                className="text-white w-full px-2 flex flex-nowrap justify-between items-center"
                onClick={() => {
                  setTreatmentPlan(v.treatmentPlan),
                    setNamePatient(v.namePatient),
                    setPatientAge(v.patientAge);
                  setPatientId(v.id);
                  if (isLongPressRef.current) return;
                  openPlan && v.id === patientId ? handleClosePlans() : handleOpenPlans();
                }}
              >
                Patient: {v.namePatient} - Age: {v.patientAge}
                {v.treatmentPlan.length > 1 && openBtnOptionId !== v.id && (
                  <motion.img
                    src="/resources/icon-arrow.png"
                    className="h-6 px-5"
                    variants={variantsBtnArrow}
                    animate={openPlan && v.id === patientId ? "hidden" : "animate"}
                  />
                )}
                {openBtnOptionId === v.id && (
                  <BtnOption id={openBtnOptionId} handleCancelOption={handleCancelBtnsOptions} />
                )}
                {v.treatmentPlan.length === 1 && openBtnOptionId !== v.id && (
                  <span>Save: {v.treatmentPlan[0].dateTreatment}</span>
                )}
              </p>
            </motion.div>
            <AnimatePresence>
              {openPlan && treatmentPlan && treatmentPlan.length > 1 && v.id === patientId && (
                <ViewPlanModal
                  handleClosePlans={handleClosePlans}
                  treatmentPlan={treatmentPlan}
                  namePatient={namePatient}
                  patientAge={patientAge}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {openPlan && treatmentPlan && treatmentPlan.length === 1 && v.id === patientId && (
                <ExpandableDetails
                  handleClosePlans={handleClosePlans}
                  treatmentPlan={treatmentPlan}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPlans;
