import logo from "@/assets/logo-main.svg";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Popup from "./header/Popup";
import Sidemenu from "./header/Sidemenu";

import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { UserType } from "@/utils/types";

export default function Header(): JSX.Element {
  interface NavLink {
    label: string;
    url: string;
  }

  const navLinks: NavLink[] = [
    { label: "Home", url: "/" },
    { label: "Recipes", url: "/recipes/filter" },
    { label: "Blog", url: "/blog" },
    { label: "About", url: "/about" },
  ];

  const token: string | undefined = Cookies.get("token");
  const [user, setUser] = useState<undefined | UserType>();

  useEffect(() => {
    token && setUser(jwtDecode(token));
  }, [token]);
  return (
    <>
      <div className="header">
        <div className="container">
          <Link className="header-logo" href={"/"}>
            <Image src={logo} alt="Foodie" />
          </Link>


          {user ? null : <Login />}


          <div className="header-content">
            <form>
              <label className="sr-only">Search</label>
              <div className="search">
                <input type="search" placeholder="Search some recipe..." />
                <div className="search-icon">
                  <FaSearch className="w-full" />
                </div>
              </div>
            </form>

            <div className="profile">
              <Popup />
            </div>
            <div className="menu">
              <Sidemenu />
              <nav>
                <ul>
                  {navLinks.map((navLink, index) => (
                    <li key={index}>
                      <Link href={navLink.url}>{navLink.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
