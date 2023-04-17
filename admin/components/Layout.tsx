import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

type Props = { children: ReactNode };

export default function Layout({ children }: Props): JSX.Element {
  return (
    <div className="">
      <Header />
      <div className="flex gap-40">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
