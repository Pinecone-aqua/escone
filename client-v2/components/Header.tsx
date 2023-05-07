import Link from "next/link";
import Cookies from "js-cookie";
import { UserType } from "@/utils/types";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Login from "./Login";
import Popup from "./Popup";

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

export default function Header() {
  const token = Cookies.get("token");
  const [user, setUser] = useState<UserType | null>(
    token ? jwtDecode(token) : null
  );

  useEffect(() => {
    token && setUser(jwtDecode(token));
  }, [token]);

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="logo">
            <h1>foodie.</h1>
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

          {user ? (
            // <p className="hello">Hello, {user.username} !</p>
            <Popup />
          ) : (
            <Login />
          )}
        </div>
      </div>
    </>
  );
}
