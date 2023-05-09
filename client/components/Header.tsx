import Link from "next/link";
import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Popup from "./header/Popup";
import Login from "./header/Login";
import { useUser } from "@/context/userContext";
import Logo from "@/public/Logo";

export default function Header(): JSX.Element {
  const { user } = useUser();
  interface MenuItem {
    label: string;
    url: string;
  }
  const menuItems: MenuItem[] = [
    { label: "Home", url: "/" },
    { label: "Recipes", url: "/recipes/filter" },
    { label: "Blog", url: "/blog" },
    { label: "About", url: "/about" },
  ];

  return (
    <>
      <div className="header">
        <div className="container content">
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

          {user ? <Popup /> : <Login />}
        </div>
      </div>
    </>
  );
}
