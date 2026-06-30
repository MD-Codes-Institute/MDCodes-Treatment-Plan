import z from "zod";


export const cartSchema = z.object({
  code: z.string(),
  product: z.string(),
  right: z.string(),
  mid: z.string(),
  left: z.string(),
});

export const formSchema = z.object({
  name: z.string().min(3, "The minimum length for a patient's name is three characters."),
  age: z.string().min(2, "The patient's minimum age must have two digits.").max(3, "The patient's age cannot be in more than three digits."),
  treatmentPlan: z.object({
    dateTreatment: z.string(),
    cart: z.array(cartSchema),
  }),
});