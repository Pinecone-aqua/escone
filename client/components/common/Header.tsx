import Link from "next/link";
import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useUser } from "@/context/userContext";
import Logo from "@/public/Logo";
import Login from "./Login";
import Dropdown from "../subs/Dropdown";
import Menu from "../subs/Menu";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

interface MenuItem {
  label: string;
  url: string;
}

const menuItems: MenuItem[] = [
  { label: "Нүүр", url: "/" },
  { label: "Жор", url: "/recipes" },
  { label: "Нийтлэл", url: "/blog" },
  { label: "Бидний тухай", url: "/about" },
];

export default function Header(): JSX.Element {
  const { user } = useUser();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function searchHandler(e: any) {
    e.preventDefault();
    const searchValue = e.target.search.value;
    router.push(`/recipes?search=${searchValue}`);
    e.target.search.value = "";
  }
  return (
    <>
      <div className="header">
        <div className="container">
          <Link href="/" className="logo">
            <Logo />
          </Link>

          <div className="search">
            <input type="text" placeholder="хайлт хийх..." />
            <button>
              <FiSearch />
            </button>
          </div>

          <nav>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <Link href={menuItem.url}>{menuItem.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="options">
            {user ? <Dropdown /> : <Login />}

            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}
