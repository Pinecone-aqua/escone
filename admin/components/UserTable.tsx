import { UserType } from "@/utils/types";
import { FiUser } from "react-icons/fi";
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
  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>хэрэглэгчийн нэр</th>
          <th>бүртгүүлсэн огноо</th>
          <th>үүрэг</th>
          <th>цахим шуудан</th>
          <th>засварлах</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>
              <FiUser />
            </td>
            <td>{user.username}</td>
            <td className="center">
              {dayjs(user.created_date).format("YYYY MMM/DD")}
            </td>
            <td className={user.role ? "admin" : "client"}>
              <div className="role">
                {user.role ? <p>Admin</p> : <p>Client</p>}
              </div>
            </td>
            <td>{user.email}</td>
            <td>
              <div className="edit">
                <button
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
                <button onClick={() => setVisible(user._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
