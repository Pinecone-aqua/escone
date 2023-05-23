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
    { label: "Нүүр", url: "/" },
    { label: "Жор", url: "/recipes" },
    { label: "Нийтлэл", url: "/blog" },
    { label: "Бидний тухай", url: "/about" },
  ];

  return (
    <>
      <div className="menu">
        <button onClick={() => setVisible(true)} className="menu-btn">
          <FiMenu />
        </button>
        <Sidebar
          visible={visible}
          position="top"
          onHide={() => setVisible(false)}
        >
          <nav className="menu">
            <ul className="flex w-full justify-around">
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
