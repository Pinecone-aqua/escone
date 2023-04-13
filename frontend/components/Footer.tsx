import Link from "next/link";
import React from "react";
import {
  BsPinterest,
  BsTwitter,
  BsInstagram,
  BsFacebook,
} from "react-icons/bs";

export default function footer() {
  return (
    <div className="w-full">
      <div className="container mx-auto  pb-6 sm:h-32 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <p className="text-lime-500 font-extrabold text-2xl">Food</p>
            <ul className="flex gap-3 flex-wrap justify-center">
              <Link href={"/"}>
                <p className="text-lg font-medium">About</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg font-medium">Recipes</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg font-medium">Blog</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg font-medium">Shop</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg font-medium">Contact</p>
              </Link>
            </ul>
          </div>
          <div className="flex gap-3">
            <BsPinterest />
            <BsTwitter />
            <BsInstagram />
            <BsFacebook />
          </div>
        </div>
        <div className="border w-full border-gray-400"></div>
        <div className="text-center sm:text-end">
          <p className="text-sm">Copyright 2023 ©Food. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
