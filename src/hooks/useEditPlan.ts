import { useSearchParams, type Params } from "../hooks/useSearchParams";
import { usePatient } from "../contexts/PatientsContext";
import { useProfile } from "../contexts/ProfileContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { formSchema } from "../data/schema-form/treatmentPlan";
import { useHistory } from "react-router";
import { useMemo, useState } from "react";
import { update } from "firebase/database";
import { canEditPlan } from "../utils/canEditPlan";
import { patientsDatabase } from "../api/routes/patients";
import z from "zod";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../contexts/AuthContext";
import { products } from "../data/tabs/ContentsTab2";

export const useEditPlan = () => {
  const { user } = useAuth();
  const { patients, isLoading, setRefreshPatient } = usePatient();
  const { preferenceData } = useProfile();
  const history = useHistory();
  const { queryParams } = useSearchParams();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [productsList, setProductsList] = useState<string[]>([]);

  const params: Params = {
    patientId: queryParams.get("patientId") ?? "",
    idPlan: queryParams.get("idPlan") ?? "",
  };

  const patient = patients?.find((item) => item.id === params.patientId);
  const cart = patient?.treatmentPlan.find(
    (item) => item.idPlan === params.idPlan
  );

  useMemo(() => {
    const previousProduct =
      preferenceData
        ?.find((item) => item.title === "product_value")
        ?.items.map((value) => value.key) || products;
    setProductsList([...previousProduct, "Other"]);
  }, [preferenceData]);

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: patient?.name ?? "",
      age: patient?.age ?? "",
      treatmentPlan: {
        dateTreatment: cart?.dateTreatment ?? "",
        cart: cart?.cart ?? [],
      },
    },
    values: {
      name: patient?.name ?? "",
      age: patient?.age ?? "",
      treatmentPlan: {
        dateTreatment: cart?.dateTreatment ?? "",
        cart: cart?.cart ?? [],
      },
    },
  });

  const field = useFieldArray({
    control: form.control,
    name: "treatmentPlan.cart",
  });

  const onSubmit = async (data: FormSchema) => {
    if (!user) {
      throw new Error("You need register to continue it");
    }
    setIsUpdateLoading(true);
    toast.loading("loading...", { id: "loading" });
    try {
      if (!cart || !patient) {
        throw new Error("Not have Treatment Plan for edit");
      }

      if (!canEditPlan(cart.createdAt)) {
        throw new Error(
          "It is not possible to update this Treatment Plan, as more than 24 hours have passed since you last edited or added this patient."
        );
      }

      const newPatientInfo: Record<string, unknown> = {};
      const newCart: Record<string, unknown> = {};

      newPatientInfo[`${patient.id}/name`] = data.name;
      newPatientInfo[`${patient.id}/age`] = data.age;
      newCart[`${patient.id}/treatmentPlan/${cart.idPlan}/cart`] =
        data.treatmentPlan.cart;

      const db = patientsDatabase(user.uid);

      await update(db, newPatientInfo);
      await update(db, newCart);

      toast.dismiss("loading");
      toast.success("Sucess in update your treatmentPlan", { duration: 3400 });
      setRefreshPatient((prev) => (prev += 1));
      history.push("tab2");
    } catch (err) {
      toast.dismiss("loading");
      if (err instanceof FirebaseError) {
        toast.error(err.code, {
          duration: 2500,
        });
        console.error(err);
      }
      if (err instanceof Error) {
        toast.error(err.message, {
          duration: 2500,
        });
        console.error(err);
      }
    } finally {
      setIsUpdateLoading(false);
    }
  };

  return {
    onSubmit,
    productsList,
    isLoading,
    field,
    form,
    history,
    isUpdateLoading,
  };
};
