import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { FirebaseError } from "firebase/app";
import z from "zod";
import toast from "react-hot-toast";

const schemaSignIn = z.object({
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

export type formSchema = z.infer<typeof schemaSignIn>;

const useSignIn = () => {
  const { control, handleSubmit } = useForm<formSchema>({ resolver: zodResolver(schemaSignIn) });

  const onSubmit = async (data: formSchema) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Successfully logged in")
    } catch (err) {
      if (err instanceof FirebaseError) {
        toast.error(err.message);
        throw err;
      } else {
        toast.error("Error in our server, please try again later");
      }
    }
  };

  return { onSubmit, control, handleSubmit };
};

export default useSignIn;
