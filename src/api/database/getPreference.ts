import { get, ref } from "firebase/database";
import { db } from "../../firebaseConfig";
import { FirebaseError } from "firebase/app";

interface DataPreference {
  [s: string]: { [x: string]: { value: string } };
}

type PromiseResolved =
  | { message: string; hasPreference: false; status: number }
  | { message: string; hasPreference: true; status: number; preferenceData: DataPreference };

export const getPreferences = async (userId: string): Promise<PromiseResolved> => {
  try {
    const snapshot = await get(ref(db, `/preferences/user-${userId}`));
    if (!snapshot.exists()) {
      throw new Error("There no are preferences");
    }
    return {
      message: "Success in get database of preference",
      status: 200,
      hasPreference: true,
      preferenceData: snapshot.val(),
    };
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message, status: 404, hasPreference: false };
    }
    if (error instanceof FirebaseError) {
      return { message: error.message, status: 400, hasPreference: false };
    }
    return { message: "unknow error", status: 500, hasPreference: false };
  }
};
