import { IonContent, IonPage } from "@ionic/react";
import { motion, AnimatePresence } from "framer-motion";
import { SPOTS } from "../contents/tabs/ContentsTab1";
import useTab1Handlers from "../hooks/useTab1Handlers";
import "./Tab1.css";
import ModalCardCode from "../components/tab1/ModalCardCode";
import iconList from "../../public/resources/cardList.png";
import { useAuth } from "../contexts/AuthContext";
const Tab1: React.FC = () => {
  const {
    cartModal,
    imgZoom,
    setImgZoom,
    openId,
    setOpenId,
    handleSpotClick,
    zoomScale,
    origin,
    activeList,
    toggleModal,
    modal,
    cartList,
    deleteItemList,
  } = useTab1Handlers();

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
          {/* container button para abrir modal da lista */}
          <div className="fixed bottom-[7%] right-[7%] bg-(--ion-background-containers) w-14 h-14 z-99 rounded-[50%!important] shadow-[0px_0px_10px_#000]">
            <img src={iconList} onClick={toggleModal} className="relative p-2 w-full h-full" />
            <p className="relative left-[50%] -mt-3 p-[0.8px] w-[45%] h-[45%] text-center bg-red-600 rounded-[50%!important] font-bold">
              {cartList.length}
            </p>
          </div>
          {/*fim container button para abrir modal da lista */}
          <AnimatePresence>
            {modal && (
              <ModalCardCode
                toggleModal={toggleModal}
                cartList={cartList}
                deleteItemList={deleteItemList}
              />
            )}
          </AnimatePresence>

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
                {!Boolean(openId) && (
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
                      onClick={() => cartModal(label, activeList.region)}
                    >
                      {label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Tab1;
