import React, { ReactNode, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Signin from "@/pages/signin";
type Props = { children: ReactNode };

export default function Layout({ children }: Props): JSX.Element {
  const [isadmin, setIsadmin] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user: any = token && jwtDecode(token);
    if (user && user.role) {
      setIsadmin(true);
    }
  }, []);

  return isadmin ? (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full gap-10 px-10 bg-slate-200 ">
        <Header />
        {children}
      </div>
    </div>
  ) : (
    <Signin />
  );
}
