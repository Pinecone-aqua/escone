import GridCards from "@/components/GridCards";
import Offcanva from "@/components/Offcanva";
import RecipesLayout from "@/components/RecipesLayout";
import Table from "@/components/Table";
import { RecipeType } from "@/utils/types";
import axios from "axios";

import React, { useState } from "react";
export default function Recipes({ recipes }: { recipes: RecipeType[] }) {
  const [show, setShow] = useState(false);
  const [grid, setGrid] = useState(false);
  return (
    <RecipesLayout setGrid={setGrid} grid={grid}>
      {grid ? (
        <GridCards recipes={recipes} setShow={setShow} />
      ) : (
        <Table recipes={recipes} setShow={setShow} />
      )}
      <Offcanva show={show} setShow={setShow} />
    </RecipesLayout>
  );
}

export async function getStaticProps() {
  const result = await axios.get("http://localhost:3030/recipe/recipes");
  const recipes = result.data;
  return {
    props: { recipes }, // will be passed to the page component as props
  };
}
