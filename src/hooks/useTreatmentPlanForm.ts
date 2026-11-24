import { useState, useEffect, useCallback } from "react";
import { useCart } from "../contexts/CartContext";
import { useProfile } from "../contexts/ProfileContext";
import { usePatient } from "../contexts/PatientsContext";
import { useHistory } from "react-router";
import { type TreatmentPlan } from "../types/Patients";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../data/schema-form/treatmentPlan";
import { volumes, products } from "../data/tabs/ContentsTab2";
import { useFieldArray } from "react-hook-form";
import { getValueForCode } from "../data/tabs/getValueForCode";
import z from "zod";
import toast from "react-hot-toast";

export const useTreatmentPlanForm = () => {
  const { cart, deleteCart } = useCart();
  const { preferenceData } = useProfile();
  const history = useHistory();

  const {
    saveNewPatient,
    saveExistingPatient,
    displayed,
    searchPatient,
    isLoading,
  } = usePatient();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [treatmentPlan, setTreatmentPlan] = useState<TreatmentPlan | null>(
    null
  );

  const [confirmNew, setConfirmNew] = useState<boolean>(false);
  const [databaseProducts, setDatabaseProducts] = useState<string[]>([]);

  const dateNow: string = new Date().toISOString().slice(0, 10);

  const fetchDatabaseProducts = useCallback(() => {
    const productsFilter =
      preferenceData
        ?.find((item) => item.title === "product_value")
        ?.items.map((value) => value.key) || products;
    setDatabaseProducts([...productsFilter, "Other"]);
  }, [preferenceData]);

  type formData = z.infer<typeof formSchema>;

  const formProps = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: "",
      treatmentPlan: {
        dateTreatment: dateNow,
        cart: [
          {
            code: "",
            product: databaseProducts[0],
            right: volumes[0],
            mid: volumes[0],
            left: volumes[0],
          },
        ],
      },
    },
  });

  const { fields, replace } = useFieldArray({
    control: formProps.control,
    name: "treatmentPlan.cart",
  });

  const age = formProps.watch("age");

  useEffect(() => {
    if (cart.length === 0) history.push("/tabs/tab2");
    const replaceFields = cart.map((item) => {
      const response = getValueForCode(item.code);
      return {
        code: item.code,
        product: databaseProducts[0] ?? response.product,
        right: response.right,
        mid: response.mid,
        left: response.left,
      };
    });
    replace(replaceFields);
  }, [cart, replace, history, databaseProducts]);

  useEffect(() => {
    fetchDatabaseProducts();
  }, [fetchDatabaseProducts]);

  const handleSaveExistingPatient = async (
    patientId: string,
    treatmentPlan: TreatmentPlan
  ) => {
    const response = await toast.promise(
      saveExistingPatient(patientId, treatmentPlan, age),
      {
        loading: "Loading...",
        success: (data) => {
          if (data.status !== 201) throw new Error(data.message);
          return data.message;
        },
        error: (err) => err.message,
      }
    );
    if (response.status === 201) {
      setTimeout(() => {
        setIsModalOpen(false);
        deleteCart();
      }, 700);
    }
  };

  const handleCancelSaveExistingPatient = () => {
    setIsModalOpen(false);
    setConfirmNew(true);
  };

  const onSubmit = async (data: formData) => {
    const { name, age, treatmentPlan } = data;
    setTreatmentPlan(treatmentPlan);
    searchPatient(name.split(" ")[0]);
    if (displayed && displayed?.length >= 1 && !confirmNew) {
      setIsModalOpen(true);
    } else {
      const shippingConfirmation = confirm(
        "Are you sure you want to save this treatment plan? After this, you will not be able to edit any of this patient's information. Please review all information before saving."
      );
      if (shippingConfirmation) {
        const response = await toast.promise(
          saveNewPatient({ name, age }, treatmentPlan),
          {
            loading: "Loading...",
            success: (data) => {
              if (data.status !== 201) throw new Error(data.message);
              return data.message;
            },
            error: (err) => err.message,
          }
        );
        if (response.status === 201) {
          setTimeout(() => {
            setIsModalOpen(false);
            deleteCart();
          }, 700);
        }
      }
    }
  };

  return {
    onSubmit,
    handleCancelSaveExistingPatient,
    handleSaveExistingPatient,
    deleteCart,
    setIsModalOpen,
    displayed,
    isLoading,
    fields,
    formProps,
    isModalOpen,
    treatmentPlan,
    dateNow,
    databaseProducts,
    history,
  };
};
