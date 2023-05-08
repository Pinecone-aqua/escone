import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import Cookies from "js-cookie";
import { useUser } from "@/context/userContext";

export default function Popup() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const menu: React.MutableRefObject<any> = useRef(null);
  const { setUser } = useUser();
  const items = [
    { icon: "pi pi-fw pi-user", label: "Profile", url: "/profile" },
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
  return (
    <div className="popup  flex justify-content-center">
      <Menu model={items} popup ref={menu} className="mt-3" />

      <button className="popup gap-2" onClick={(e) => menu.current.toggle(e)}>
        Hi, User!
      </button>
    </div>
  );
}
