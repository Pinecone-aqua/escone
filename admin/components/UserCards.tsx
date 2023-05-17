import { UserType } from "@/utils/types";
import React, { Dispatch, SetStateAction } from "react";
import UserCard from "./UserCard";

export default function UserCards({
  users,
  setShow,
}: {
  users: UserType[];
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-wrap justify-between gap-4">
      {users.map((user) => (
        <UserCard user={user} key={user._id} setShow={setShow} />
      ))}
    </div>
  );
}
