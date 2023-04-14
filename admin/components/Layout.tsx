import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {};

export default function Layout({}: Props): JSX.Element {
  return (
    <div className="">
      <Header />
      <Sidebar />
    </div>
  );
}
