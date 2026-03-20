import {
  ModalProps,
  PreferencesData,
  classInputs
} from "../../../contents/tabs/ContentsTab3";
import { useState } from "react";

const ActionButtons: React.FC<ModalProps> = ({dataType, doYouNeedHelp, saveDb, editDb, needHelp, closeModal,}) => {
  const [helpModal, setHelpModal] = useState<boolean>(false);

  return (
    <div className="absolute bottom-5 px-5 w-full grid grid-flow-col grid-row-1 gap-5 mt-4">
      <button onClick={() => {closeModal(), doYouNeedHelp(false)}} className="text-white" style={classInputs}>
        Back
      </button>
      <button onClick={() => closeModal()} className="text-white" style={classInputs}>
        Edit
      </button>
      {needHelp && (
        <button onClick={() => setHelpModal(true)} className="text-white" style={classInputs}>
          Do you need help?
        </button>
      )}
      <button onClick={() => closeModal()} className="text-white" style={classInputs}>
        Save
      </button>

      {helpModal && (
        <div>
          <p>Lugar onde irá ser adicionado a imagem de ajuda</p>
          <button onClick={() => setHelpModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
export default ActionButtons;
