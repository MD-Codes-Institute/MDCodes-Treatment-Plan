import { sendPasswordResetEmail } from "firebase/auth";
import { z } from "zod";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import ActionButton from "../../components/button/ActionButton";

const schemaEmail = z.object({
  user_email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"),
});

interface Props {
  setShowForgot: Dispatch<SetStateAction<boolean>>;
}

const ForgetPassword: React.FC<Props> = ({ setShowForgot }) => {
  const [email, setEmail] = useState<string>("");
  const resetPassword = async () => {
    try {
      schemaEmail.parse({ user_email: email });
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox and spam folder.");
      setShowForgot(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-not-found") {
          toast.error("No account found with that email address.");
        } else {
          toast.error("Sorry, we're having a problem with our server. Please try again later.");
        }
        return;
      }
      toast.error("Sorry, we're having a problem with our server. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5">
      <h1 className="text-center text-white">Sent reset password</h1>
      <label htmlFor="input-email">Write your email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="border border-amber-50 rounded-2xl w-70 h-10 custom-input placeholder:px-1"
      />
      <ActionButton
        type="button"
        color="gold"
        onClick={resetPassword}
        className="w-[80%] h-7 rounded-md!"
      >
        Reset password
      </ActionButton>
      <button onClick={() => setShowForgot(false)} className="text-white">
        Cancel
      </button>
    </div>
  );
};

export default ForgetPassword;
