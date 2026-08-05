import { useAuth } from "../../../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import createUser from "../../../api/auth/createUser";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

const schemaSignUp = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});

export type formDataSchema = z.infer<typeof schemaSignUp>;

const useSignUp = () => {
  const { sendVerification } = useAuth();
  const { handleSubmit, control } = useForm<formDataSchema>({
    resolver: zodResolver(schemaSignUp),
  });

  const onRegister = async (data: formDataSchema) => {
    await toast.promise(
      (async () => {
        await createUser({ form: data });
        await sendVerification();
      })(),
      {
        loading: "Creating your account...",
        success: "Account created! Check your email to verify your account.",
        error: (err) => {
          if (err instanceof FirebaseError) {
            if (err.code === "auth/email-already-in-use") {
              return "This email is already in use. Please try another one.";
            }
            return err.message;
          }
          return "Error in our server, please try again later.";
        },
      }
    );
  };
  return { onRegister, handleSubmit, control };
};

export default useSignUp;
