import logo from "@/assets/logo-main.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Popup from "./header/Popup";
import Sidemenu from "./header/Sidemenu";

export default function Header(): JSX.Element {
  return (
    <>
      <div className="header">
        <div className="container">
          <Link className="header-logo" href={"/"}>
            <Image src={logo} alt="Foodie" />
          </Link>

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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
