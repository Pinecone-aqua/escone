import Card from "@/components/Card";
import RecipesLayout from "@/components/RecipesLayout";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import React from "react";

export default function Pending({ recipes }: { recipes: RecipeType[] }) {
  return (
    <RecipesLayout page="pending">
      {recipes.map((recipe, index) => (
        <Card key={index} recipe={recipe} />
      ))}
    </RecipesLayout>
  );
}

export async function getStaticProps() {
  const result = await axios.get("http://localhost:3030/recipes/pending");
  const recipes = result.data;
  return {
    props: { recipes }, // will be passed to the page component as props
  };
}
