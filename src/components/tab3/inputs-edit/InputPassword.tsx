import { z, ZodError } from "zod";
import { classBtn } from "../../../contents/auth/ContentForms";
import useUpdateUserInfo from "../../../services/crud-auth/updateUserInfo";
import { useState } from "react";

const schemaPassword = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});

const InputPassword: React.FC = () => {
  const { history, setNewPassword } = useUpdateUserInfo();
  const [password, setPassword] = useState<string>("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      schemaPassword.parse({ password: password });
      setNewPassword(password).then(() => {
        console.log("Sent new password");
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
        alert("Error changing password, invalid parameters.");
      }
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-10 w-[90%]">
      <h2 className="text-white">Update password</h2>
      <form className="flex flex-col justify-center items-center text-center gap-5">
        <label htmlFor="input-password">Write your new password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="border border-amber-50 rounded-2xl w-70 h-10 custom-input placeholder:px-1"
        />
        <input type="submit" onClick={handleClick} style={classBtn}></input>
      </form>
      <button onClick={() => history.push("/tabs/tab3")} className="text-white">
        Cancel
      </button>
    </div>
  );
};

export default InputPassword;
