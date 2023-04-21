import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo-main.svg";
import {
  FaPinterest,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

export default function Footer(): JSX.Element {
  return (
    <div className="fixed bottom-0 flex w-full h-[325px] bg-white shadow-inner">
      <div className="container flex flex-col items-center  justify-around mx-auto px-[20px] py-[30px]">
        <Link href={"/"}>
          <Image src={logo} alt="foodie" />
        </Link>

        <nav className="px-5 w-[460px]">
          <ul className="flex flex-wrap items-center justify-between text-gray-800 text-md-reg w-full">
            <li className="flex justify-center hover:text-secondary duration-500 w-1/3 md:w-1/5">
              <Link href={"#"}>Home</Link>
            </li>
            <li className="flex justify-center hover:text-secondary duration-500 w-1/3 md:w-1/5">
              <Link href={"#"}>Recipes</Link>
            </li>
            <li className="flex justify-center hover:text-secondary duration-500 w-1/3 md:w-1/5">
              <Link href={"#"}>Blog</Link>
            </li>
            <li className="flex justify-center hover:text-secondary duration-50 w-1/2 md:w-1/5">
              <Link href={"#"}>Maps</Link>
            </li>
            <li className="flex justify-center hover:text-secondary duration-500 w-1/2 md:w-1/5">
              <Link href={"#"}>About</Link>
            </li>
          </ul>
        </nav>

        <div className="text-gray-800 gap-5 flex flex-col">
          <div className="links">
            <ul className="flex justify-center items-center text-lg-bold gap-5">
              <li className="hover:text-primary duration-500">
                <Link href={"#"}>
                  <FaPinterest />
                </Link>
              </li>
              <li className="hover:text-primary duration-500">
                <Link href={"#"}>
                  <FaTwitter />
                </Link>
              </li>
              <li className="hover:text-primary duration-500">
                <Link href={"#"}>
                  <FaInstagram />
                </Link>
              </li>
              <li className="hover:text-primary duration-500">
                <Link href={"#"}>
                  <FaFacebook />
                </Link>
              </li>
            </ul>
          </div>
          <div className="copyright text-2xs-reg">
            &copy; 2023 Foodie. team PineApple | AQUA
          </div>
        </div>
      </div>
    </div>
  );
}
