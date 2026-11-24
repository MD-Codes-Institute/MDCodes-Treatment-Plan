import {  useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../data/schema-form/treatmentPlan";

type TreatmentPlanForm = UseFormReturn<z.infer<typeof formSchema>>;

export const useInputToggle = () => {
  const [activeInputs, setActiveInputs] = useState<
    Array<{ product?: string; index: number; side?: "right" | "mid" | "left" }>
  >([]);

  
  const isInputActive = (
    index: number,
    side?: "right" | "mid" | "left",
    product?: string
  ) => {
    return activeInputs.some((input) => {
      if (side && !product) {
        return input.index === index && input.side === side;
      }
      if (product && !side) {
        return input.index === index && input.product === product;
      }
      return false;
    });
  };


  const toggleInput = (
    index: number,
    side?: "right" | "mid" | "left",
    product?: string
  ) => {
    setActiveInputs((prev) => {
      const exists = prev.some((input) => {
        if (side) {
          return input.index === index && input.side === side;
        }
        if (product) {
          return input.index === index && input.product === product;
        }
      });
      if (exists) {
        return prev.filter(
          (input) =>
            (input.index !== index && input.side !== side) ||
            (input.index !== index && input.product !== product)
        );
      }
      if (side) {
        return [...prev, { index, side }];
      }
      return [...prev, { index, product }];
    });
  };

  const handleBlurInput = (
    index: number,
    value: string,
    form: TreatmentPlanForm,
    side?: "right" | "mid" | "left",
    product?: string
  ) => {
    if (product) {
      form.setValue(`treatmentPlan.cart.${index}.product`, value);
      return;
    }
    if (side) {
      form.setValue(`treatmentPlan.cart.${index}.${side}`, value);
    }
  };

  return {
    isInputActive,
    toggleInput,
    handleBlurInput,
  };
};
