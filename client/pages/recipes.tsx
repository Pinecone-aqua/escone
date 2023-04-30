import RecipeCard from "@/components/Home/RecipeCard";
import Filter from "@/components/RecipePage/Filter";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState<RecipeType[] | undefined>();
  useEffect(() => {
    axios
      .get("http://localhost:3030/recipe/all")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="container  flex gap-5 md:gap-16 py-14 min-h-[100vh] w-full ">
      <div className="hidden lg:block w-3/12 ">
        <Filter />
      </div>
      <div className="lg:w-9/12 w-full flex h-full flex-wrap gap-5 md:gap-y-20  justify-center">
        {recipes &&
          recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} className={recipe} />
          ))}
      </div>
    </div>
  );
}
