import React from "react";
import RecipeCard from "./RecipeCard";
import { RecipeType } from "@/utils/types";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

type RecipesGridProps = {
  recipes: RecipeType[];
};

export default function RecipesGrid({ recipes }: RecipesGridProps) {
  return (
    <div className="container rounded-2xl gap-4 my-5 pb-10 lg:pb-20 pt-5 bg-cover h-full flex flex-col px-[10px] lg:px-[80px] ">
      <div className="flex justify-between items-center">
        <h1 className="text-xl-semibold md:text-2xl-semibold text-[#485801]">
          Popular Recipes
        </h1>

        <Link href={"/recipes/filter"}>
          <div className="flex items-center text-secondary gap-2 rounded-full bg-light-orange text-sm-semibold md:text-md-semibold hover:text-[#485801] duration-500">
            All Recipes
            <FaArrowRight />
          </div>
        </Link>
      </div>
      <div className=" w-full flex h-full justify-between gap-5 overflow-scroll lg:overflow-visible md:gap-y-20  ">
        {recipes.slice(0, 4).map((recipe: RecipeType) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            width={"min-width-[80px] w-[23%]"}
          />
        ))}
      </div>
    </div>
  );
}
