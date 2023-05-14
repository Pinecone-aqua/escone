import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

interface MenuItem {
  label: string;
  url: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", url: "/" },
  { label: "Recipes", url: "/recipes" },
  { label: "Blog", url: "/blog" },
  { label: "About", url: "/about" },
];

export default function SideNav() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
      <button className="menu" onClick={() => setShow(true)}>
        <AiOutlineMenu />
      </button>

      <Sidebar visible={show} onHide={() => setShow(false)} className="sidenav">
        <nav>
          <ul>
            {menuItems.map((menuItem, index) => (
              <li key={index}>
                <Link href={menuItem.url}>{menuItem.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Sidebar>
    </div>
  );
}
