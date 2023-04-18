import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-main.svg";
import { FaSearch, FaUser } from "react-icons/fa";

export default function Header(): JSX.Element {
  return (
    <div className="flex sticky top-0 w-full h-[80px] bg-light-orange">
      <div className="container flex items-center justify-between p-[20px]">
        <Link href={"/"}>
          <Image src={logo} alt="foodie" />
        </Link>

        <form>
          <label className="mb-2 text-sm font-medium sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center pl-5 pointer-events-none">
              <FaSearch color="#FF6600" />
            </div>
            <input
              type="search"
              className="block w-[450px] h-[45px] pl-12 text-gray-500 border-none rounded-3xl bg-white placeholder-gray-300"
              placeholder="Search recipe..."
            />
          </div>
        </form>

        <nav>
          <ul className="flex items-center gap-10 text-orange text-xs-bold">
            <li className="hover:text-semi-green duration-300">
              <Link href={"#"}>Home</Link>
            </li>
            <li className="hover:text-semi-green duration-300">
              <Link href={"#"}>Recipes</Link>
            </li>
            <li className="hover:text-semi-green duration-300">
              <Link href={"#"}>Blog</Link>
            </li>
            <li className="hover:text-semi-green duration-300">
              <Link href={"#"}>Maps</Link>
            </li>
            <li className="hover:text-semi-green duration-300">
              <Link href={"#"}>About</Link>
            </li>
          </ul>
        </nav>

        <Link href={"/"}>
          <FaUser className="fill-green hover:fill-semi-green duration-300" />
        </Link>
      </div>
    </div>
  );
}
