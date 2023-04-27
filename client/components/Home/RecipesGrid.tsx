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
    <div className="container rounded-2xl my-5 p-5 bg-cover h-[550px] flex flex-col px-[80px] max-w-full min-w-[550px]">
      <div className="flex justify-between items-center">
        <h1 className="text-xl-semibold md:text-2xl-semibold text-[#485801]">
          Popular Recipes
        </h1>

        <Link href={"/recipes"}>
          <div className="flex items-center text-secondary gap-2 rounded-full bg-light-orange text-sm-semibold md:text-md-semibold hover:text-[#485801] duration-500">
            All Recipes
            <FaArrowRight />
          </div>
        </Link>
      </div>
      <div className="flex h-full overflow-x-scroll my-5 gap-5 w-full justify-evenly">
        {recipes.map((recipe: RecipeType) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
