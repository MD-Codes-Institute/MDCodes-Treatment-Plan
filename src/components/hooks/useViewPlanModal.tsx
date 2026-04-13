import { useState, useCallback, useEffect, useRef } from "react";
import { Patients } from "../../contents/tabs/ContentsTab2";

const useViewPlanModal = (patients: Patients[]) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [listPatient, setListPatient] = useState<Patients[]>(patients);
  const [filterPatient, setFilterPatient] = useState<string>("");
  const [selectId, setSelectId] = useState<any>("");
  const [openBtnOptionId, setOpenBtnOptionId] = useState<string | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLongPressRef = useRef<boolean>(false);

  useEffect(() => {
    filterPatient === "" && setListPatient(patients);
  }, [patients, filterPatient]);

  const handleSearch = () => {
    filterPatient === "" && alert("Please enter valid data for the search.");
    const results = patients.filter((v: any) =>
      v.namePatient.toLowerCase().includes(filterPatient.trim().toLowerCase())
    );
    results.length > 0 ? setListPatient(results) : alert("No patients were found.");
  };

  const handleClearSearch = () => {
    setFilterPatient(""), setListPatient(patients);
  };

  const handleOpenDetails = (id: string) => {
    setOpenDetails(true);
    setSelectId(id);
  };

  const handleCloseDetails = () => setOpenDetails(false);

  const handleCancelOptions = () => {
    setOpenBtnOptionId(null);
  };

  const handlePressStart = useCallback((id: string) => {
    isLongPressRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setOpenBtnOptionId(id);
    }, 300);
  }, []);

  const handlePressEnd = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  }, []);

  const onDragOptions = (event: any, info: any, id: string) => {
    const dragX = info.offset.x;
    if (dragX < -150) {
      setOpenBtnOptionId(id);
    } else if (dragX > 150) {
      setOpenBtnOptionId(null);
    }
  };

  return {
    handleSearch,
    handleClearSearch,
    handleOpenDetails,
    handleCloseDetails,
    handleCancelOptions,
    handlePressStart,
    handlePressEnd,
    onDragOptions,
    openDetails,
    listPatient,
    selectId,
    openBtnOptionId,
    setFilterPatient,
    filterPatient,
    isLongPressRef,
  };
};
export default useViewPlanModal;
