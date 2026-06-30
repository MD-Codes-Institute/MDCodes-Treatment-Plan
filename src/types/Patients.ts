export type FormattedTemplateValues<T> = Record<string, T>;

export interface Cart {
  code: string;
  product: string;
  right: string;
  mid: string;
  left: string;
}
export interface TreatmentPlan {
  dateTreatment: string;
  cart: Cart[];
}

export interface TreatmentPlanFormatted extends TreatmentPlan {
  idPlan: string;
}

export interface Patient {
  name: string;
  age: string;
  treatmentPlan?: FormattedTemplateValues<TreatmentPlan>;
}

export type PatientRaw = FormattedTemplateValues<Patient>;

export interface PatientFormatted {
  name: string;
  age: string;
  id: string;
  treatmentPlan: TreatmentPlanFormatted[];
}

export type PromiseResolved =
  | { message: string; status: number; havePatient: false }
  | { message: string; status: number; havePatient: true; dataPatient: PatientFormatted[] };


