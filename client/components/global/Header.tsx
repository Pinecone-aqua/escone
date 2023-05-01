import logo from "@/assets/logo-main.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function Header(): JSX.Element {
  const dropItems: string[] = ["Information", "Favorites", "Log out"];
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(true);
  return (
    <>
      <div className="header">
        <div className="container">
          <Link className="header-logo" href={"/"}>
            <Image src={logo} alt="Foodie" />
          </Link>

          <div className="header-content">
            <form>
              <label className="sr-only">Search</label>
              <div className="search">
                <input type="search" placeholder="Search some recipe..." />
                <div className="search-icon">
                  <FaSearch className="w-full" />
                </div>
              </div>
            </form>

            <div className="profile">
              <button onClick={(): void => setDropdown(!dropdown)}>
                <FaUser className="icon" />
              </button>

              {dropdown && (
                <div className="dropdown">
                  <ul>
                    {dropItems.map(
                      (dropItem: string, index: number): JSX.Element => (
                        <li key={index}>{dropItem}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="menu">
              <button onClick={(): void => setMenu(!menu)}>
                <FiMenu className="icon" />
              </button>
              <nav>
                <ul>
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Recipe</Link>
                  </li>
                  <li>
                    <Link href={"/"}>Blog</Link>
                  </li>
                  <li>
                    <Link href={"/"}>About</Link>
                  </li>
                </ul>
              </nav>
              {menu && (
                <div className="menu-links">
                  <ul>
                    <li>
                      <Link href={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link href={"/"}>Recipe</Link>
                    </li>
                    <li>
                      <Link href={"/"}>Blog</Link>
                    </li>
                    <li>
                      <Link href={"/"}>About</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
