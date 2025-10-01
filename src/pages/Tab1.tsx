import { IonContent, IonPage } from "@ionic/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Tab1.css";

type SpotCfg = {
  id: string;
  label: string;
  className: string;
  hasCluster?: boolean;
  options?: string[];
  zoomScale?: number;
  zoomOriginX?: string;
  zoomOriginY?: string;
};

const SPOTS: SpotCfg[] = [
  {
    id: "ck",
    label: "Ck",
    className: "ck",
    hasCluster: true,
    options: ["Ck1", "Ck2", "Ck3", "Ck4", "Ck5"],
    zoomScale: 1.1,
  },
  {
    id: "o",
    label: "O",
    className: "o",
    hasCluster: true,
    options: ["O1", "O2", "O3"],
    zoomScale: 1.5,
  },
  {
    id: "e",
    label: "E",
    className: "e",
    hasCluster: true,
    options: ["E1", "E2", "E3"],
    zoomScale: 1.5,
  },
  {
    id: "t",
    label: "T",
    className: "t",
    hasCluster: true,
    options: ["T1", "T2"],
    zoomScale: 1.5,
  },
  {
    id: "tt",
    label: "Tt",
    className: "tt",
    hasCluster: true,
    options: ["Tt1", "Tt2", "Tt3"],
    zoomScale: 1.5,
  },
  {
    id: "nl",
    label: "NL",
    className: "nl",
    hasCluster: true,
    options: ["NL1", "NL2", "NL3"],
    zoomScale: 1.5,
  },
  {
    id: "m",
    label: "M",
    className: "m",
    hasCluster: true,
    options: ["M1", "M2", "M3"],
    zoomScale: 1.5,
  },
  {
    id: "jw",
    label: "Jw",
    className: "jw",
    hasCluster: true,
    options: ["Jw1", "Jw2", "Jw3", "Jw4", "Jw5"],
    zoomScale: 1.1,
    zoomOriginX: "82%",
    zoomOriginY: "68%",
  },
  {
    id: "c",
    label: "C",
    className: "c",
    hasCluster: true,
    options: ["C1", "C2", "C3", "C4", "C5", "C6"],
    zoomScale: 1.8,
  },
  {
    id: "lp",
    label: "Lp",
    className: "lp",
    hasCluster: true,
    options: [
      "Lp₁",
      "Lp¹",
      "Lp2",
      "Lp³",
      "Lp₃",
      "Lp4",
      "Lp5",
      "Lp6",
      "Lp7",
      "Lp⁸",
      "Lp₈",
    ],
    zoomScale: 1.5,
  },
  {
    id: "n",
    label: "N",
    className: "n",
    hasCluster: true,
    options: ["N1", "N2", "N3", "N4", "N5"],
    zoomScale: 1.5,
  },
  {
    id: "g",
    label: "G",
    className: "g",
    hasCluster: true,
    options: ["G1", "G1", "G2"],
    zoomScale: 1.5,
  },
  {
    id: "f",
    label: "F",
    className: "f",
    hasCluster: true,
    options: ["F1", "F2", "F3"],
    zoomScale: 1.5,
  },
];

export default function Tab1() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [origin, setOrigin] = useState({ ox: "50%", oy: "50%" });
  const [ImgZoom, setImgZoom] = useState("img-zoom");
  const history = useHistory(); // ⬅️ add

  const active = SPOTS.find((s) => s.id === openId);
  const scale = active?.zoomScale ?? 1;

  function handleSpotClick(
    e: React.MouseEvent<HTMLButtonElement>,
    spot: SpotCfg
  ) {
    e.stopPropagation();
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

    if (spot.hasCluster) setOpenId((v) => (v === spot.id ? null : spot.id));
  }

  function goToInputs(code: string) {
    history.push(`/tabs/tab2?code=${encodeURIComponent(code)}`);
  }

  return (
    <IonContent className="container">
      <div
        className="container-img"
        onClick={() => {
          setOpenId(null);
          setImgZoom("img-zoom");
        }}
      >
        <motion.div
          className={ImgZoom}
          style={{ transformOrigin: `${origin.ox} ${origin.oy}` }}
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: openId ? scale : 1, y: 0 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        />

        <div className="hotspots">
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
            {active?.hasCluster && (
              <motion.div
                className={`cluster cluster-${active.id}`}
                style={{ left: origin.ox, top: origin.oy }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                onClick={(e) => e.stopPropagation()}
              >
                {(active.options ?? []).map((label, i) => (
                  <motion.button
                    key={label}
                    className={`point child ${active.id}-child ${active.id}-${
                      i + 1
                    }`}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToInputs(label)} // ⬅️ mudou aqui
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
  );
}
