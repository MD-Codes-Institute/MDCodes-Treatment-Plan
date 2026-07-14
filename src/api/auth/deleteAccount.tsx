import { deleteUser, User } from "firebase/auth";
import { remove, ref } from "firebase/database";
import { db } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";
import { useHistory } from "react-router";

type HistoryType = ReturnType<typeof useHistory>;

const deleteAccount = async (user: User | null, history: HistoryType) => {
  if (!user) return;
  try {
    console.log(user);
    const dbRef = ref(db, `users/user-${user.uid}`);
    await deleteUser(user);
    console.log("Usuário deletado com sucesso!");
    await remove(dbRef);
    console.log("Removido do db");
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (
        error.code === "auth/requires-recent-login" ||
        error.code === "auth/user-token-expired)"
      ) {
        toast.error("Error deleting user. You need to log in again.");
        history.push("/tabs/re-authenticate");
      } else {
        toast.error("Error deleting user. Please try again later.");
      }
    }
    console.log(error);
  }
};
export default deleteAccount;
