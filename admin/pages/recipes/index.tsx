import Card from "@/components/Card";
import RecipesLayout from "@/components/RecipesLayout";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import React from "react";

export default function Recipes({ recipes }: { recipes: RecipeType[] }) {
  console.log(recipes);
  return (
    <RecipesLayout page="all">
      {recipes.map((recipe, index) => (
        <Card key={index} recipe={recipe} />
      ))}
    </RecipesLayout>
  );
}

export async function getStaticProps() {
  const result = await axios.get("http://localhost:3030/recipes/all");
  const recipes = result.data;
  return {
    props: { recipes }, // will be passed to the page component as props
  };
}
