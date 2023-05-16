import { useUser } from "@/context/userContext";
import Link from "next/link";
import React from "react";
import Login from "./Login";
const randomCover = "https://source.unsplash.com/random/900%C3%97700/?food";
const randomProfile = "https://loremflickr.com/200/200/face";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const contentHeaderItems = [
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
      <div className="profile container">
        {/* COVER */}
        <div className="cover">
          <picture>
            <img src={randomCover} alt="cover" />
          </picture>
        </div>

        <div className="content">
          {/* HEADER */}
          <div className="content-header">
            <ul>
              {contentHeaderItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SIDE */}
          <div className="content-body">
            <div className="side">
              {/* PROFILE BOX */}
              <div className="side-box">
                <picture>
                  <img
                    src={user.image ? user.image : randomProfile}
                    alt="profile"
                  />
                </picture>
                <div className="profile-text">
                  <h2>{user.username}</h2>
                  <p>{user.email}</p>
                </div>
              </div>

              {/* BIO */}
              <div className="side-bio">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Excepturi error odio sit quaerat minima atque, esse provident
                  voluptatibus suscipit. Minus porro earum delectus reiciendis
                  quas! Repellat eaque corrupti quos ex.
                </p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  ) : (
    <Login show={true} />
  );
}
