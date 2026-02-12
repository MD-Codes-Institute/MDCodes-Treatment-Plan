import { db } from "../firebaseConfig";
import { get, child, ref } from "firebase/database";

/* function para obter dados do usuário*/export const getCredentialUser = async (uid: string) => {
  const dbRef = ref(db);
  const snapshot = await get(child(dbRef, `/users/user${uid}`));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return {
        name: data.username,
        email: data.user_email,
        phone: data.userphone,
    }
  } else {
    console.log("No data available");
    return null
  }
};

 
