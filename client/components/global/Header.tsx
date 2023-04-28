import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-main.svg";
import { FiMenu } from "react-icons/fi";
import { FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";
import { Login } from "./header/Login";

export default function Header(): JSX.Element {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="flex sticky top-0 w-full h-[100px] bg-white shadow z-40">
      <div className="container flex items-center justify-between mx-auto p-[20px]">
        <div className="relative lg:hidden">
          <button
            className="flex items-center justify-center "
            onClick={() => {
              setMenu(!menu);
            }}
          >
            <FiMenu className="text-primary hover:text-secondary duration-500 w-[25px] h-[25px]" />
          </button>
          {menu && (
            <div className="absolute border bg-white p-5 top-[50px] rounded-2xl shadow-xl">
              <form className="border border-primary rounded-full">
                <label className="mb-2 text-sm font-medium sr-only">
                  Search
                </label>
                <div className="relative flex">
                  <input
                    onChange={() => {
                      console.log("hha hogcne");
                    }}
                    type="search"
                    className="block w-[300px] h-[45px] pl-[60px] text-primary text-md-reg rounded-3xl bg-white placeholder-primary border-none"
                    placeholder="Search recipe..."
                  />
                  <div className="absolute inset-y-0 flex items-center px-5 pointer-events-none">
                    <FaSearch className="fill-primary w-[23px] h-[23px]" />
                  </div>
                </div>
              </form>

              <nav className="px-5 w-full my-3">
                <ul className="text-md-reg text-primary justify-center items-center w-full">
                  <li className="hover:text-secondary duration-500 flex justify-center py-2">
                    <Link href={"#"}>Home</Link>
                  </li>
                  <li className="hover:text-secondary duration-500 flex justify-center py-2">
                    <Link href={"#"}>Recipes</Link>
                  </li>
                  <li className="hover:text-secondary duration-500 flex justify-center py-2">
                    <Link href={"#"}>Blog</Link>
                  </li>
                  <li className="hover:text-secondary duration-500 flex justify-center py-2">
                    <Link href={"#"}>Maps</Link>
                  </li>
                  <li className="hover:text-secondary duration-500 flex justify-center py-2">
                    <Link href={"#"}>About</Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        <Link href={"/"} className="block">
          <Image src={logo} alt="foodie" />
        </Link>

        {/* SEARCH */}
        <form className="hidden md:block">
          <label className="mb-2 text-sm font-medium sr-only">Search</label>
          <div className="relative flex">
            <input
              type="search"
              className="block mw-[400px] h-[45px] pl-[60px] text-primary text-md-reg rounded-3xl bg-white placeholder-primary border-none"
              placeholder="Search recipe..."
            />
            <div className="absolute inset-y-0 flex items-center px-5 pointer-events-none">
              <FaSearch className="fill-primary w-[23px] h-[23px]" />
            </div>
          </div>
        </form>

        {/* NAVBAR */}
        <nav className="hidden lg:flex px-5 w-[450px]">
          <ul className="flex items-center justify-between text-primary text-md-reg w-full">
            <li className="hover:text-secondary duration-500">
              <Link href={"#"}>Home</Link>
            </li>
            <li className="hover:text-secondary duration-500">
              <Link href={"/recipes"}>Recipes</Link>
            </li>
            <li className="hover:text-secondary duration-500">
              <Link href={"#"}>Blog</Link>
            </li>
            <li className="hover:text-secondary duration-500">
              <Link href={"#"}>Maps</Link>
            </li>
            <li className="hover:text-secondary duration-500">
              <Link href={"#"}>About</Link>
            </li>
          </ul>
        </nav>

        {/* LOGIN TEST BUTTON */}
        <div className="static">
          <button
            className="p-1 px-3 rounded-full border text-secondary border-secondary hover:bg-secondary/10 duration-300"
            onClick={() => {
              setShow(!show);
            }}
          >
            LOGIN
          </button>
          {show && <Login setShow={setShow} />}
        </div>

        {/* USER */}
        <div className="relative">
          <button
            className="border p-2 rounded-full block"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            <FaUser className="fill-primary hover:fill-secondary duration-500 w-[23px] h-[23px]" />
          </button>
          {dropdown && (
            <div className="absolute border w-[170px] top-[70px] right-0 py-1 px-3 bg-white shadow-xl rounded-lg">
              <ul className="grid grid-cols-1 divide-y text-md-reg text-gray-700">
                <li className="hover:text-secondary duration-300 px-2 py-1 cursor-pointer">
                  Information
                </li>
                <li className="hover:text-secondary duration-300 px-2 py-1 cursor-pointer">
                  Favorites
                </li>
                <li className="hover:text-secondary duration-300 px-2 py-1 cursor-pointer">
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
