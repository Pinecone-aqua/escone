import React from "react";

import Link from "next/link";

export default function Sidebar(): JSX.Element {
  return (
    <div className="bg-blue-900 w-[300px] px-14 text-white min-h-[100vh] py-10">
      <ul className="w-full flex flex-col gap-8">
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
  );
}
