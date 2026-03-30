import { motion } from "framer-motion";
import { LocalData, styleBtn, styleInputs } from "../../contents/tabs/ContentsTab1";
import { useHistory } from "react-router";
import deleteIcon from "/resources/delete-left-solid-full.svg";
interface PropsModal {
  toggleModal: () => void;
  cartList: LocalData[];
  deleteItemList: (i: number) => void;
}

const ModalCardCode: React.FC<PropsModal> = ({ toggleModal, cartList, deleteItemList }) => {
  const history = useHistory();
  return (
    <motion.section
      className="bg-(--ion-background-containers) w-[90%] h-[90%] relative z-19 rounded-2xl shadow-[0px_0px_40px_10px_#000] flex flex-col overflow-y-auto"
      style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 20, duration: 0.5 }}
    >
      <h2 className="text-white text-center pt-5">Treatment plan planning</h2>
      {/* conteúdo rolável; pb reserva espaço para o footer */}
      <div className="flex-1 overflow-y-auto px-4 flex justify-center w-full">
        <div className="flex flex-col items-center py-10 gap-4 w-full">
          <div className="grid grid-cols-3 grid-flow-row gap-10 px-3 md:px-5 w-full mx-2">
            <p className="text-start font-bold">Region</p>
            <p className="text-center font-bold">Code</p>
            <p className="text-end font-bold">Delete</p>
          </div>
          {cartList.map((item: any, i: any) => (
            <div
              className="grid grid-cols-3 grid-flow-row gap-10 px-3 md:px-5 w-full mx-2 items-center"
              key={i}
            >
              <p className="text-white font-medium text-start text-sm">{item.region}:</p>
              <p
                style={styleInputs}
                className="row-span-1 text-center justify-self-center"
              >{item.code}</p>
              <button className="flex justify-end" onClick={() => deleteItemList(i)}>
                <img src={deleteIcon} className="w-8 h-8" alt="Icon delete row" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* footer preso ao bottom do modal (usa sticky e z-index para ficar sobre o conteúdo) */}
      <div className="sticky bottom-6 flex justify-start gap-4 mx-3 mt-8 bg-(--ion-background-containers) pt-5">
        <button onClick={toggleModal} className="text-white" style={styleBtn}>
          Select more
        </button>
        <button onClick={() => history.push("/tabs/tab2")} className="text-white" style={styleBtn}>
          Go to Flip Chart
        </button>
      </div>
    </motion.section>
  );
};

export default ModalCardCode;
