import { PatientFormatted } from "../types/Patients";
import { motion, Variants } from "framer-motion";
import { usePatient } from "../contexts/PatientsContext";
import { useState, useRef } from "react";
import { Modal } from "./modal";
import ActionButton from "./button/ActionButton";
import Card from "./Card";
import toast from "react-hot-toast";

interface PropPatientDetails {
  patient: PatientFormatted;
  closePage: () => void;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: { opacity: 0, y: 100 },
};

const PatientDetailsPage: React.FC<PropPatientDetails> = ({ patient, closePage }) => {
  const { deletePatient } = usePatient();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const confirmDeletion = useRef(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const patientId = patient.id;

  const deletePlan = async (patientId: string, planId: string) => {
    setIsButtonDisabled(true);
    try {
      if (!confirmDeletion.current) return;
      if (patient.treatmentPlan.length === 1) {
        const response = await toast.promise(deletePatient(patientId), {
          loading: "Loading...",
          success: (data) => data.message,
          error: (err) => err.message,
        });
        setTimeout(() => {
          setIsModalOpen(false);
          if (response.status === 204) window.location.reload();
        }, 500);
      } else {
        const response = await toast.promise(deletePatient(patientId, planId), {
          loading: "Loading...",
          success: (data) => data.message,
          error: (err) => err.message,
        });
        setTimeout(() => {
          if (response.status === 204) window.location.reload();
        }, 500);
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const confirmDialog = async (patientId: string, planId: string) => {
    console.log("Chamou a function", confirmDeletion)
    confirmDeletion.current = true
    console.log(confirmDeletion)
    await deletePlan(patientId, planId);
  };

  return (
    <motion.section
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-(--ion-background-containers) flex flex-col items-center"
    >
      <section className=" flex-1 flex flex-col gap-5 overflow-y-auto pt-10 px-5 w-full">
        <h1 className="text-white text-2xl!">Treatment Plans: {patient.name}</h1>
        <aside className="flex flex-col">
          <span className="text-white"> Last clinical consultation: <b>{patient.treatmentPlan.at(-1)?.dateTreatment}</b> </span>
          <p className="text-white">Age Patient: {patient.age}</p>
        </aside>
        <p className="text-white">Treatment's total: {patient.treatmentPlan.length}</p>

        {patient.treatmentPlan.map((value) => (
          <div key={value.idPlan}>
            <Card className="flex-col gap-4 py-5 items-start">
              <p className="text-white flex flex-row gap-5 w-full justify-between"> Date: {value.dateTreatment} <span>Applied codes: {value.cart.length}</span> </p>
              <div className="grid grid-cols-5 gap-3 w-full text-center font-bold whitespace-nowrap">
                <p>Code</p>
                <p>Product</p>
                <p>Right</p>
                <p>Mid</p>
                <p>Left</p>
              </div>
              {value.cart.map((item, index) => (
                <div key={`${value.idPlan}-${item.code}-${index}`} className="grid grid-cols-5 gap-3 w-full my-1 code-table">
                  <p>{item.code}</p>
                  <p>{item.product}</p>
                  <p>{item.right}</p>
                  <p>{item.mid}</p>
                  <p>{item.left}</p>
                </div>
              ))}
              <ActionButton
                onClick={() => setIsModalOpen(true)}
                type="button"
                color="warning"
                className="w-20 h-8 rounded-md!"
                disabled={isButtonDisabled}
              >
                Delete
              </ActionButton>
            </Card>

            {isModalOpen && (
              <Modal.Root className="h-[50vh] w-[80%]">
                <Modal.Content className="text-lg sm:text-xl text-white text-center">
                  <h1>Confirm the deletion of this patient?</h1>
                </Modal.Content>
                <Modal.Actions>
                  <ActionButton type="button" color="default" onClick={() => setIsModalOpen(false)} className="h-8 w-20 rounded-sm!">
                    Cancel
                  </ActionButton>
                  <ActionButton type="button" color="warning" onClick={() => confirmDialog(patientId, value.idPlan)} className="h-8 w-20 rounded-sm!">
                    Confirm
                  </ActionButton>
                </Modal.Actions>
              </Modal.Root>

            )}
          </div>
        ))}
      </section>
      <div className="sicky bg-(--ion-background-containers) w-full h-11 flex items-center justify-start p-5">
        <ActionButton onClick={closePage} type="button" className="w-20 h-8 rounded-md!">
          Return
        </ActionButton>
      </div>
    </motion.section>
  );
};
export default PatientDetailsPage;
