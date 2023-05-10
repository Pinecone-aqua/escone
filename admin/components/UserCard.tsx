import { UserType } from "@/utils/types";
import React from "react";

export default function Card({ user }: { user: UserType }) {
  let statusClass;
  switch (recipe.role) {
    case true:
      statusClass =
        "py-1 px-2 border border-green-500 text-green-700 bg-green-200 rounded-full";
      break;
    case false:
      statusClass =
        "py-1 px-2 border border-orange-500  text-orange-700 bg-orange-200  rounded-full";
      break;
  }
  return (
    <div className="w-[400px] rounded-2xl">
      <picture className="w-full block rounded-2xl">
        <img src={user.image} alt="" className="w-full rounded-t-2xl" />
      </picture>
      <div className="p-3 flex flex-col items-start bg-white rounded-b-2xl gap-3 ">
        <p className={statusClass}>{user.role}</p>
        <p> {user.username}</p>

        <div className="flex gap-3 w-full justify-end">
          <button
            className="py-1 px-2 border border-green-500 rounded-lg text-green-700 hover:bg-green-500 hover:text-white   disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-white"
            disabled={user.role == true}
          >
            approve
          </button>
          <button
            className="py-1 px-2 border border-red-500 rounded-lg text-red-700 hover:bg-red-500 hover:text-white disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-white "
            disabled={user.role == false}
          >
            deny
          </button>
        </div>
      </div>
    </div>
  );
}
