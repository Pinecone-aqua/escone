import { RecipeType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Cookies from "js-cookie";

type PropType = {
  recipe: RecipeType;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export default function Card({ recipe, setShow }: PropType) {
  const [isStatus, setIsStatus] = useState<string>(recipe.status);
  const router = useRouter();
  let statusClass;
  switch (isStatus) {
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
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/status/${recipe._id}`,
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
        setIsStatus(status);
        toast.current?.show({
          severity: "success",
          summary: "success",
          detail: `recipe ${status}`,
        });
      });
  }

  return (
    <div className=" relative">
      <Toast ref={toast} />
      <div
        className="card"
        onClick={() => {
          setShow(true);
          router.push({ query: { id: recipe._id } });
        }}
      >
        <picture>
          <img src={recipe.images[1]} alt="recipe picture" />
        </picture>
        <div className="card-text">
          <p className={`status ${statusClass}`}>{isStatus}</p>
          <h5> {recipe.title}</h5>
          <p>{recipe.description.slice(0, 60)}...</p>
        </div>
      </div>
      <div className="status-btns">
        <input
          className="approve"
          disabled={isStatus == "approve"}
          onClick={() => statusHandler("approve")}
          value={"approve"}
          type="button"
        />

        <input
          className="deny"
          disabled={isStatus == "deny"}
          onClick={() => statusHandler("deny")}
          type={"button"}
          value={"deny"}
        />
      </div>
    </div>
  );
}
