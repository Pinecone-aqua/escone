import RecipeCard from "@/components/Home/RecipeCard";
import Filter from "@/components/RecipePage/Filter";
import { useRouter } from "next/router";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useRecipe } from "@/context/recipeContext";
import Loader from "@/components/Loader";

export default function Recipes() {
  const { recipes, finish } = useRecipe();
  const { query } = useRouter();
  const [filter, setFilter] = useState<(string[] | undefined)[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const fltr: (string[] | undefined)[] = Object.values(query).map((res) => {
      if (typeof res === "string") return [res];
      return res;
    });

    setFilter(fltr);
  }, [query]);

  return (
    <div className="recipes container">
      {/* HEADER */}
      <div className="recipes-header">
        <p>
          {recipes.length} results for {`" `}
          {Object.keys(query).length === 0
            ? "Recipes"
            : filter.map((res) => res?.join(", ")).join(", ")}
          {` "`}
        </p>
        <button
          className="text-[25px] lg:hidden"
          onClick={() => {
            setShow(!show);
            console.log("clicked");
          }}
        >
          <TbAdjustmentsHorizontal />
        </button>
      </div>

      {/* BODY */}
      <div className="flex w-full">
        {/* SIDE FILTER */}
        <div className="recipes-filter w-3/12">
          <Filter />
        </div>

        {/* RECIPES */}
        <div className="recipes-grid w-9/12">
          {finish ? (
            recipes.length == 0 ? (
              <p>empty</p>
            ) : (
              recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}
