import { TreatmentItem, variantsViewPlaModal } from "../../contents/tabs/ContentsTab2";
import { AnimatePresence, motion } from "framer-motion";
import { MutableRefObject, useMemo } from "react";
import { useState } from "react";
import ExpandableDetails from "./ExpandableDetails";
interface PropsViewModal {
  treatmentPlan: { dateTreatment: string; rows: TreatmentItem[] }[];
  namePatient: string;
  patientAge: string;
  handleClosePlans: () => void;
}

const ViewPlanModal: React.FC<PropsViewModal> = ({
  treatmentPlan,
  namePatient,
  patientAge,
  handleClosePlans,
}) => {
  const [isViewPlanModal, setIsViewPlanModal] = useState<boolean>(false);
  const [listIndex, setListIndex] = useState<number | null>(null);
  const handleTogglePlanModal = () => setIsViewPlanModal(!isViewPlanModal);

  const lastSaveDate = treatmentPlan.at(-1)?.dateTreatment
  return (
    <motion.section
      variants={variantsViewPlaModal}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="view-plan-modal"
    >
      <div className="scroll-content">
        <h2 className="text-white">Treatment Plans: {namePatient}</h2>
        {lastSaveDate && (
          <p className="text-white text-[15px] -mt-2">Last clinical consultation: {lastSaveDate}</p>
        )}
        {treatmentPlan.map((v: any, i: any) => (
          <div key={i} className="flex flex-col">
            <div
              className={`w-full input-info-patient flex flex-col justify-center ${
                isViewPlanModal && listIndex === i ? "open" : ""
              }`}
              onClick={() => {
                handleTogglePlanModal();
                setListIndex(i);
              }}
            >
              {/* container titulos dos planos de tratamento */}{" "}
              <motion.div
                key={i + 1}
                className="relative flex flex-row items-center"
                style={{ userSelect: "none", touchAction: "none" }}
              >
                <p className="text-white text-md text-start">
                  {namePatient} - Age: {patientAge}
                </p>
                <p className="text-white text-[12px] md:text-[15px] absolute right-5">
                  Save: {v.dateTreatment}
                </p>
              </motion.div>
            </div>
            <AnimatePresence>
              {listIndex === i && isViewPlanModal && (
                <ExpandableDetails
                  handleTogglePlanModal={handleTogglePlanModal}
                  treatmentPlan={[treatmentPlan[i]]}
                  isViewPlanModal={isViewPlanModal}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="footer-close">
        <button className="text-white btn-close" onClick={() => handleClosePlans()}>
          Close
        </button>
      </div>
    </motion.section>
  );
};
export default ViewPlanModal;
