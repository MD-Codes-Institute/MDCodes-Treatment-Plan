import { useForm } from "react-hook-form";
import { products, volumes } from "../../contents/tabs/ContentsTab2";
import { useState } from "react";
import useTab2Handlers from "../hooks/useTab2Handlers";

interface PropsForm {
  codeList: string[];
  date: string;
}
const PatientForm = ({ codeList, date }: PropsForm) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      patientAge: "",
      dateTreatment: date,
      namePatient: "",
      treatmentPlan: codeList.map((code) => ({
        code,
        product: products[0],
        left: volumes[0],
        mid: volumes[0],
        right: volumes[0],
      })),
    },
  });
  const { handleSavePatient } = useTab2Handlers();
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
          <div className="flex flex-row justify-between items-center">
            <label htmlFor="patient-age">Patient's age: </label>
            <input
              {...register("patientAge", { required: true })}
              className="input-info-patient age w-12"
              type="number"
              inputMode="numeric"
              max="110"
            />
            <input {...register("dateTreatment")} disabled className="text-end" />
          </div>
          <label htmlFor="name-patient">Patient's name:</label>
          <input
            {...register("namePatient", { required: true })}
            placeholder="Write patient's name"
            className="input-info-patient"
            type="text"
          />
        </div>
        {/* Header */}
        <div className="modal-grid modal-grid-header">
          <span>Codes</span>
          <span>Products</span>
          <span>Left</span>
          <span>Mid</span>
          <span>Right</span>
        </div>

        {/* Rows */}
        {codeList.map((code, i) => (
          <div className="modal-grid" key={i}>
            <input
              {...register(`treatmentPlan.${i}.code`)}
              readOnly
              className="modal-cell modal-cell-input"
            />
            <select
              {...register(`treatmentPlan.${i}.product`, { required: true })}
              className="modal-cell"
            >
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <select
              {...register(`treatmentPlan.${i}.left`, { required: true })}
              className="modal-cell"
            >
              {volumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <select
              {...register(`treatmentPlan.${i}.mid`, { required: true })}
              className="modal-cell"
            >
              {volumes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <select
              {...register(`treatmentPlan.${i}.right`, { required: true })}
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
