/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { ref, update } from "firebase/database";
import { db } from "../firebaseConfig";
import { getPreferences } from "../api/database/getPreference";

interface UserInfo {
  user_name: string;
  user_email: string;
  user_uid: string;
}
interface NewPreference {
  [x: string]: { value: string };
}

interface PreferredItems {
  key: string;
  value: string;
}

interface Preferences {
  title: string;
  items: PreferredItems[];
}

interface PromiseResponse {
  message: string;
  status: number;
}

interface PropsContext {
  userInfo: UserInfo | null;
  isLoading: boolean;
  createNewPreference: (newData: NewPreference) => Promise<PromiseResponse>;
  preferenceData: Preferences[] | null;
}

const ProfileContext = createContext<PropsContext | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [preferenceData, setPreferenceData] = useState<Preferences[] | null>(null);

  useEffect(() => {
    if (user) {
      setUserInfo({ user_name: user.displayName!, user_email: user.email!, user_uid: user.uid });
      requestAnimationFrame(() => setIsLoading(false));
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    getPreferences(user.uid).then((value) => {
      if (value.hasPreference === true) {
        const preference: Preferences[] = Object.entries(value.preferenceData ?? {}).map(
          ([title, values]) => {
            const items = Object.entries(values).map(([itemKey, itemValue]) => {
              return { key: itemKey, value: itemValue.value };
            });
            return { title, items };
          }
        );
        setPreferenceData(preference);
      }
    });
  }, [user]);

  const createNewPreference = async (newData: NewPreference): Promise<PromiseResponse> => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        throw new Error("User not found. Please, connect in your account");
      }
      await update(ref(db), newData);
      return { message: "Sucess in create a new preference", status: 201 };
    } catch (err) {
      if (err instanceof Error) {
        return { message: err.message, status: 404 };
      }
      return { message: "Unknow error, please try again later", status: 500 };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ userInfo, isLoading, createNewPreference, preferenceData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile deve ser usado dentro de um ProfileProvider!");
  }
  return context;
};
