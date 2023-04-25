import React from "react";

import { navLinks } from "../utils/data";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div>
      <nav>
        {navLinks.map((link, index) => (
          <ul key={index}>
            <Link href={link.path}>
              <li key={index}>{link.name}</li>
            </Link>
          </ul>
        ))}
      </nav>
    </div>
  );
}
