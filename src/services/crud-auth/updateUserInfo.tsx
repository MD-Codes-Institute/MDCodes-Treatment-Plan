import { auth, db } from "../../firebaseConfig";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { update, DatabaseReference } from "firebase/database";
import { useHistory } from "react-router";
import useAuth from "../../pages/auth/useAuth";

const useUpdateUserInfo = () => {
  const uid = auth.currentUser?.uid;
  const user = auth.currentUser;
  const { signOutUser } = useAuth();
  const history = useHistory();
  // re-autenticando usuário
  const reauthenticate = async (data: any) => {
    try {
      const credential = EmailAuthProvider.credential(
        data.email,
        data.password
      );
      if (user) {
        await reauthenticateWithCredential(user, credential);
        history.push("/edit-profile");
      }
    } catch (err) {
      console.log("Erro ao reauthenticar", err);
      return;
    }
  };

  // atualizando e-mail no database

  //   atualizando senha
  const setNewPassword = async (newPassword: string) => {
    try {
      console.log("tentando atualizar a senha do usuário");
      if (user) {
        const response = await updatePassword(user, newPassword);
        alert(
          "Password changed successfully. Please log in again to validate your information."
        );
        console.log(response);
        signOutUser().then(() => console.log("User logged out."));
      }
    } catch (error: any) {
      if (
        error.code === "auth/requires-recent-login" ||
        error.code === "auth/user-token-expired)"
      ) {
        history.push("/re-authenticate");
      }
      console.log(error);
    }
  };
  // atualizando o realtime database
  const updateFirebase = async (newData: { user_name?: string; user_email?: string; user_phone?: string;}, referenceDb: DatabaseReference) => {
    await update(referenceDb, newData);
    await user?.reload();
  };

  return { updateFirebase, reauthenticate, history, setNewPassword };
};

export default useUpdateUserInfo;
