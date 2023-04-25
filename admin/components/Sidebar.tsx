import React from "react";

import { navLinks } from "../utils/data";

import Link from "next/link";

type Props = {};


export default function Sidebar({}: Props): JSX.Element {
  const Home = () => <h1>Home</h1>;
  const Profile = () => <h1>Profile</h1>;
  const Settings = () => <h1>Settings</h1>;
  return (
    <div className="wrapper">
      <div className="sidebar">
        <ul className="nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>

    </div>
  );
}