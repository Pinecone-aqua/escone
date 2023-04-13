import { Logo } from "@/public/icons/Icons";
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
    <div className="w-full bg-[#FFF3DF]">
      <div className="container mx-auto  pb-6  flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-20 pt-5  sm:justify-between items-center">
          <div className=" flex flex-col items-center gap-10">
            <Logo />
            <ul className="flex gap-10 text-[#485801] justify-center">
              <Link href={"/"}>
                <p className="text-lg ">Home</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg ">Maps</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg ">Blog</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg ">Recipes</p>
              </Link>
              <Link href={"/"}>
                <p className="text-lg ">About</p>
              </Link>
            </ul>
          </div>

          <div className="flex gap-3 text-[#485801]">
            <BsPinterest />
            <BsTwitter />
            <BsInstagram />
            <BsFacebook />
          </div>
        </div>

        <div className="text-center text-[#485801]">
          <p className="text-sm">
            © 2023 food. Зохиогчийн эрх хуулиар хамгаалагдсан
          </p>
        </div>
      </div>
    </div>
  );
}
