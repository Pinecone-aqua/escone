import Link from "next/link";
import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useUser } from "@/context/userContext";
import Logo from "@/public/Logo";
import Login from "./Login";
import Dropdown from "../subs/Dropdown";
import Menu from "../subs/Menu";

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

export default function Header(): JSX.Element {
  const { user } = useUser();

  return (
    <>
      <div className="header">
        <div className="container">
          <Link href="/" className="logo">
            <Logo />
          </Link>

          <nav>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <Link href={menuItem.url}>{menuItem.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="options">
            {user ? <Dropdown /> : <Login />}

            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}
