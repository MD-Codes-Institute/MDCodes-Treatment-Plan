import { useForm } from "react-hook-form";
import { patientFormSchema, PatientFormData, products, volumes } from "../../contents/tabs/ContentsTab2";
import { useEffect } from "react";
import useTab2Handlers from "../hooks/useTab2Handlers";
import { zodResolver } from "@hookform/resolvers/zod";

interface PropsForm {
  codeList: string[];
  date: string;
}
const PatientForm = ({ codeList, date }: PropsForm) => {
  const { register, handleSubmit, setValue } = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      patientAge: "",
      namePatient: "",
      dateBirth: "",
      treatmentPlan: {
        dateTreatment: date,
        rows: codeList.map((code) => ({
          code,
          product: products[0],
          left: volumes[0],
          mid: volumes[0],
          right: volumes[0],
        })),
      },
    },
  });
  const { handleSavePatient, fillVolumeCodeApply } = useTab2Handlers();
  useEffect(() => {
    codeList.map((code: string, i: number) => {
      fillVolumeCodeApply(i, code, setValue);
    });
  }, []);
  const onSubmit = handleSubmit((data) => {
    handleSavePatient(data).then((v) => {
      console.log(v?.message, v?.status);
    });
  });

  return (
    <div>
      <form
        className="flex flex-col items-center w-full gap-2"
        onSubmit={onSubmit}
        id="form-treatment-plan"
      >
        {/* inputs infos patients */}
        <div className="flex flex-col gap-4 mb-4 w-full">
          <div className="flex flex-row justify-between items-center px-5">
            <label htmlFor="patient-age">Patient's age: </label>
            <input
              {...register("patientAge")}
              className="input-info-patient age w-12"
              type="number"
              inputMode="numeric"
              max="110"
            />
            <input {...register("treatmentPlan.dateTreatment")} disabled className="text-end" />
          </div>
          <div className="flex flex-wrap gap-3 px-5 items-center justify-start">
            <label htmlFor="name-patient">Patient's name:</label>
            <input
              {...register("namePatient")}
              placeholder="Write patient's name"
              className="input-info-patient "
              type="text"
            />
            <label htmlFor="patient-birth">Patient's birth:</label>
            <input
              {...register("dateBirth")}
              placeholder="Write patient's name"
              className="input-info-patient"
              type="date"
            />
          </div>
        </div>
        {/* Header */}
        <div className="modal-grid modal-grid-header">
          <span>Codes</span>
          <span>Products</span>
          <span>Right</span>
          <span>Mid</span>
          <span>Left</span>

          {/* Rows */}
        </div>
        {codeList.map((code, i) => (
          <div className="modal-grid" key={i}>
            <input
              {...register(`treatmentPlan.rows.${i}.code`)}
              readOnly
              className="modal-cell modal-cell-input"
            />
            <select
              {...register(`treatmentPlan.rows.${i}.product`)}
              className="modal-cell"
            >
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              {...register(`treatmentPlan.rows.${i}.right`)}
              className="modal-cell"
            >
              {volumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <select
              {...register(`treatmentPlan.rows.${i}.mid`)}
              className="modal-cell"
            >
              {volumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <select
              {...register(`treatmentPlan.rows.${i}.left`)}
              className="modal-cell"
            >
              {volumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        ))}
      </form>
    </div>
  );
};
export default PatientForm;
