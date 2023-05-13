import RecipeCard from "@/components/common/RecipeCard";
import Filter from "@/components/recipes/Filter";
import { useRouter } from "next/router";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeType } from "@/utils/types";

export default function Recipes({ recipes }: { recipes: RecipeType[] }) {
  const { query } = useRouter();
  const [filter, setFilter] = useState<(string[] | undefined)[]>([]);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const fltr: (string[] | undefined)[] = Object.values(query).map((res) => {
      if (typeof res === "string") return [res];
      return res;
    });

    setFilter(fltr);
  }, [query]);

  return (
    <div className="recipes container">
      {/* HEADER */}
      <div className="recipes-header">
        <p>
          {recipes.length} results for {`" `}
          {Object.keys(query).length === 0
            ? "Recipes"
            : filter.map((res) => res?.join(", ")).join(", ")}
          {` "`}
        </p>
        <button
          className="text-[25px] lg:hidden"
          onClick={() => {
            setShow(!show);
            console.log("clicked");
          }}
        >
          <TbAdjustmentsHorizontal />
        </button>
      </div>

      {/* BODY */}
      <div className="flex w-full">
        {/* SIDE FILTER */}
        <div className="recipes-filter w-3/12">
          <Filter />
        </div>

        {/* RECIPES */}
        <div className="recipes-grid w-9/12">
          {recipes.length == 0 ? (
            <p>empty</p>
          ) : (
            recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

type queryType = {
  cat?: string | string[];
  ing?: string | string[];
  tag?: string | string[];
};

export async function getServerSideProps(context: { query: queryType }) {
  const queryObj = context.query;

  const queryParams = new URLSearchParams();

  for (const key in queryObj) {
    const value = queryObj[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      queryParams.append(key, value);
    }
  }

  const queryString = queryParams.toString();
  console.log(queryString, "this");
  const url = `http://localhost:3030/recipes/${
    queryString ? `filter?${queryString}` : "all"
  }`;
  const result = await axios.get(url);
  const recipes = result.data;
  return {
    props: { recipes },
  };
}
