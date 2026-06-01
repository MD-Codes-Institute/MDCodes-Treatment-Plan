import { db } from "../../firebaseConfig";
import { ref } from "firebase/database";

export const profilePreferences = (uid: string, location: string) => {
  return ref(db, `/preferences/user-${uid}/${location}`);
};

export const profileSettings = (uid: string) => {
  return ref(db, `/users/user-${uid}`);
};
