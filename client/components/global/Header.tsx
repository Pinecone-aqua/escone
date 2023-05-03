import logo from "@/assets/logo-main.svg";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Popup from "./header/Popup";
import Sidemenu from "./header/Sidemenu";
import Login from "./header/Login";
<<<<<<< HEAD

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

export default function Header(): JSX.Element {
=======

export default function Header(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
>>>>>>> f3b54c1 (google login)
  return (
    <>
      <div className="header">
        <div className="container">
          <Link className="header-logo" href={"/"}>
            <Image src={logo} alt="Foodie" />
          </Link>

          <Login />

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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded"
              onClick={() => setShow(true)}
            >
              Log in
            </button>
            {show && <Login setShow={setShow} />}
            <div className="profile">
              <Popup />
            </div>
            <div className="menu">
              <Sidemenu />
<<<<<<< HEAD
              <nav>
                <ul>
                  {navLinks.map((navLink, index) => (
                    <li key={index}>
                      <Link href={navLink.url}>{navLink.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
=======
>>>>>>> f3b54c1 (google login)
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
