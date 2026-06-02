import { ref} from "firebase/database"
import { db } from "../../firebaseConfig"

export const patientsDatabase = (uid: string) => {
  return ref(db, `/patients/user-${uid}`)
}
