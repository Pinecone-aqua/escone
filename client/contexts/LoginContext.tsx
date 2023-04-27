import { Login } from "@/components/global/header/Login";
import { useState } from "react";
import { createContext } from "vm";

export const LoginContext = createContext();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LoginProvider = ({ children }: any): JSX.Element => {
  const [show, setShow] = useState(false);

  return (
    <LoginContext.Provider value={{ setShow }}>
      {children}
      <Login show={show} setShow={setShow} />
    </LoginContext.Provider>
  );
};
