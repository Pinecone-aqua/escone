import React from "react";
import Nav from "@/public/icons/Icons";
import { User, FoodLogo } from "@/public/icons/Icons";
import NavDropDown from "./subcomp/NavDropDown";
import UserDropDown from "./subcomp/UserDropDown";

export default function Header() {
  return (
    <div className="flex justify-around bg-black">
      <div>
        <NavDropDown />
      </div>
      <div>
        <a href="/">
          <FoodLogo />
        </a>
      </div>
      <div>
        <UserDropDown />
      </div>
    </div>
  );
}
