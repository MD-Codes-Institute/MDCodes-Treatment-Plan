import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { signOut, updatePassword, updateProfile } from "firebase/auth";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router";
import { auth } from "../firebaseConfig";
import { useState } from "react";
import z from "zod";
import toast from "react-hot-toast";

export const useProfileSettings = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const { user } = useAuth();
  const schema = z.object({
    user_name: z.string().min(2, "Please enter at least two characters.").optional(),
    user_email: z.email().optional(),
    user_password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
      )
      .optional(),
  });

  type FormSchema = z.infer<typeof schema>;

  const { control, handleSubmit } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    await toast.promise(updateDataBase(data), {
      loading: "Loading...",
      success: "Success in update your preferences",
      error: (err) => {
        if (err instanceof FirebaseError) {
          return err.message;
        }
        return err.message;
      },
    });
    setTimeout(() => setIsLoading(false), 1000);
  };

  const updateDataBase = async (data: FormSchema) => {
    if (!user) {
      throw new Error("User is not logged in");
    }
    const allUndefined = Object.values(data).every((value) => value === undefined);

    if (allUndefined) {
      throw new Error("Please fill in at least one field to update");
    }

    (Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
      if (data[key] === undefined) {
        delete data[key];
      }
    });

    if (data.user_name) {
      await updateProfile(user, { displayName: data.user_name });
      toast.success("Success in update your name");
    }
    if (data.user_email) {
      await updateEmail(data.user_email);
    }
    if (data.user_password) {
      await updatePasswordAuth(data.user_password);
    }
    history.push("/tabs/tab3");
    window.location.reload();
  };

  const updateEmail = async (email: string) => {
    if (!user) return;
    try {
      await verifyBeforeUpdateEmail(user, email);
      toast("Now you need to confirm your new email address before using it.", { duration: 5000 });
      await signOut(auth);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.message === "Firebase: Error (auth/requires-recent-login).") {
          history.push("/tabs/re-authenticate");
          throw new Error("Do you need login again");
        }
      } else {
        toast.error("Error in our services, please try again later")
        throw new Error("Error in our services, please try again later");
      }
    }
  };

  const updatePasswordAuth = async (password: string) => {
    if (!user) return;
    try {
      await updatePassword(user, password);
      await signOut(auth);
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.message === "Firebase: Error (auth/requires-recent-login).") {
          history.push("/tabs/re-authenticate");
          throw new Error("Do you need login again");
        }
      }
      throw new Error("Error in our services, please try again later");
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
  };
};
