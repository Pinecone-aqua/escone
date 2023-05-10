import { UserType } from "@/utils/types";
import { FiUser } from "react-icons/fi";
import { SiFoodpanda } from "react-icons/si";
import React from "react";
import dayjs from "dayjs";

function UserTable({ users }: { users: UserType[] }) {
  return (
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 ">
      <thead className="bg-gray-50">
        <tr>
          <th>
            <SiFoodpanda />
          </th>
          <th>Username</th>
          <th>Created Date</th>
          <th>Role</th>
          <th>E-Mail</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {users.map((user, index) => (
          <tr className="hover:bg-gray-50" key={index}>
            <td>
              <FiUser />
            </td>
            <td>{user.username}</td>
            <td>{dayjs(user.created_date).format("YYYY MMM/DD")}</td>
            <td>{user.role ? <>Admin</> : <>Client</>}</td>
            <td>{user.email}</td>
            <td className="gap-10">
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
