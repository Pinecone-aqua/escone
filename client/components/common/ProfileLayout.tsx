import { useUser } from "@/context/userContext";
import Link from "next/link";
import cover from "../../public/images/background.jpg";
import Image from "next/image";
import React from "react";
import Login from "./Login";
import dayjs from "dayjs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const profileNavigation = [
    {
      icon: "pi pi-table",
      label: "Recipes",
      url: `/profile?user=${user?._id}`,
    },
    {
      icon: "pi pi-heart",
      label: "Favorites",
      url: `/profile/favorites?user=${user?._id}`,
    },
    { icon: "", label: "Settings", url: `/profile/settings?user=${user?._id}` },
  ];
  return user ? (
    <>
      <div className="profile">
        <div className="cover">
          <picture>
            <Image src={cover} alt="cover" />
          </picture>
        </div>
        <div className="profile-body">
          <nav>
            <div className="container">
              <ul>
                {profileNavigation.map((navItem, index) => (
                  <li key={index}>
                    <Link href={navItem.url}>{navItem.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="container">
            <div className="info">
              <div className="info-box">
                <picture>
                  <img src={user.image} alt="profile" />
                </picture>
                <h3>{user.username}</h3>
                <div className="info-box-detail">
                  <p>{user.email}</p>
                  <p>
                    starts: {dayjs(user.created_date).format("YYYY MMM/DD")}
                  </p>
                </div>
              </div>
              
              {/* <div className="info-box-bio">
                
              </div> */}
            </div>
            <div className="children">{children}</div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Login show={true} />
  );
}
