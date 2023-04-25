import React, { useState } from "react";

import { navLinks } from "../utils/data";

import Link from "next/link";

export default function Sidebar() {
  const [active, isActive] = useState(false);
  return (
    <div className="bg-[#0F123F] w-2/12 min-h-screen box-border">
      <nav>
        {navLinks.map((link, index) => (
          <ul key={index}>
            <Link href={link.path}>
              <li
                key={index}
                className="mt-20 h-10 text-center rounded bg-green-500 hover:bg-cyan-100 hover:text-xl"
              >
                {link.name}
              </li>
            </Link>
          </ul>
        ))}
      </nav>
    </div>
  );
}
