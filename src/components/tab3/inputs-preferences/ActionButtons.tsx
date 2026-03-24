import {
  ModalProps,
  PreferencesData,
  classInputs
} from "../../../contents/tabs/ContentsTab3";
import { useState } from "react";

const ActionButtons: React.FC<ModalProps> = ({ doYouNeedHelp, needHelp, closeModal, toggleInput}) => {
  const [helpModal, setHelpModal] = useState<boolean>(false);

  return (
    <div className="px-5 w-full grid grid-flow-col grid-row-1 gap-5 mt-10">
      <button onClick={() => {closeModal(), doYouNeedHelp(false)}} className="text-white" style={classInputs}>
        Back
      </button>
      <button onClick={(e) => toggleInput(e)} className="text-white" style={classInputs}>
        Edit
      </button>
      {needHelp && (
        <button onClick={() => setHelpModal(true)} className="text-white" style={classInputs}>
          Do you need help?
        </button>
      )}
      <input type="submit" className="text-white" style={classInputs} value={"Save"}/> 
        


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
