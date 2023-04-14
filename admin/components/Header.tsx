import React, { useState } from "react";

type Props = {};

export default function Header({}: Props): JSX.Element {
  const [isSigned, setIsSigned] = useState(false);
  function IsLogged() {
    if (isSigned) {
      return (
        <div>
          <button>Sign Out</button>
        </div>
      );
    } else {
      return (
        <div className="flex gap-8">
          <button>Sign In</button>
          <button>Sign Up</button>
        </div>
      );
    }
  }
  return (
    <div className="flex justify-between bg-slate-500">
      <h2 className="">Dashboard</h2>
      <input type="text" placeholder="Search" className="w-2/5 rounded" />
      {IsLogged()}
    </div>
  );
}
