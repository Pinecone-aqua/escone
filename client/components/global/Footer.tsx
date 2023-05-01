/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-main.svg";
import {
  FaPinterest,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

interface NavLink {
  name: string;
  link: string;
}
const navLinks: NavLink[] = [
  { name: "Home", link: "/" },
  { name: "Recipe", link: "/recipe" },
  { name: "Blog", link: "/blog" },
  { name: "About", link: "/about" },
];

interface SocialLink {
  name: string;
  icon: any;
  link: string;
}
const socialLinks: SocialLink[] = [
  {
    name: "Pinterest",
    icon: <FaPinterest />,
    link: "https://www.pinterest.com/",
  },
  { name: "Twitter", icon: <FaTwitter />, link: "https://www.twitter.com/" },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    link: "https://www.instagram.com/",
  },
  { name: "Facebook", icon: <FaFacebook />, link: "https://www.facebook.com/" },
];

export default function Footer(): JSX.Element {
  return (
    <div className="footer">
      <div className="container">
        <Link className="footer-logo" href={"/"}>
          <Image src={logo} alt="Foodie" />
        </Link>
        <div className="navLinks">
          <ul>
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <Link href={navLink.link}>{navLink.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="socialLinks">
          <ul>
            {socialLinks.map((socialLink, index) => (
              <li key={index} value={socialLink.name}>
                <Link href={socialLink.link}>{socialLink.icon}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="copyright">
          <p>&copy;2023 Foodie. team PineApple | AQUA</p>
        </div>
      </div>
    </div>
  );
}
