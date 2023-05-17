import { UserType } from "@/utils/types";
import { FiUser } from "react-icons/fi";
import { SiFoodpanda } from "react-icons/si";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import React from "react";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import axios from "axios";
import { ConfirmDialog } from "primereact/confirmdialog";

function UserTable({
  users,
  setShow,
}: {
  users: UserType[];
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [visible, setVisible] = useState<string>();

  function deleteUser(id: string) {
    const token = Cookies.get("token");
    axios
      .delete(`${process.env.BACK_END_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        router.reload();
        toast.current?.show({
          severity: "success",
          summary: "Confirmed",
          detail: "You have accepted",
          life: 3000,
        });
      });
  }
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
              {user.role ? <p>Admin</p> : <p>Client</p>}
            </td>
            <td>{user.email}</td>
            <td className="gap-10">
              <button
                className=" hover:bg-blue-200  font-bold py-2 px-4 rounded"
                onClick={() => {
                  setShow(true);
                  router.push({ query: { user: user._id } });
                }}
              >
                <AiFillEdit />
              </button>
              <Toast ref={toast} />
              <ConfirmDialog
                visible={visible == user._id}
                onHide={() => setVisible(undefined)}
                message="Are you sure you want to delete?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={() => deleteUser(user._id)}
                reject={() =>
                  toast.current?.show({
                    severity: "warn",
                    summary: "Rejected",
                    detail: "You have rejected",
                    life: 3000,
                  })
                }
              />
              <button
                className="hover:bg-red-100  font-bold py-2 px-4 rounded"
                onClick={() => setVisible(user._id)}
              >
                <AiFillDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
