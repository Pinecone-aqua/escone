import React from "react";

import Link from "next/link";

export default function Sidebar(): JSX.Element {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <ul className="nav">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
