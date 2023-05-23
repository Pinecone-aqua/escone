import GridCards from "@/components/GridCards";
import Offcanva from "@/components/Offcanva";
import RecipesLayout from "@/layouts/RecipesLayout";
import Table from "@/components/RecipeTable";
import { RecipeType } from "@/utils/types";
import axios from "axios";

import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
export default function Recipes({
  recipes,
  limit,
}: {
  recipes: RecipeType[];
  limit: number;
}) {
  const [show, setShow] = useState(false);
  const [grid, setGrid] = useState(false);
  const { query } = useRouter();
  let totalPages = Number(query.page) + 1 || 2;
  if (recipes.length < limit) {
    totalPages = Number(query.page);
  }

  return (
    <div className="recipes children">
      <RecipesLayout setGrid={setGrid} grid={grid}>
        {grid ? (
          <GridCards recipes={recipes} setShow={setShow} />
        ) : (
          <Table recipes={recipes} setShow={setShow} />
        )}
        <Pagination totalPages={totalPages} />
        <Offcanva show={show} setShow={setShow} />
      </RecipesLayout>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ query }: any) {
  const limit = 8;

  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/recipes`,
    { params: { ...query, limit: limit } }
  );
  const recipes = result.data;
  return {
    props: { recipes, limit },
  };
}
