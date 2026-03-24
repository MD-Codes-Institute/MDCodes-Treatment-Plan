import { settingsProfile } from "../../firebaseConfig";
import { get } from "firebase/database";
import { useState } from "react";

export type UserInfoItem = {
  id: string;
  info: string;
};

const useUserInfo = () => {
  // initialize with empty strings so UI renders deterministically
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const userInfo: UserInfoItem[] = [
    { id: "Name", info: name },
    { id: "Email", info: email },
    { id: "Phone", info: phone },
  ];

  /* function para obter dados do usuário crud*/
  const getCredentialUser = async (uid: string) => {
    try {
      const snapshot = await get(settingsProfile(uid));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setName(data?.user_name ?? "");
        setEmail(data?.user_email ?? "");
        setPhone(data?.user_phone ?? "");
        return true;
      } else {
        console.log("No data available");
        // keep defaults as empty strings
        return false;
      }
    } catch (err) {
      console.log("getCredentialUser error:", err);
      return false;
    }
  };

  return { getCredentialUser, userInfo };
};

export default useUserInfo;
