import { RecipeType } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Reciperequest() {
  const [recipes, setRecipes] = useState<RecipeType[] | null>();
  const [refresh, setRefresh] = useState<unknown>();
  useEffect(() => {
    axios.get("http://localhost:3030/recipe/pending").then((res) => {
      setRecipes(res.data);
    });
  }, [refresh]);
  function approveHandler(id: string) {
    axios
      .put("http://localhost:3030/recipe/approve", { id: id })
      .then((res) => setRefresh(res));
  }
  return (
    recipes && (
      <div className="w-full flex flex-col gap-5 mt-10">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="flex justify-between w-9/12  bg-orange-300 p-5"
          >
            <div className=" h-full ">
              <picture className="h-full">
                <img src={recipe.images[0]} alt="" className="h-full " />
              </picture>
            </div>
            <div className="">
              <p>{recipe.title}</p>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-green-300 rounded-full"
                onClick={() => {
                  approveHandler(recipe._id);
                }}
              >
                approve
              </button>
              <button className="px-4 py-2 bg-red-500 rounded-full">
                denied
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
