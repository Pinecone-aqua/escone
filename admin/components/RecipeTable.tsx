/* eslint-disable camelcase */
import { RecipeType } from "@/utils/types";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import axios from "axios";
import Cookies from "js-cookie";
import { TbArrowsSort } from "react-icons/tb";
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
  function sortHandler(sortItem: string) {
    const query = router.query;
    if (query.order_by == sortItem) {
      if (query.type == "1") {
        query.order_by = sortItem;
        query.type = "-1";
        query.page = "1";
        router.push({ query: query });
      } else if (query.type == "-1") {
        delete query.order_by;
        delete query.type;
        query.page = "1";
        router.push({ query: query });
      }
    } else {
      query.order_by = sortItem;
      query.type = "1";
      query.page = "1";
      router.push({ query: query });
    }
  }

  return recipes.length != 0 ? (
    <table>
      <thead>
        <tr>
          <th>нийтлэсэн</th>
          <th>гарчиг</th>
          <th>товч тайлбар</th>
          <th onClick={() => sortHandler("created_date")}>
            <span className="flex items-center gap-2">
              огноо <TbArrowsSort size={25} />
            </span>{" "}
          </th>
          <th>төлөв</th>
          <th>засварлах</th>
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
  ) : (
    <div className="">empty</div>
  );
}

export default Table;
