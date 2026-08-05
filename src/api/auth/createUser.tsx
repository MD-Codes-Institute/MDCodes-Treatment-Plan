import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";
import toast from "react-hot-toast";

type formProps = {
  form: {
    name: string;
    email: string;
    password: string;
  };
};
const createUser = async ({ form }: formProps) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(auth, form.email, form.password);
    const user = createdUser.user;
    await updateProfile(user, {
      displayName: form.name,
    });
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw err;
    } else {
      toast.error("Error in our server, please try again later");
      throw err;
    }
  }
};

export default createUser;
