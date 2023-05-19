import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Menu() {
  const [visible, setVisible] = useState<boolean>(false);

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

  return (
    <>
      <div className="menu">
        <button onClick={() => setVisible(true)} className="menu">
          <FiMenu />
        </button>
        <Sidebar visible={visible} position="top" onHide={() => setVisible(false)}>
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
    </>
  );
}
