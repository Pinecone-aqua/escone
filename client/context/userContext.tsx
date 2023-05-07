import { PropType, userContextType, UserType } from "@/utils/types";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

const userContext = createContext<userContextType>({} as userContextType);

export const useUser = () => useContext(userContext);

export default function UserProvider({ children }: PropType) {
  const [user, setUser] = useState<UserType | null>();
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));

  useEffect(() => {
    token && setUser(jwtDecode(token));
  }, [token]);
  return (
    <userContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </userContext.Provider>
  );
}
