import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";

type formProps = {
  form: {
    name: string;
    email: string;
    password: string;
    phone: string;
  };
};
const createUser = async ({ form }: formProps) => {
  const createdUser = await createUserWithEmailAndPassword(
    auth,
    form.email,
    form.password
  );
  const uid = createdUser.user.uid;
  const database = ref(db, `/users/user-${uid}`);
  console.log("Usuário criado com sucesso!", uid);

  const setUserDB = await set(database, {
    user_id: uid,
    user_name: form.name,
    user_email: form.email,
    user_phone: form.phone,
  });
  console.log(setUserDB);
};

export default createUser;
