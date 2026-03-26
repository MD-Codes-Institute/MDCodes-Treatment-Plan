import { motion } from "framer-motion";
import { LocalData } from "../../contents/tabs/ContentsTab1";
import { useHistory } from "react-router";
interface PropsModal {
  toggleModal: () => void;
  cartList: LocalData[]
  deleteItemList: (i: number) => void
}


const ModalCardCode: React.FC<PropsModal> = ({ toggleModal, cartList, deleteItemList }) => {
  const history = useHistory()
  return (
    <motion.section
      className="bg-(--ion-background-containers) w-[90%] h-[90%] relative z-19 rounded-2xl shadow-[0px_0px_40px_10px_#000]"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 160, damping: 20, duration: 0.5 }}
    >
      <div className=" ">
        {cartList.map((item: any, i: any) => (
          <div className="grid grid-flow-col grid-cols-3" key={i}>
            <p>{item.region}</p>
            <input value={item.code} />
            <button className="text-white" onClick={() => deleteItemList(i)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <button onClick={toggleModal} className="text-white">
        Select more
      </button>
      <button onClick={() => history.push("/tabs/tab2")} className="text-white">
        Go to Flip Chart
      </button>
    </motion.section>
  );
};

export default ModalCardCode;
