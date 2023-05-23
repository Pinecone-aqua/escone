/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  FaPinterest,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import Logo from "@/public/Logo";

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
        <div>
          <Link className="logo" href={"/"}>
            <Logo />
          </Link>

          <nav>
            <ul>
              {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <Link href={menuItem.url}>{menuItem.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
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
    </div>
  );
}
