import { useState } from "react";
import { SpotCfg, SPOTS } from "../data/tabs/ContentsTab1";

const useTab1Handlers = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [origin, setOrigin] = useState({ ox: "50%", oy: "50%" });
  const [imgZoom, setImgZoom] = useState("img-zoom");

  const activeList = SPOTS.find((v) => v.id === openId);
  const zoomScale = activeList?.zoomScale ?? 1;

  const handleSpotClick = (e: React.MouseEvent<HTMLButtonElement>, spot: SpotCfg) => {
    e.stopPropagation();
    if (spot.hasCluster) {
      setOpenId((v) => (v === spot.id ? null : spot.id));
    }
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

  return {
    imgZoom,
    setImgZoom,
    openId,
    setOpenId,
    handleSpotClick,
    zoomScale,
    origin,
    activeList,
  };
};

export default useTab1Handlers;
