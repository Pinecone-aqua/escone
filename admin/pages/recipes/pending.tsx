import Card from "@/components/Card";
import RecipesLayout from "@/components/RecipesLayout";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import React, { useState } from "react";

export default function Pending({ recipes }: { recipes: RecipeType[] }) {
  const [grid, setGrid] = useState(false);
  return (
    <RecipesLayout setGrid={setGrid} grid={grid}>
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
