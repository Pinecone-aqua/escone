import React from "react";
import { navLinks } from "../utils/data";
import Link from "next/link";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="">
      <nav className="gap-4">
        {navLinks.map((link, index) => (
          // eslint-disable-next-line react/jsx-key
          <ul>
            <Link href={link.path}>
              <li key={index}>{link.name}</li>
            </Link>
          </ul>
        ))}
      </nav>
    </div>
  );
}
