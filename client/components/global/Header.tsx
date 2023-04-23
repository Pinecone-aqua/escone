import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-main.svg";
import { FaSearch, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function Header(): JSX.Element {
  return (
    <div className="flex sticky top-0 w-full h-[100px] bg-white shadow z-40">
      <div className="container flex items-center justify-between mx-auto p-[20px]">
        <button className="flex items-center justify-center md:hidden">
          <FiMenu className="text-primary w-[25px] h-[25px]" />
        </button>

        <Link href={"/"} className="block">
          <Image src={logo} alt="foodie" />
        </Link>

        <form className="hidden lg:block">
          <label className="mb-2 text-sm font-medium sr-only">Search</label>
          <div className="relative flex">
            <input
              type="search"
              className="block mw-[400px] h-[45px] pl-12 text-primary text-md-reg rounded-3xl bg-white placeholder-primary border-none"
              placeholder="Search recipe..."
            />
            <div className="absolute inset-y-0 flex items-center pl-5 pointer-events-none">
              <FaSearch className="fill-primary" />
            </div>
          </div>
        </form>

        <nav className="hidden md:flex px-5 w-[420px]">
          <ul className="flex items-center justify-between text-primary text-md-reg w-full">
            <li className="hover:text-secondary duration-500">
              <Link href={"#"}>Home</Link>
            </li>
            <li className="hover:text-secondary duration-500">
              <Link href={"#"}>Recipes</Link>
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

        <Link href={"/"} className="flex items-center justify-center">
          <FaUser className="fill-primary hover:fill-secondary duration-500 w-[25px] h-[25px]" />
        </Link>
      </div>
    </div>
  );
}
