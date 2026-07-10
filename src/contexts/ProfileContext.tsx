/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {  profileSettings } from "../api/routes/profile";
import { get, ref, update } from "firebase/database";
import { db } from "../firebaseConfig";

interface UserInfo {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_uid: string;
}
interface NewData {
  [x: string]: { value: string };
}
interface PromiseResponse {
  message: string;
  status: number;
}

interface PropsContext {
  userInfo: UserInfo | null;
  isLoading: boolean;
  createNewPreference: (newData: NewData) => Promise<PromiseResponse>;
}

const ProfileContext = createContext<PropsContext | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;
    get(profileSettings(user.uid)).then((snapshot) => {
      if (snapshot.exists()) {
        setUserInfo(snapshot.val());
        requestAnimationFrame(() => setIsLoading(false));
        return;
      }
      throw new Error(
        "Não foi possível obter os dados do banco de dados, tente novamente mais tarde"
      );
    });
  }, [user]);

  const createNewPreference = async (newData: NewData): Promise<PromiseResponse> => {
    setIsLoading(true);
    try {
      if (!user?.uid) {
        throw new Error("User not found. Please, connect in your account");
      }
      
      await update(ref(db), newData)
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
    <ProfileContext.Provider value={{ userInfo, isLoading, createNewPreference }}>
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
