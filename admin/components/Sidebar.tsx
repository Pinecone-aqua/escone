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
            <Link href="/accounting">Accounting</Link>
          </li>
          <li>
            <Link href="/reciperequest">Recipe request</Link>
          </li>
          <li>
            <Link href="/messages">Messages</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
