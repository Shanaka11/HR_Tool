"use client";
import { ReactNode, createContext, useContext } from "react";

type UserContextType = {
  userName?: string | null;
};

const UserContext = createContext<UserContextType | null>(null);

type UserInfo = {
  name?: string | null;
};

type UserProviderProps = {
  children: ReactNode;
  userInfo: UserInfo | null;
};

export const UserProvder: React.FC<UserProviderProps> = ({
  children,
  userInfo,
}) => {
  return (
    <UserContext.Provider value={{ userName: userInfo?.name }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  if (userContext === null)
    throw new Error(
      "useUserContext can only be used in components that are wrapped with UserProvider component"
    );
  return userContext;
};
