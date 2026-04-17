import { TreatmentItem, variantsViewPlaModal } from "../../contents/tabs/ContentsTab2";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ExpandableDetails from "./ExpandableDetails";
import BtnOption from "./BtnOption";
interface PropsViewModal {
  treatmentPlan: { dateTreatment: string; rows: TreatmentItem[] }[];
  namePatient: string;
  patientAge: string;
  handleClosePlans: () => void;
  patientId: string;
  handleCancelBtnsOptions: () => void;
  openBtnOptionId: string | null;
}
const ViewPlanModal: React.FC<PropsViewModal> = (
  { treatmentPlan, namePatient, patientAge, handleClosePlans, patientId, handleCancelBtnsOptions }
) => {
  const [isViewPlanModal, setIsViewPlanModal] = useState<boolean>(false);
  const [listIndex, setListIndex] = useState<number | null>(null);
  const [swipeOpenIndex, setSwipeOpenIndex] = useState<number | null>(null);

  const handleTogglePlanModal = () => setIsViewPlanModal(!isViewPlanModal);

  const onDragEnd = (event: any, info: any, indice: number) => {
    info.offset.x < -60 ? setSwipeOpenIndex(indice) : setSwipeOpenIndex(null);
  };

  const handleCloseDeleteList = () => setSwipeOpenIndex(null);

  const lastSaveDate = treatmentPlan.at(-1)?.dateTreatment;
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
            <motion.div
              drag="x"
              dragConstraints={{ left: -150, right: 0 }}
              dragSnapToOrigin={true}
              onDragEnd={(event, info) => onDragEnd(event, info, i)}
              className={`w-full input-info-patient flex flex-col justify-center ${
                isViewPlanModal && listIndex === i ? "open" : ""
              }`}
              onClick={() => {
                handleTogglePlanModal();
                setListIndex(i);
              }}
            >
              {/* container titulos dos planos de tratamento */}
              <div
                key={i + 1}
                className="relative flex flex-row items-center w-full justify-between"
                style={{ userSelect: "none", touchAction: "none" }}
              >
                <p className="text-white text-md text-start">
                  {namePatient} - Age: {patientAge}
                </p>
                {swipeOpenIndex !== i && (
                  <p className="text-white text-[12px] md:text-[15px] absolute right-5">
                    Save: {v.dateTreatment}
                  </p>
                )}
              {swipeOpenIndex === i && (
                <BtnOption
                  id={patientId}
                  handleCancelOption={handleCancelBtnsOptions}
                  indice={i}
                  handleCloseDeleteList={handleCloseDeleteList}/>
              )}
              </div>
            </motion.div>
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
