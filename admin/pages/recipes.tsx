import GridCards from "@/components/GridCards";
import Offcanva from "@/components/Offcanva";
import RecipesLayout from "@/layouts/RecipesLayout";
import Table from "@/components/RecipeTable";
import { RecipeType } from "@/utils/types";
import axios from "axios";

import React, { useState } from "react";
export default function Recipes({ recipes }: { recipes: RecipeType[] }) {
  const [show, setShow] = useState(false);
  const [grid, setGrid] = useState(false);
  return (
    <div className="recipes children">
      <RecipesLayout setGrid={setGrid} grid={grid}>
        {grid ? 
          <GridCards recipes={recipes} setShow={setShow} />
         : (
          <Table recipes={recipes} setShow={setShow} />
        )}
        <Offcanva show={show} setShow={setShow} />
      </RecipesLayout>
    </div>
  );
}

export async function getStaticProps() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/recipes`
  );
  const recipes = result.data;
  return {
    props: { recipes },
  };
}
