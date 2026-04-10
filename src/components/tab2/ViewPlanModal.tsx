import { PropsPlanModal, dragConstraints } from "../../contents/tabs/ContentsTab2";
import ExpandableDetails from "./ExpandableDetails";
import { AnimatePresence, motion } from "framer-motion";
import SearchPatient from "./SearchPatient";
import BtnOption from "./BtnOption";
import useViewPlanModal from "../hooks/useViewPlanModal";

const ViewPlanModal: React.FC<PropsPlanModal> =  ({ patients }) => {
  const {
    handleSearch, handleClearSearch, handleOpenDetails, handleCloseDetails,
    handleCancelOptions, handlePressStart, handlePressEnd, onDragOptions, openDetails, 
    listPatient, selectId, openBtnOptionId,filterPatient,setFilterPatient,isLongPressRef
  } =  useViewPlanModal(patients);

  return (
    <section className="flex flex-col gap-5 w-full mb-30 overflow-y-auto overflow-x-hidden">
      <SearchPatient 
      handleClear={handleClearSearch} 
      handleSearch={handleSearch}
      filterPatient={filterPatient}
      setFilterPatient={setFilterPatient}
      />

      {listPatient.map((v: any, i: any) => (
        <div key={v.id} className="flex flex-col">
          <div
            className={`w-full input-info-patient flex flex-col justify-center cursor-pointer 
              ${openDetails && selectId === v.id ? "open" : ""}`}
            onClick={() => {
              if (isLongPressRef.current) return;
              openDetails && selectId === v.id ? handleCloseDetails() : handleOpenDetails(v.id);
            }}
          >
            {/* container header */}
            <motion.div
              className="flex flex-row items-center"
              drag="x"
              onPointerDown={() => handlePressStart(v.id)}
              onPointerUp={handlePressEnd}
              onPointerLeave={handlePressEnd}
              onDrag={(event, info) => onDragOptions(event, info, v.id)}
              dragConstraints={dragConstraints}
              dragSnapToOrigin={true}
              style={{ userSelect: "none", touchAction: "none" }}
            >
              <p className="text-white text-md text-start">
                {v.namePatient} - Age: {v.patientAge}
              </p>
              {openBtnOptionId !== v.id && (
                <p className="text-white text-[12px] md:text-[15px] absolute right-10">Save: {v.dateTreatment}</p>
              )}

              <AnimatePresence>
                {/* buttons para deletar plano de tratamento */}
                {openBtnOptionId === v.id && (
                  <BtnOption handleCancelOption={handleCancelOptions} id={v.id} />
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
