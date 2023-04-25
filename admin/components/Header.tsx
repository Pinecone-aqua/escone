import Logo from "@/utils/logo";
import React, { useState } from "react";

export default function Header(): JSX.Element {
  const [isSigned, setIsSigned] = useState(false);
  function IsLogged() {
    if (isSigned) {
      return (
        <div className="flex gap-8 w-2/6 justify-end">
          <button>Sign Out</button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-8 w-2/6 justify-end">
          <a href="/signin">
            <button className="hover:text-xl hover:text-cyan-100 text-green-500">
              Sign In
            </button>
          </a>
          <a href="/signup">
            <button className="hover:text-xl hover:text-cyan-100 text-green-500">
              Sign Up
            </button>
          </a>
        </div>
      );
    }
  }
  return (
    <div className="flex justify-between bg-[#0F123F] h-20 items-center">
      <div className="m-20">
        <a href="/">
          <Logo />
        </a>
      </div>
      <div className="p-4 w-3/6 rounded h-full ml-10">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded h-full"
        />
      </div>
      {IsLogged()}
    </div>
  );
}
