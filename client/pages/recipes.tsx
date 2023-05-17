import RecipeCard from "@/components/common/RecipeCard";
import Filter from "@/components/subs/Filter";
import { useRouter } from "next/router";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeType } from "@/utils/types";

export default function Recipes({
  recipes,
  status,
}: {
  recipes: RecipeType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status: any;
}) {
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
          <Filter status={status} />
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
  category?: string | string[];
  ingredient?: string | string[];
  tag?: string | string[];
};

export async function getServerSideProps(context: { query: queryType }) {
  const queryObj: queryType = context.query;

  const queryParams = new URLSearchParams();
  queryParams.append("status", "approve");
  const statusResult = await axios.get(
    `${process.env.BACK_END_URL}/recipe/statistics`
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
  const url = `${process.env.BACK_END_URL}/recipe/recipes?${
    queryString && `${queryString}`
  }`;
  const result = await axios.get(url);
  const recipes = result.data;
  console.log(queryString);
  return {
    props: { recipes, status },
  };
}
