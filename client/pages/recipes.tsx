import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { RecipeType } from "@/utils/types";
import Filter from "@/components/subs/Filter";
import DropFilter from "@/components/subs/DropFilter";
import RecipeCard from "@/components/common/RecipeCard";
import Pagination from "@/components/common/Pagination";

interface RecipesProps {
  recipes: RecipeType[];
  status: string;
  recipeIds: string[];
  limit: number;
}

type QueryType = {
  category?: string | string[];
  ingredient?: string | string[];
  tag?: string | string[];
};

export default function Recipes({
  recipes,
  status,
  recipeIds,
  limit,
}: RecipesProps) {
  const { query } = useRouter();
  const [filter, setFilter] = useState<(string[] | undefined)[]>([]);

  let totalPage = Math.floor(recipeIds.length / limit + 1);
  if (recipes.length < limit) {
    if (Number(query.page) > 1) {
      totalPage = Number(query.page);
    } else {
      query.page = `1`;
      totalPage = 1;
    }
  }

  useEffect(() => {
    const fltr: (string[] | undefined)[] = Object.values(query).map((res) => {
      if (typeof res === "string") return [res];
      return res;
    });
    setFilter(fltr);
  }, [query]);

  return (
    <div className="recipes container">
      <div className="recipes-header">
        <p>
          {recipes.length} results for {`" `}
          {Object.keys(query).length === 0
            ? "Recipes"
            : filter
                .map((res) => {
                  res?.join(", ");
                })
                .join(", ")}
          {` "`}
        </p>
        <DropFilter status={status} className="dropfilter" />
      </div>

      <div className="recipes-body">
        <div className="recipes-body-filter">
          <Filter status={status} />
        </div>
        <div className="recipes-body-content">
          <div className="recipes-body-content-list">
            {recipes.length === 0 ? (
              <p>Empty</p>
            ) : (
              recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))
            )}
          </div>
          <Pagination totalPages={totalPage} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: { query: QueryType }) {
  const queryParams = new URLSearchParams();
  const limit = 24;
  queryParams.append("status", "approve");
  queryParams.append("limit", `${limit}`);

  const statusResult = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/statistics`
  );
  const status = statusResult.data;

  for (const key in query) {
    const value = query[key as keyof QueryType];
    if (key == "page") {
      queryParams.append("page", `${value}`);
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        const category = status.CategoryStatus.find(
          (cate: { _id: string; name: string }) => cate.name === v
        );
        const tags = status.tagsStatus.find(
          (tag: { _id: string; name: string }) => tag.name === v
        );

        if (key === "category" && category) {
          queryParams.append(key, category._id);
        } else if (key === "tag" && tags) {
          queryParams.append(key, tags._id);
        } else {
          queryParams.append(key, v);
        }
      });
    } else {
      const category = status.CategoryStatus.find(
        (cate: { _id: string; name: string }) => cate.name === value
      );
      const tags = status.tagsStatus.find(
        (tag: { _id: string; name: string }) => tag.name === value
      );
      if (key === "category" && category) {
        queryParams.append(key, category._id);
      } else if (key === "tag" && tags) {
        queryParams.append(key, tags._id);
      } else if (value) {
        queryParams.append(key, `${value}`);
      }
    }
  }

  const queryString = queryParams.toString();
  const url = `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/recipes?${queryString}`;
  const recipeIdsResult = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/ids`
  );
  const recipeIds = recipeIdsResult.data;
  const result = await axios.get(url);
  const recipes = result.data;

  return { props: { recipes, status, recipeIds, limit } };
}
