import React from "react";
import { RxDashboard } from "react-icons/rx";
import { MdReviews, MdCategory } from "react-icons/md";
import { ImSpoonKnife, ImUsers } from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/utils/logo";

const SideBarItems = [
  { label: "Хянах самбар", url: "/", icon: <RxDashboard /> },
  { label: "Жорын сан", url: "/recipes", icon: <ImSpoonKnife /> },
  { label: "Хэрэглэгчид", url: "/users", icon: <ImUsers /> },
  { label: "Сэтгэгдэл", url: "/reviews", icon: <MdReviews /> },
  { label: "Бусад", url: "/others", icon: <MdCategory /> },
];

export default function Sidebar(): JSX.Element {
  const { route } = useRouter();
  return (
    <div className="sidebar">
      <div className="logo">
        <Logo width={150} height={50} />
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
