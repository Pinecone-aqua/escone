import { UserType } from "@/utils/types";
import React from "react";
import UserCard from "./UserCard";

export default function UserCards({ users }: { users: UserType[] }) {
  return (
    <div className="flex flex-wrap justify-between gap-4">
      {users.map((user) => (
        <UserCard user={user} key={user._id} />
      ))}
    </div>
  );
}
