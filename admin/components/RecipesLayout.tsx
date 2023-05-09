import Link from "next/link";
import React, { ReactNode } from "react";
type PropsType = { children: ReactNode; page: string };
export default function RecipesLayout({ children, page }: PropsType) {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full  border-black flex gap-5 shadow-xl">
        <Link
          href={"/recipes"}
          className={`px-5 py-3  block text-lg ${
            page == "all" && "border-b-2 border-green-400"
          }`}
        >
          All recipes
        </Link>
        <Link
          href={"/recipes/approve"}
          className={`px-5 py-3  block text-lg ${
            page == "approve" && "border-b-2 border-green-400"
          }`}
        >
          Approve
        </Link>
        <Link
          href={"/recipes/pending"}
          className={`px-5 py-3  block text-lg ${
            page == "pending" && "border-b-2 border-green-400"
          }`}
        >
          Pending
        </Link>
        <Link
          href={"/recipes/deny"}
          className={`px-5 py-3  block text-lg ${
            page == "deny" && "border-b-2 border-green-400"
          }`}
        >
          Deny
        </Link>
      </div>
      <div className="w-full  flex flex-wrap gap-10 justify-between">
        {children}
      </div>
    </div>
  );
}
