import logo from "@/assets/logo-main.svg";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Popup from "./header/Popup";
import Sidemenu from "./header/Sidemenu";
import Login from "./header/Login";

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
