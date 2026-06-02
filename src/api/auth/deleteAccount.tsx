import { deleteUser, User } from "firebase/auth";
import { remove, ref } from "firebase/database";
import { db } from "../../firebaseConfig";

const deleteAccount = async (user: User | null, history: any) => {
  if (!user) return;
  try {
    console.log(user);
    const dbRef = ref(db, `users/user-${user.uid}`);
    await deleteUser(user);
    console.log("Usuário deletado com sucesso!");
    await remove(dbRef);
    console.log("Removido do db");
  } catch (error: any) {
    console.log(error);
    if (
      error.code === "auth/requires-recent-login" ||
      error.code === "auth/user-token-expired)"
    ) {
      history.push("/re-authenticate");
    } else {
      alert("Error deleting user. Please try again later.");
    }
  }
};
export default deleteAccount;
