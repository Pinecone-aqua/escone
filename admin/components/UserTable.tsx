import { UserType } from "@/utils/types";
import { FiUser } from "react-icons/fi";
import { SiFoodpanda } from "react-icons/si";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import OffCanvas from "./UserEdit";
import React from "react";
import { useState } from "react";
import dayjs from "dayjs";

// import { ConfirmPopup } from "primereact/confirmpopup";
// import { confirmPopup } from "primereact/confirmpopup";

function UserTable({ users }: { users: UserType[] }) {
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  const handleOffCanvasOpen = () => {
    setIsOffCanvasOpen(true);
  };

  const handleOffCanvasClose = () => {
    setIsOffCanvasOpen(false);
  };

  return (
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 gap-10">
      <thead className="bg-gray-50">
        <tr>
          <th>
            <SiFoodpanda />
          </th>
          <th>Username</th>
          <th>Created Date</th> 
          <th>Role</th>
          <th className="text-center">E-Mail</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100 ">
        {users.map((user, index) => (
          <tr className="hover:bg-gray-50" key={index}>
            <td>
              <FiUser />
            </td>
            <td>{user.username}</td>
            <td>{dayjs(user.created_date).format("YYYY MMM/DD")}</td>
            <td
              className={
                user.role
                  ? "bg-green-200 text-center"
                  : "bg-cyan-50 text-center"
              }
            >
              {user.role ? <>Admin</> : <>Client</>}
            </td>
            <td>{user.email}</td>
            <td className="gap-10">
              <>
                <>
                  
                  <button
                    className=" hover:bg-blue-200  font-bold py-2 px-4 rounded"
                    onClick={handleOffCanvasOpen}
                  >
                    <AiFillEdit />
                  </button>
                  <OffCanvas
                    isOffCanvasOpen={isOffCanvasOpen}
                    setIsOffCanvasOpen={handleOffCanvasClose}
                    // id={user._id}
                    email={user.email}
                  />
                </>
                <button className="hover:bg-red-100  font-bold py-2 px-4 rounded">
                    <AiFillDelete />
              </button>
              </>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
