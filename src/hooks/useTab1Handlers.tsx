import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { SpotCfg, SPOTS, LocalData } from "../contents/tabs/ContentsTab1";

const useTab1Handlers = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [origin, setOrigin] = useState({ ox: "50%", oy: "50%" });
  const [imgZoom, setImgZoom] = useState("img-zoom");
  const [modal, setModal] = useState<boolean>(false);
  const [cartList, setCartList] = useState<LocalData[]>(
    JSON.parse(localStorage.getItem("codeList") || "[]")
  );
  const history = useHistory();

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

  const toggleModal = () => {
    setModal(!modal);
  };

  const cartModal = (code: string, region: string) => {
    const newData = { code, region };
    const localCodeList = JSON.parse(localStorage.getItem("codeList") || "[]");
    localCodeList.push(newData);
    localStorage.setItem("codeList", JSON.stringify(localCodeList));
    setCartList(() => localCodeList);
  };

  const deleteItemList = (indice: number) => {
    cartList.splice(indice, 1);
    localStorage.setItem("codeList", JSON.stringify(cartList));
    const newData = JSON.parse(localStorage.getItem("codeList") || "[]")
    setCartList(() =>  newData);
  };

  return {
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
  };
};

export default useTab1Handlers;
