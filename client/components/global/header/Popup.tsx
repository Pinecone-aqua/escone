/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { FaUser } from "react-icons/fa";

export default function Popup() {
  const menu: React.MutableRefObject<any> = useRef(null);
  const items = [
    {
      label: "Information",
      link: "/",
    },
    {
      label: "Favorites",
      link: "/",
    },
    {
      label: "Log out",
      link: "/",
    },
  ];

  return (
    <div className="popup">
      <Menu model={items} popup ref={menu} className="mt-2" />
      <Button
        className="bg-white hover:bg-gray-200 border-none"
        icon={<FaUser />}
        onClick={(e) => menu.current.toggle(e)}
      />
    </div>
  );
}
