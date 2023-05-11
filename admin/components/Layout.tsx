import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = { children: ReactNode };

export default function Layout({ children }: Props): JSX.Element {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col gap-10 px-10 bg-slate-200 ">
        <Header />
        {children}
      </div>
    </div>
  );
}
