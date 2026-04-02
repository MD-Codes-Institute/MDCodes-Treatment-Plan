import useUserInfo from "../../services/crud-auth/getUserInfo";
import useAuth from "../../pages/auth/useAuth";
import { useState } from "react";
import { useEffect } from "react";

const useTab2Handlers = () => {
  const { user } = useAuth();
  const { userInfo, getCredentialUser } = useUserInfo();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;
    getCredentialUser(user.uid).then(() => {});
    const findValue = userInfo.find((v) => v.id === "Name");
    findValue && setUsername(findValue.info);
    setTimeout(() => setLoading(false), 1000);
  }, [user, userInfo]);

  const handleDeleteLocalDb = () => {
    const deleteDb = confirm(
      "Do you want to delete your treatment plan? Your changes were not saved."
    );
    if (deleteDb) {
      localStorage.removeItem("codeList");
      window.location.reload();
    }
  };

  const handleSavePatient = (uid: string) => {};

  return { username, user, loading, handleDeleteLocalDb, handleSavePatient };
};

export default useTab2Handlers;
