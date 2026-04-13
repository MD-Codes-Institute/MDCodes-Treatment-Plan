import { PropsPlanModal, variantsDetails, classBtnPrice } from "../../contents/tabs/ContentsTab2";
import { motion } from "framer-motion";
import useTab2Handlers from "../hooks/useTab2Handlers";
import useUserInfo from "../../services/crud-auth/getUserInfo";
interface PropsDetails extends PropsPlanModal {
  id: string;
  handleCloseDetails: () => void;
}

const ExpandableDetails: React.FC<PropsDetails> = ({ patients, id, handleCloseDetails }) => {
  const { handlePriceTreatment } = useTab2Handlers();

  const patient = patients.filter((v) => v.id === id);
  return (
    patient.length > 0 && (
      <motion.div
        variants={variantsDetails}
        initial="hidden"
        animate="animate"
        exit="exit"
        key={id}
        className="modal-details-patient"
      >
        {patient.map((v, i) => (
          <div className="flex flex-col gap-5" key={v.id}>
            <div className="grid grid-cols-5 grid-flow-row items-center justify-center w-full text-center">
              <p>Code</p>
              <p>Product</p>
              <p>Right</p>
              <p>Mid</p>
              <p>Left</p>
            </div>
            {v.treatmentPlan.map((item: any, i) => (
              <div
                className="grid grid-cols-5 grid-flow-row items-center justify-center w-full text-center text-white font-extrabold gap-5"
                key={i}
              >
                <p className="input-patient-plan">{item.code}</p>
                <p className="input-patient-plan">{item.product}</p>
                <p className="input-patient-plan">{item.left}</p>
                <p className="input-patient-plan">{item.mid}</p>
                <p className="input-patient-plan">{item.right}</p>
              </div>
            ))}
          </div>
        ))}
        <div className="flex flex-row items-center mt-8 mb-5 gap-5 font-extrabold text-white">
          <button onClick={() => handleCloseDetails()} className="text-white input-patient-plan">
            Close
          </button>
          <button
            onClick={() => handlePriceTreatment(patient[0])}
            className="text-white"
            style={classBtnPrice}
          >
            Price
          </button>
        </div>
      </motion.div>
    )
  );
};

export default ExpandableDetails;
