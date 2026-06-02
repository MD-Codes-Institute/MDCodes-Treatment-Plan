import { IonContent, IonPage } from "@ionic/react";
import { motion, AnimatePresence } from "framer-motion";
import { SPOTS } from "../contents/tabs/ContentsTab1";
import { Modal } from "../components/modal";
import { useCart, CartItem } from "../contexts/CartContext";
import { useState } from "react";
import { useHistory } from "react-router";
import useTab1Handlers from "../hooks/useTab1Handlers";
import "./Tab1.css";
import iconList from "../../public/resources/cardList.png";
import iconDelete from "/resources/delete-left-solid-full.svg";
import ActionButton from "../components/button/ActionButton";

const Tab1: React.FC = () => {
  const { imgZoom, setImgZoom, openId, setOpenId, handleSpotClick, zoomScale, origin, activeList } =
    useTab1Handlers(); 
  const { cart, removeItemCart, addToCart } = useCart();
  const [modal, setModal] = useState<boolean>(false);
  const history = useHistory();
  const toggleModal = (): void => setModal(!modal);

  return (
    <IonPage>
      <IonContent className="container">
        <div
          className="container-img"
          onClick={() => {
            setOpenId(null);
            setImgZoom("img-zoom");
          }}
        >
          <motion.div
            className={imgZoom}
            style={{ transformOrigin: `${origin.ox} ${origin.oy}` }}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: openId ? zoomScale : 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          />

          <div className="hotspots">
            {/* Botões principais */}
            {SPOTS.map((spot) => (
              <AnimatePresence key={spot.id}>
                {!openId && (
                  <motion.button
                    className={`point ${spot.className}`}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleSpotClick(e, spot)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {spot.label}
                  </motion.button>
                )}
              </AnimatePresence>
            ))}

            <AnimatePresence>
              {/* Botões secundarios de cada código */}
              {activeList?.hasCluster && (
                <motion.div
                  className={`cluster cluster-${activeList.id}`}
                  style={{ left: origin.ox, top: origin.oy }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {(activeList.options ?? []).map((label, i) => (
                    <motion.button
                      key={`${label}-${i}`}
                      className={`point child ${activeList.id}-child ${activeList.id}-${i + 1}`}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(label, activeList.region)}
                    >
                      {label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* container button para abrir modal da lista */}
        <div className="fixed bottom-[7%] right-[7%] bg-(--ion-background-containers) w-14 h-14 z-99 rounded-[50%!important] shadow-[0px_0px_10px_#000]">
          <img src={iconList} onClick={toggleModal} className="relative p-2 w-full h-full" />
          <p className="relative left-[50%] -mt-3 p-[0.8px] w-[45%] h-[45%] text-center bg-red-600 rounded-[50%!important] font-bold">
            {cart.length}
          </p>
        </div>

        {/* Modal para apresentar itens que estão sendo salvos até o momento */}
        <AnimatePresence>
          {modal && (
            <Modal.Root className="w-[90vw] h-[85vh]">
              <Modal.Header>
                <Modal.Title className="text-center text-2xl font-extrabold! whitespace-normal">
                  Treatment Plan Planning
                </Modal.Title>
              </Modal.Header>
              <Modal.Content className="px-5 flex flex-col gap-5 justify-start overflow-x-hidden mt-5">
                <div className="grid grid-cols-3 grid-flow-row gap-10 px-3 md:px-5 w-full mx-2 ">
                  <p className="text-start font-bold text-xl">Region</p>
                  <p className="text-center font-bold text-xl">Code</p>
                  <p className="text-end font-bold text-xl">Delete</p>
                </div>
                {/* Lógica para verificar se tem itens a serem observados e caso não há, passar essa resposta ao usuário */}
                {cart.length === 0 && ( 
                  <h1 className="text-white text-center">Add the codes and you'll see them here in this section.</h1>
                )}
                {cart.map((item: CartItem, i: number) => (
                  <div key={i} className="grid grid-cols-3 grid-flow-row gap-10 w-[90%]">
                    <p className="text-start py-1 text-[15px] flex items-center ">{item.region}</p>
                    <p className="h-10 w-20 text-center justify-self-center bg-(--ion-background-inputs) flex justify-center items-center rounded-md shadow-xl!">
                      {item.code}
                    </p>
                    <button className="flex justify-end" onClick={() => removeItemCart(i)}>
                      <img src={iconDelete} className="w-8 h-8" alt="Icon delete row" />
                    </button>
                  </div>
                ))}
              </Modal.Content>
              <Modal.Actions>
                <ActionButton className="h-10 rounded-md! w-25" onClick={toggleModal} type="button">
                  Select More
                </ActionButton>
                <ActionButton
                  className="h-10 rounded-md! w-30"
                  onClick={() => history.push("/tabs/tab2")}
                  type="button"
                >
                  Go to Flip Chart
                </ActionButton>
              </Modal.Actions>
            </Modal.Root>
          )}
        </AnimatePresence>
      </IonContent>
    </IonPage>
  );
};
export default Tab1;
