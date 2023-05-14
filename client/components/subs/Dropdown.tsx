/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import Cookies from "js-cookie";
import { useUser } from "@/context/userContext";

export default function Dropdown() {
  const menu: React.MutableRefObject<any> = useRef(null);
  const { user, setUser } = useUser();
  const items = [
    {
      icon: "pi pi-fw pi-user",
      label: "Profile",
      url: `/profile?user=${user?._id}`,
    },
    { icon: "pi pi-plus", label: "Add recipe", url: "/addRecipe" },
    { icon: "pi pi-heart", label: "Favorites", url: "/profile/favorites" },
    {
      icon: "pi pi-sign-out",
      label: "Log out",
      link: "/",
      command: logoutHandler,
    },
  ];
  function logoutHandler() {
    console.log("logout");
    Cookies.remove("token");
    setUser(undefined);
  }

  function dropDownHanlder(e: any) {
    menu.current.toggle(e);
  }
  return (
    <div className="popup  flex justify-content-center">
      <Menu model={items} popup ref={menu} className="mt-3" />

      <button className="popup gap-2" onClick={dropDownHanlder}>
        Hi, {user?.username}!
      </button>
    </div>
  );
}
