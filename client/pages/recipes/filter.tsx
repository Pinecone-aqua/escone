import RecipeCard from "@/components/Home/RecipeCard";
import Filter from "@/components/RecipePage/Filter";
import { useRouter } from "next/router";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { useRecipe } from "@/context/recipeContext";

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
    <div className="container px-2   md:gap-16 py-10 min-h-[100vh] w-full ">
      <div className="w-full pb-3  text-xl flex justify-between">
        <p className="text-base lg:text-xl">
          {recipes.length} results for {`" `}
          {Object.keys(query).length === 0
            ? "Food Recipes"
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
      <div className="flex gap-5 w-full relative">
        <div
          className={` z-40 absolute ${
            show ? `block` : `hidden`
          }  lg:static lg:block w-3/12`}
        >
          <Filter />
        </div>
        <div className="lg:w-9/12 w-full flex h-full flex-wrap gap-y-4 justify-between">
          {finish ? (
            recipes.length == 0 ? (
              <p>empty</p>
            ) : (
              recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} width={"w-[30%]"} />
              ))
            )
          ) : (
            <p>loading</p>
          )}
        </div>
      </div>
    </div>
  );
}
