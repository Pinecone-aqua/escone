import React from "react";
import RecipeCard from "./RecipeCard";
import { RecipeType } from "@/utils/types";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

type RecipesGridProps = {
  recipes: RecipeType[];
};

export default function RecipesGrid({ recipes }: RecipesGridProps) {
  // const [numRecipes, setNumRecipes] = useState<number>(12);
  // const limitedRecipes = recipes.slice(0, numRecipes);

  // const moreRecipesHandler = () => {
  //   setNumRecipes(numRecipes + 12);
  //   console.log("moreRecipesHandler working:)");
  // };

  return (
    <div className="container my-5">
      <div className="flex justify-between items-center px-5">
        <h1 className="text-xl-bold text-orange">Popular Recipes</h1>

        <Link href={"/all-recipes"}>
          <div className="flex items-center text-orange border border-orange h-[35px] px-5 gap-2 rounded-full bg-light-orange text-2xs-bold">
            All Recipes
            <FaArrowRight />
          </div>
        </Link>
      </div>
      <div className="flex flex-wrap my-5 gap-5 w-full justify-evenly">
        {recipes.map((recipe: RecipeType) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
        {/* <button
          onClick={moreRecipesHandler}
          className="my-3 flex items-center text-orange border border-orange h-[35px] px-5 gap-2 rounded-full bg-light-orange text-2xs-bold"
        >
          Next page <FaArrowRight />
        </button> */}
      </div>
    </div>
  );
}
