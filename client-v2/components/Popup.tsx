/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Menu } from "primereact/menu";
//import { useRouter } from 'next/router';

const items = [
  { icon: "pi pi-fw pi-user", label: "Profile", link: "/profile" },
  { icon: "pi pi-fw pi-cog", label: "Favorites", link: "/favorites" },
  { icon: "pi pi-sign-out", label: "Log out", link: "/" },
];
export default function Popup(): JSX.Element {
  const menu: React.MutableRefObject<any> = useRef(null);
  //const router = useRouter();

  return (
    <div className="popup card flex justify-content-center">
      <Menu model={items} popup ref={menu} className="mt-3" />

      <button className="popup gap-2" onClick={(e) => menu.current.toggle(e)}>
        Hi, User!{" "}
      </button>
    </div>
  );
}
