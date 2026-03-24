import { useState } from "react";
import { classBtn } from "../../../contents/auth/ContentForms";
import useUpdateUserInfo from "../../../services/crud-auth/updateUserInfo";
import { settingsProfile } from "../../../firebaseConfig";
import useAuth from "../../../pages/auth/useAuth";

export type InputField = {
  setEditField: React.Dispatch<React.SetStateAction<string>>;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
};
const InputName: React.FC<InputField> = ({ setEditField, setRefresh }) => {
  const { updateFirebase } = useUpdateUserInfo();
  const [newName, setNewName] = useState("");
  const { user } = useAuth();

  const handleClick = (e: any) => {
    e.preventDefault();
    if(!user) return
    updateFirebase({ user_name: newName }, settingsProfile(user.uid)).then(() => {
      console.log("Name atualizado!");
      setEditField("");
      setRefresh((prev) => prev + 1);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form>
        <div className="flex flex-col items-center gap-5">
          <label htmlFor=" text-white">Name:</label>
          <input
            type="text"
            placeholder="Write your Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border border-amber-50 rounded-2xl w-70 h-10 custom-input placeholder:px-1"
          />
          <input type="submit" value="Submit" onClick={handleClick} style={classBtn} />
        </div>
      </form>
      <button className="text-white mt-5" onClick={() => setEditField("")}>
        Cancel
      </button>
    </div>
  );
};

export default InputName;
