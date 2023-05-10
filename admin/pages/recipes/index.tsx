import GridCards from "@/components/GridCards";
import RecipesLayout from "@/components/RecipesLayout";
import Table from "@/components/Table";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import React, { useState } from "react";
export default function Recipes({ recipes }: { recipes: RecipeType[] }) {
  const [grid, setGrid] = useState(false);
  return (
    <RecipesLayout setGrid={setGrid} grid={grid}>
      {grid ? <GridCards recipes={recipes} /> : <Table recipes={recipes} />}
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
