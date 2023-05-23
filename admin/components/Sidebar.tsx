import React from "react";
import { RxDashboard } from "react-icons/rx";
import { TbSettings } from "react-icons/tb";
import { ImSpoonKnife, ImUsers } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/utils/logo";

const SideBarItems = [
  { label: "Dashboard", url: "/", icon: <RxDashboard /> },
  { label: "Recipes", url: "/recipes", icon: <ImSpoonKnife /> },
  { label: "Users", url: "/users", icon: <ImUsers /> },
  { label: "Settings", url: "/settings", icon: <TbSettings /> },
];

export default function Sidebar(): JSX.Element {
  const { route } = useRouter();
  return (
    <div className="sidebar">
      <div className="logo">
        <Logo width={400} height={60} />
      </div>
      <ul>
        {SideBarItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={`btn ${route === item.url && "btn-active"} `}
          >
            <li>
              <span>{item.icon}</span>
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
