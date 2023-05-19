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
  { label: "Home", url: "/" },
  { label: "Recipes", url: "/recipes" },
  // { label: "Blog", url: "/blog" },
  { label: "About", url: "/about" },
];

export default function Header(): JSX.Element {
  const { user } = useUser();

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="logo">
            <Logo />
          </div>

          <nav>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <Link href={menuItem.url}>{menuItem.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu">
            {user ? <Dropdown /> : <Login />}

            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}
