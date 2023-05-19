import RecipeCard from "@/components/common/RecipeCard";
import Filter from "@/components/subs/Filter";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeType } from "@/utils/types";
import DropFilter from "@/components/subs/DropFilter";

export default function Recipes({
  recipes,
  status,
}: {
  recipes: RecipeType[];
  status: string;
}) {
  const { query } = useRouter();
  const [filter, setFilter] = useState<(string[] | undefined)[]>([]);

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
            : filter.map((res) => res?.join(", ")).join(", ")}
          {` "`}
        </p>

        <DropFilter status={status} className="dropfilter" />
      </div>

      <div className="recipes-body">
        <div className="recipes-body-filter">
          <Filter status={status} />
        </div>

        <div className="recipes-body-list">
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
  category?: string | string[];
  ingredient?: string | string[];
  tag?: string | string[];
};

export async function getServerSideProps(context: { query: queryType }) {
  const queryObj: queryType = context.query;

  const queryParams = new URLSearchParams();
  queryParams.append("status", "approve");
  const statusResult = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/statistics`
  );
  const status = statusResult.data;

  for (const key in queryObj) {
    const value = queryObj[key as keyof queryType];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (key == "category") {
          const category = status.CategoryStatus.find(
            (cate: { _id: string; name: string }) => {
              if (cate.name == v) return cate._id;
            }
          );
          queryParams.append(key, category._id);
        } else if (key == "tag") {
          const tags = status.tagsStatus.find(
            (tag: { _id: string; name: string }) => {
              if (tag.name == v) return tag._id;
            }
          );
          queryParams.append(key, tags._id);
        } else {
          queryParams.append(key, v);
        }
      });
    } else {
      if (key == "category") {
        const category = status.CategoryStatus.find(
          (cate: { _id: string; name: string }) => {
            if (cate.name == value) return cate._id;
          }
        );
        queryParams.append(key, category._id);
      } else if (key == "tag") {
        const tags = status.tagsStatus.find(
          (tag: { _id: string; name: string }) => {
            if (tag.name == value) return tag._id;
          }
        );
        queryParams.append(key, tags._id);
      } else {
        value && queryParams.append(key, value);
      }
    }
  }

  const queryString = queryParams.toString();
  const url = `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/recipes?${
    queryString && `${queryString}`
  }`;
  const result = await axios.get(url);
  const recipes = result.data;
  console.log(queryString);
  return {
    props: { recipes, status },
  };
}
