import { useState, useEffect } from "react";
import { PropsPlanModal, Patients, dragConstraints } from "../../contents/tabs/ContentsTab2";
import ExpandableDetails from "./ExpandableDetails";
import { AnimatePresence, motion } from "framer-motion";
import SearchPatient from "./SearchPatient";
import BtnOption from "./BtnOption";

const ViewPlanModal: React.FC<PropsPlanModal> = ({ patients }) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [listPatient, setListPatient] = useState<Patients[]>(patients);
  const [filterPatient, setFilterPatient] = useState<string>("");
  const [selectId, setSelectId] = useState<any>("");
  const [openBtnOptionId, setOpenBtnOptionId] = useState<string | null>(null);

  const handleSearch = () => {
    filterPatient === "" && alert("Please enter valid data for the search.");
    const results = patients.filter((v: any) =>
      v.namePatient.toLowerCase().includes(filterPatient.trim().toLowerCase())
    );
    results.length > 0 ? setListPatient(results) : alert("No patients were found.");
  };
  const handleClear = () => {
    setFilterPatient(""), setListPatient(patients);
  };
  const handleOpenDetails = (id: string) => {
    setOpenDetails(true);
    setSelectId(id);
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const onDrag = (event: any, info: any, id: string) => {
    const dragX = info.offset.x;
    if (dragX < -200) {
      setOpenBtnOptionId(id);
    }
  };
  const handleCancelOption = () => {
    setOpenBtnOptionId(null);
  };
  useEffect(() => {
    filterPatient === "" && setListPatient(patients);
  }, [patients, filterPatient]);

  return (
    <section className="flex flex-col gap-5 w-full mb-30 overflow-y-auto">
      <SearchPatient
        handleClear={handleClear}
        handleSearch={handleSearch}
        filterPatient={filterPatient}
        setFilterPatient={setFilterPatient}
      />

      {listPatient.map((v: any, i: any) => (
        <div key={v.id} className="flex flex-col">
          <div
            className={`w-full input-info-patient flex flex-col justify-center cursor-pointer 
              ${openDetails && selectId === v.id ? "open" : ""}`}
            onClick={() =>
              openDetails && selectId === v.id ? handleCloseDetails() : handleOpenDetails(v.id)
            }
          >
            {/* container header */}
            <motion.div
              className="flex flex-row justify-between items-center overflow-x-hidden"
              drag="x"
              dragSnapToOrigin={true}
              onDrag={(event, info) => onDrag(event, info, v.id)}
              dragConstraints={dragConstraints}
            >
              <p className="text-white text-md text-start">{v.namePatient} - Age: {v.patientAge}</p>
              <p className="text-white text-[12px] md:text-[15px]">Save: {v.dateTreatment}</p>

              <AnimatePresence>
                {openBtnOptionId === v.id && (
                  <BtnOption
                    handleCancelOption={handleCancelOption}
                    id={v.id}
                    patients={patients}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          {/* container com o restante das infos */}
          <AnimatePresence>
            {openDetails && selectId === v.id && (
              <ExpandableDetails
                handleCloseDetails={handleCloseDetails}
                id={selectId}
                patients={patients}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </section>
  );
};
export default ViewPlanModal;
