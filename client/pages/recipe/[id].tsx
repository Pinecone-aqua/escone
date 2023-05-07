import { useRecipe } from "@/context/recipeContext";
// import { useRouter } from "next/router";
import React from "react";

function Recipe() {
  const { recipes } = useRecipe();
  console.log(recipes);
  return <div>recipe</div>;
}

export default Recipe;
