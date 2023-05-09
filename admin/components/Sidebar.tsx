import React from "react";
import { AiOutlineDashboard, AiOutlineComment } from "react-icons/ai";
import { TbTriangleSquareCircle, TbSettings } from "react-icons/tb";
import { ImSpoonKnife, ImUsers } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/utils/logo";

const SideBarItems = [
  { label: "Dashboard", url: "/", icon: <AiOutlineDashboard /> },
  { label: "Recipes", url: "/recipes", icon: <ImSpoonKnife /> },
  { label: "Users", url: "/users", icon: <ImUsers /> },
  { label: "Reviews", url: "/reviews", icon: <AiOutlineComment /> },
  { label: "Others", url: "/others", icon: <TbTriangleSquareCircle /> },
  { label: "Settings", url: "/settings", icon: <TbSettings /> },
];

export default function Sidebar(): JSX.Element {
  const { asPath } = useRouter();
  console.log(asPath);
  return (
    <div className="bg-blue-900 w-[300px] px-14 text-white min-h-[100vh] py-10 flex flex-col items-center gap-10">
      <Logo width={400} height={60} />
      <ul className="w-full flex flex-col gap-10">
        {SideBarItems.map((item, index) => (
          <Link
            key={index}
            href={item.url}
            className={`flex gap-2 items-center text-2xl  py-4 px-6 rounded-xl ${
              asPath == item.url && `bg-green-500`
            } `}
          >
            <span className="text-3xl"> {item.icon} </span>
            {item.label}
          </Link>
        ))}
      </ul>
    </div>
  );
}
