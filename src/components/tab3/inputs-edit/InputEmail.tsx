import { useState } from "react";
import { classBtn } from "../../../contents/auth/ContentForms";
import { z, ZodError } from "zod";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import useUpdateUserInfo from "../../../services/crud-auth/updateUserInfo";
import useAuth from "../../../pages/auth/useAuth";

const schemaEmail = z.object({
  user_email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    ),
});

const InputEmail: React.FC = () => {
  const { user, signOutUser } = useAuth();
  const { history } = useUpdateUserInfo();
  const [newEmail, setNewEmail] = useState<string>("");

  const handleClick = async (e: any) => {
    e.preventDefault();
    try {
      schemaEmail.parse({ user_email: newEmail });
      if (user) {
        await verifyBeforeUpdateEmail(user, newEmail);
        alert(
          "Check your email and click the confirmation link to change your email address. Otherwise, your credentials will remain the same."
        );
        signOutUser().then(() => {
          console.log("User logged out");
        });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
        alert("Error changing email, invalid parameters.");
        return;
      } else if (
        error.code === "auth/requires-recent-login" ||
        error.code === "auth/user-token-expired)"
      ) {
        console.log("Precisa re-autenticar o usuário!");
        history.push("/re-authenticate");
      } else {
        console.log(error);
        alert("Error changing email, please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form>
        <div className="flex flex-col items-center gap-5">
          <label className="text-white">E-mail:</label>
          <input
            type="text"
            placeholder="Write your e-mail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border border-amber-50 rounded-2xl w-70 h-10 custom-input placeholder:px-1"
          />
          <input
            type="submit"
            value="Submit"
            onClick={handleClick}
            style={classBtn}
          />
        </div>
      </form>
      <button
        className="text-white mt-5"
        onClick={() => history.push("/tabs/tab3")}
      >
        Cancel
      </button>
    </div>
  );
};

export default InputEmail;
