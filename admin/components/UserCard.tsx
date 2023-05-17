import { UserType } from "@/utils/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { ConfirmDialog } from "primereact/confirmdialog";

export default function UserCard({ user }: { user: UserType }) {
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
  let statusClass;
  switch (user.role) {
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
      <picture className="w-full block rounded-2xl h-[400px]">
        <img
          src={user.image}
          alt="profile picture"
          className="w-full rounded-t-2xl bg-gray-300 h-full"
        />
      </picture>
      <div className="p-3 flex flex-col items-start bg-white rounded-b-2xl gap-3 ">
        <p className={statusClass}>{user.role ? "admin" : "client"}</p>
        <p> {user.username}</p>

        <div className="flex gap-3 w-full justify-end">
          <button className="py-1 px-2 border border-green-500 rounded-lg text-green-700 hover:bg-green-500 hover:text-white   disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-white flex items-center gap-2">
            <MdEditSquare /> <p>Edit</p>
          </button>
          <button
            className="py-1 px-2 border border-red-500 rounded-lg text-red-700 hover:bg-red-500 hover:text-white disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-white flex items-center gap-2"
            onClick={() => setVisible(user._id)}
          >
            <MdDelete /> <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
}
