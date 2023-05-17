import { RecipeType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";

type PropType = {
  recipe: RecipeType;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function Card({ recipe, setShow }: PropType) {
  const router = useRouter();
  let statusClass;
  switch (recipe.status) {
    case "approve":
      statusClass =
        "py-1 px-2 border border-green-500 text-green-700 bg-green-200 rounded-full";
      break;
    case "pending":
      statusClass =
        "py-1 px-2 border border-orange-500  text-orange-700 bg-orange-200  rounded-full";
      break;
    case "deny":
      statusClass =
        "py-1 px-2 border border-red-500  text-red-700 bg-red-200  rounded-full";
      break;
  }
  const toast = useRef<Toast>(null);

  function statusHandler(status: string) {
    const token = Cookies.get("token");
    axios
      .put(
        `${process.env.BACK_END_URL}/recipe/status/${recipe._id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.current?.show({
          severity: "success",
          summary: "success",
          detail: `recipe ${status}`,
        });
      });
  }

  return (
    <div className=" ">
      <Toast ref={toast} />

      <div
        className="w-[400px] rounded-2xl"
        onClick={() => {
          setShow(true);
          router.push({ query: { id: recipe._id } });
        }}
      >
        <picture className="w-full block rounded-2xl">
          <img src={recipe.images[1]} alt="" className="w-full rounded-t-2xl" />
        </picture>
        <div className="p-3 flex flex-col items-start bg-white rounded-b-2xl gap-3 pb-16">
          <p className={statusClass}>{recipe.status}</p>
          <p> {recipe.title}</p>
          <p>{recipe.description.slice(0, 100)} ...</p>
        </div>
      </div>
      <div className="flex gap-3 w-full justify-end  mt-[-50px] pe-5">
        <button
          className="py-1 px-2 border border-green-500 rounded-lg text-green-700 hover:bg-green-500 hover:text-white   disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-white"
          disabled={recipe.status == "approve"}
          onClick={() => statusHandler("approve")}
        >
          approve
        </button>
        <button
          className="py-1 px-2 border border-red-500 rounded-lg text-red-700 hover:bg-red-500 hover:text-white disabled:border-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-white "
          disabled={recipe.status == "deny"}
          onClick={() => statusHandler("deny")}
        >
          deny
        </button>
      </div>
    </div>
  );
}
