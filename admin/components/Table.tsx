import { RecipeType } from "@/utils/types";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import axios from "axios";
import Cookies from "js-cookie";
type PropType = {
  recipes: RecipeType[];
  setShow: Dispatch<SetStateAction<boolean>>;
};

function Table({ recipes, setShow }: PropType) {
  const router = useRouter();
  const [visible, setVisible] = useState<string>();
  const toast = useRef<Toast>(null);
  const token = Cookies.get("token");

  function showHandler(id: string) {
    setShow(true);
    router.push({ query: { id: id } });
  }
  function deleteHandlers(id: string) {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "Confirmed",
          detail: "Deleted recipe",
          life: 3000,
        });
        router.reload();
      });
  }
  return (
    <table>
      <thead>
        <tr>
          <th>created by</th>
          <th>title</th>
          <th>description</th>
          <th>date</th>
          <th>status</th>
          <th>same</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map((recipe, index) => (
          <tr key={index}>
            <td>
              <div>
                <picture>
                  {/* <img
                    className="h-full w-full rounded-full object-cover object-center"
                    src={recipe.created_by.image}
                    alt=""
                  /> */}
                </picture>
              </div>
              <div>{/* {recipe.created_by.username} */}</div>
            </td>

            <td>{recipe.title}</td>

            <td>{recipe.description}</td>

            <td className="date">
              {dayjs(recipe.created_date).format("YYYY MMM/DD")}
            </td>

            <td>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold  ${
                  recipe.status == "pending"
                    ? `bg-orange-50 text-orange-600`
                    : recipe.status == "deny"
                    ? `bg-red-50 text-red-600`
                    : `bg-green-50 text-green-600`
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    recipe.status == "pending"
                      ? `bg-orange-600`
                      : recipe.status == "deny"
                      ? `bg-red-600`
                      : `bg-green-600`
                  } `}
                />
                {recipe.status}
              </span>
            </td>

            <td>
              <div className="options">
                <Toast ref={toast} />
                <ConfirmDialog
                  visible={visible == recipe._id}
                  onHide={() => setVisible(undefined)}
                  message="Жорыг устгахдаа итгэлтэй байна уу?"
                  header="Жор устгах"
                  icon="pi pi-exclamation-triangle"
                  accept={() => deleteHandlers(recipe._id)}
                  reject={() => {
                    toast.current?.show({
                      severity: "warn",
                      summary: "Rejected",
                      detail: "You have rejected",
                      life: 3000,
                    });
                  }}
                />
                <button onClick={() => setVisible(recipe._id)}>delete</button>/
                <button onClick={() => showHandler(recipe._id)}>edit</button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
