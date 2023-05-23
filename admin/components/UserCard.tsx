import { UserType } from "@/utils/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import React, { useRef, useState, Dispatch, SetStateAction } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ConfirmDialog } from "primereact/confirmdialog";
import dayjs from "dayjs";

export default function UserCard({
  user,
  setShow,
}: {
  user: UserType;
  setShow: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [visible, setVisible] = useState<string>();

  function deleteUser(id: string) {
    const token = Cookies.get("token");
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_END_URL}/user/${id}`, {
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
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible == user._id}
        onHide={() => setVisible(undefined)}
        message="Устгахдаа итгэлтэй байна уу?"
        header="Хэрэглэгчийн бүртгэл устгах"
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
      <picture>
        <img src={user.image} alt="profile picture" />
      </picture>
      <div className="card-text">
        <p className={`status ${statusClass}`}>
          {user.role ? "admin" : "client"}
        </p>
        <h5>{user.username}</h5>
        <p>
          Бүртгүүлсэн огноо: {dayjs(user.created_date).format("YYYY MMM/DD")}
        </p>
        <p>ID: {user._id}</p>

        <div className="status-btns">
          <button className="approve" onClick={() => setShow(true)}>
            <MdEdit /> <p>Edit</p>
          </button>
          <button className="deny" onClick={() => setVisible(user._id)}>
            <MdDelete /> <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
}
