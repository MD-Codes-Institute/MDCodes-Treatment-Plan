import { productValue } from "../../contents/tabs/ContentsTab3";
import { preferencesDb, db, auth } from "../../firebaseConfig";
import { get, ref } from "firebase/database";

const getProfilePreferences = async (uid: string) => {
  try {
    const database = ref(db, `preferences/user-${uid}`);
    const snapshot = await get(database);
    // const snapshot = await get(preferencesDb(uid, location));
    if (snapshot.exists()) {
      return {
        message: "Dados obtidos com sucesso ",
        state: true,
        local_currency: snapshot.val().local_currency,
        code_value: snapshot.val().code_value,
        profit_margin: snapshot.val().profit_margin,
        product_value: snapshot.val().product_value
      };
    }
  } catch (err) {
    console.log(err);
    return { message: "Error on our servers, please try again later.", state: false };
  }
};

export { getProfilePreferences };
