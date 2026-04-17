import { containerVariants, itemVariants } from "../../contents/tabs/ContentsTab2";
import { motion } from "framer-motion";
import useTab2Handlers from "../hooks/useTab2Handlers";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
interface PropsBtnOption {
  handleCancelOption: () => void;
  id: string;
  indice?: number;
  handleCloseDeleteList?: () => void;
}

const BtnOption: React.FC<PropsBtnOption> = ({ handleCancelOption, id, indice, handleCloseDeleteList }) => {
  const { handleDeletePatient } = useTab2Handlers();
  const [modalComfirm, setModalComfirm] = useState<boolean>(false);
  const [comfirmDel, setComfirmDel] = useState<boolean>(false);
  const location = useLocation();
  useEffect(() => {
    if (comfirmDel) {
      handleDeletePatient(id, indice).then((v) => {
        console.log(v?.message, v?.status);
        window.location.reload();
      });
    }
    setModalComfirm(false);
  }, [comfirmDel, location.pathname]);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-row w-[40%] gap-5 pr-5 items-center"
    >
      <motion.button
        variants={itemVariants}
        onClick={(e: any) => {
          e.stopPropagation(),
            indice !== undefined && handleCloseDeleteList
              ? handleCloseDeleteList()
              : handleCancelOption();
        }}
        className="btns-options text-white"
      >
        Cancel
      </motion.button>
      <motion.button
        variants={itemVariants}
        className="text-red-500 btns-options "
        onClick={(e: any) => {
          e.stopPropagation(), setModalComfirm(true);
        }}
      >
        Delete
      </motion.button>

      {modalComfirm &&
        createPortal(
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[30vh] bg-(--ion-background-containers) z-999 rounded-2xl flex flex-col gap-5 items-center justify-center overflow-y-hidden shadow-[0_10px_40px_rgba(0,0,0,4.5)]"
          >
            <p className="text-center text-white px-5">
              Are you sure about these changes? This action is permanent!
            </p>
            <div className="flex flex-row gap-5 w-full justify-center">
              <button
                className="text-white"
                onClick={(e) => {
                  e.stopPropagation(), setModalComfirm(false);
                }}
              >
                Cancel
              </button>
              <button
                className="text-red-600 font-extrabold"
                onClick={(e) => {
                  e.stopPropagation(), setComfirmDel(true);
                }}
              >
                I'm sure
              </button>
            </div>
          </motion.div>,
          document.body
        )}
    </motion.div>
  );
};

export default BtnOption;
