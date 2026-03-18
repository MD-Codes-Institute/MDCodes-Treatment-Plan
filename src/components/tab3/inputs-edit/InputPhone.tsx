import { InputField } from "./InputName";
import { classBtn } from "../../../contents/auth/ContentForms";
import { useState } from "react";
import useUpdateUserInfo from "../../../services/crud-auth/updateUserInfo";
import { z, ZodError } from "zod";

const schemaPhone = z.object({
  user_phone: z
    .string()
    .min(11, "Invalid phone number!")
    .regex(/^[1-9]{2}9?\d{8}$/, "Phone number format is invalid"),
});

const InputPhone: React.FC<InputField> = ({ setEditField, setRefresh }) => {
  const [newPhone, setNewPhone] = useState<string>("");
  const { updateFirebase } = useUpdateUserInfo();
  const handleClick = (e: any) => {
    e.preventDefault();
    try {
      schemaPhone.parse({ user_phone: newPhone });
      updateFirebase({ user_phone: newPhone }).then(() => {
        console.log("Numero de telefone alterado com sucesso!");
        setRefresh((prev) => prev + 1);
        setEditField("");
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues);
        alert("Error changing phone number");
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form>
        <div className="flex flex-col items-center gap-5">
          <label htmlFor=" text-white">Phone:</label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="Write your number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
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
      <button className="text-white mt-5" onClick={() => setEditField("")}>
        Cancel
      </button>
    </div>
  );
};

export default InputPhone;
