import { IonContent, IonPage } from "@ionic/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { SPOTS, SpotCfg } from "../contents/tabs/ContentsTab1";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [origin, setOrigin] = useState({ ox: "50%", oy: "50%" });
  const [imgZoom, setImgZoom] = useState("img-zoom");
  const history = useHistory();
  const codeList: string[] = [];
  

  const activeList = SPOTS.find((v) => v.id === openId);
  const zoomScale = activeList?.zoomScale ?? 1;

  const handleSpotClick = (e: React.MouseEvent<HTMLButtonElement>, spot: SpotCfg) => {
    e.stopPropagation();
    spot.hasCluster && setOpenId((v) => (v === spot.id ? null : spot.id));
    const cs = getComputedStyle(e.currentTarget);
    const varOx = cs.getPropertyValue("--ox").trim();
    const varOy = cs.getPropertyValue("--oy").trim();
    const left = cs.getPropertyValue("left").trim();
    const top = cs.getPropertyValue("top").trim();

    setOrigin({
      ox: spot.zoomOriginX ?? (varOx || left || "50%"),
      oy: spot.zoomOriginY ?? (varOy || top || "50%"),
    });

    if (spot.id === "jw") setImgZoom("img-zoom-jw");
    else if (spot.id === "c") setImgZoom("img-c");
    else if (spot.id === "g") setImgZoom("img-g");
    else if (spot.id === "f") setImgZoom("img-f");
    else if (spot.id === "tt") setImgZoom("img-tt");
    else if (spot.id === "lp") setImgZoom("img-lp");
    else setImgZoom("img-zoom");
  };

  const goToInputs = (code: string) => {
    codeList.push(code);
    console.log(codeList)
    // history.push(`/tabs/tab2?code=${encodeURIComponent(code)}`);
  };
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
            {SPOTS.map((spot) => {
              const anyOpen = Boolean(openId);
              return (
                <AnimatePresence key={spot.id}>
                  {!anyOpen && (
                    <motion.button
                      className={`point ${spot.className}`}
                      whileHover={{ scale: 1.06 }}
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
              );
            })}

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
                      onClick={() => goToInputs(label)}
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
