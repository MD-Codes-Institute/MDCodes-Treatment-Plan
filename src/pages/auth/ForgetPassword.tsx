import { sendPasswordResetEmail } from "firebase/auth";
import { z, ZodError } from "zod";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { classBtn } from "../../contents/auth/ContentForms";
import { Dispatch, SetStateAction } from "react";
const schemaEmail = z.object({
  user_email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
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
      alert("Check your email.");
      console.log("Enviado com sucesso!");
      setShowForgot(false);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
        alert("Error changing email, invalid parameters.");
        return;
      } else if (error.code === "auth/user-not-found") {
        alert("No accounts were found with that email address.");
      }
      alert("Sorry, we're having a problem with our server.");
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
      <input
        type="button"
        value="Send"
        style={classBtn}
        onClick={resetPassword}
      />
      <button onClick={() => setShowForgot(false)} className="text-white">
        Cancel
      </button>
    </div>
  );
};

export default ForgetPassword;
