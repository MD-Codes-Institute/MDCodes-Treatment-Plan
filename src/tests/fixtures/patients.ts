import { PatientFormatted } from "../../types/Patients";

export const mockUser = { uid: "user-123", reload: jest.fn().mockResolvedValueOnce(undefined) };
export const mockPatients: PatientFormatted[] = [
  {
    id: "id-patient-random",
    name: "Nicoly Cristhyne",
    age: "21",
    treatmentPlan: [
      {
        idPlan: "id-plan-random",
        dateTreatment: "17/04/2026",
        cart: [
          {
            code: "T1",
            left: "0.5",
            mid: "0",
            product: "VM",
            right: "0.5",
          },
          {
            code: "T2",
            left: "0.5",
            mid: "0",
            product: "VM",
            right: "0.5",
          },
        ],
      },
    ],
  },
  {
    id: "id-patient-random",
    name: "Paulo Henrique",
    age: "22",
    treatmentPlan: [
      {
        idPlan: "id-plan-random",
        dateTreatment: "18/10/2022",
        cart: [
          {
            code: "T1",
            left: "0.1",
            mid: "0",
            product: "VM",
            right: "0.1",
          },
          {
            code: "T2",
            left: "0.1",
            mid: "0",
            product: "VM",
            right: "0.1",
          },
        ],
      },
    ],
  },
];
export const newDataRaw = {
  name: "Anderson Martins",
  age: "44",
  treatmentPlan: {
    dateTreatment: "17/04/2026",
    cart: [
      {
        code: "T1",
        left: "0.5",
        mid: "0",
        product: "VM",
        right: "0.5",
      },
      {
        code: "T2",
        left: "0.5",
        mid: "0",
        product: "VM",
        right: "0.5",
      },
    ],
  },
};
