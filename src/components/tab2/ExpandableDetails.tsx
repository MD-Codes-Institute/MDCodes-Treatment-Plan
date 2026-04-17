import { variantsDetails, classBtnPrice, TreatmentItem } from "../../contents/tabs/ContentsTab2";
import { motion } from "framer-motion";
import useTab2Handlers from "../hooks/useTab2Handlers";
interface PropsDetails {
  treatmentPlan: { dateTreatment: string; rows: TreatmentItem[] }[];
  isViewPlanModal?: boolean;
  handleTogglePlanModal?: () => void;
  handleClosePlans?: () => void;
}

const ExpandableDetails: React.FC<PropsDetails> = (
  { treatmentPlan, handleClosePlans, isViewPlanModal, handleTogglePlanModal }
) => {
  const { handlePriceTreatment } = useTab2Handlers();
  return (
    <motion.div
      variants={variantsDetails}
      initial="hidden"
      animate="animate"
      exit="exit"
      className="modal-details-patient"
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-5 grid-flow-row items-center justify-center w-full text-center">
          <p>Code</p>
          <p>Product</p>
          <p>Right</p>
          <p>Mid</p>
          <p>Left</p>
        </div>
        {treatmentPlan.map((item: any, i: any) => (
          <div key={i}>
            {item.rows.map((v: any, i: any) => (
              <div
                className="grid grid-cols-5 grid-flow-row items-center justify-center w-full text-center text-white font-extrabold gap-5 pb-3"
                key={i}
              >
                <p className="input-patient-plan">{v.code}</p>
                <p className="input-patient-plan">{v.product}</p>
                <p className="input-patient-plan">{v.left}</p>
                <p className="input-patient-plan">{v.mid}</p>
                <p className="input-patient-plan">{v.right}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center mt-8 pb-5 gap-5 font-extrabold text-white">
        {!isViewPlanModal && handleClosePlans &&  (
          <button onClick={() => handleClosePlans()} className="text-white input-patient-plan">
            Close
          </button>
        )}
        {isViewPlanModal && handleTogglePlanModal && (
          <button onClick={() => handleTogglePlanModal()} className="text-white input-patient-plan">
            Close
          </button>
        )}
        <button
          // onClick={() => handlePriceTreatment(patient[0])}
          className="text-white"
          style={classBtnPrice}
        >
          Price
        </button>
      </div>
    </motion.div>
  );
};
export default ExpandableDetails;
