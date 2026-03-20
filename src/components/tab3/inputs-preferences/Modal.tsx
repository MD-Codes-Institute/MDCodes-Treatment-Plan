import ActionButtons from "./ActionButtons";
import { PreferencesData, classInputs, ModalProps } from "../../../contents/tabs/ContentsTab3";

const ModalPreferences: React.FC<ModalProps> = ({ dataType, doYouNeedHelp, saveDb, editDb, needHelp, closeModal }) => {
  if (!dataType) return null;
  return (
    <div className="min-h-full w-full absolute top-0 flex flex-col justify-center left-0 z-30 overflow-y-hidden bg-(--ion-background-containers)">
      <h1 className="text-white text-center w-ful pb-10">{dataType.title}</h1>
      <div className="grid grid-flow-row grid-row-2 gap-5 justify-center items-center mr-10">
        {dataType.texts?.map((v) => (
          <div key={v} className="grid grid-cols-2 items-center gap-4">
            <p className="text-center">{v}</p>
            <input type="text" style={classInputs} />
          </div>
        ))}
      </div>
      <ActionButtons dataType={dataType} doYouNeedHelp={doYouNeedHelp} saveDb={saveDb} editDb={editDb} needHelp={needHelp} closeModal={closeModal} />
    </div>
  );
};
export default ModalPreferences;
