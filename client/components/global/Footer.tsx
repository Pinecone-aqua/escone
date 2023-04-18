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
    <div className="flex w-full h-[325px] bg-light-orange">
      <div className="container flex flex-col items-center  justify-between px-[20px] py-[30px]">
        <Link href={"/"}>
          <Image src={logo} alt="foodie" />
        </Link>

        <nav>
          <ul className="flex items-center gap-10 text-dark-green text-xs-bold">
            <li className="hover:text-orange duration-300">
              <Link href={"#"}>Home</Link>
            </li>
            <li className="hover:text-orange duration-300">
              <Link href={"#"}>Recipes</Link>
            </li>
            <li className="hover:text-orange duration-300">
              <Link href={"#"}>Blog</Link>
            </li>
            <li className="hover:text-orange duration-300">
              <Link href={"#"}>Maps</Link>
            </li>
            <li className="hover:text-orange duration-300">
              <Link href={"#"}>About</Link>
            </li>
          </ul>
        </nav>

        <div className="text-dark-green gap-5 flex flex-col">
          <div className="links">
            <ul className="flex justify-center items-center text-lg-bold gap-5">
              <li className="hover:text-semi-green duration-300">
                <Link href={"#"}>
                  <FaPinterest />
                </Link>
              </li>
              <li className="hover:text-semi-green duration-300">
                <Link href={"#"}>
                  <FaTwitter />
                </Link>
              </li>
              <li className="hover:text-semi-green duration-300">
                <Link href={"#"}>
                  <FaInstagram />
                </Link>
              </li>
              <li className="hover:text-semi-green duration-300">
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
