import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
type PropType = {
  children: ReactNode;
};

export default function Layout({ children }: PropType) {
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
