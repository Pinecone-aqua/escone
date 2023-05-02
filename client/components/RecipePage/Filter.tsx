import axios from "axios";
import React, { useEffect, useState } from "react";
import { CategoryType, IngredientType, TagType } from "../../utils/types";
import { useRouter } from "next/router";

function Filter() {
  const Router = useRouter();
  const [tags, setTags] = useState<TagType[] | undefined>();
  const [categories, setCategories] = useState<CategoryType[] | undefined>();
  const [ingredients, setIngredients] = useState<
    IngredientType[] | undefined
  >();

  useEffect(() => {
    axios.get("http://localhost:3030/tag/all").then((res) => {
      setTags(res.data.slice(0, 10));
    });
    axios.get("http://localhost:3030/category/all").then((res) => {
      setCategories(res.data.slice(0, 10));
    });
    axios.get("http://localhost:3030/ingredient/all").then((res) => {
      setIngredients(res.data.slice(0, 10));
    });
  }, []);

  function selectHandler(type: string, name: string) {
    let query: string | string[] | undefined = Router.query[type];
    const objectQuery = Router.query;

    if (!query) {
      Router.push({ query: { [type]: name, ...Router.query } });
    } else {
      if (typeof query == "string") query = [query];

      if (query.some((n) => n == name)) {
        query.splice(query.indexOf(name), 1);
        objectQuery[type] = query;
      } else {
        const newarr = [...query, name];
        objectQuery[type] = newarr;
      }

      Router.push({
        query: objectQuery,
      });
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <div className="w-10/12  flex flex-col shadow-2xl rounded-2xl ">
        <div className="text-xl bg-[#E2F2BF] w-full rounded-t-2xl mb-[-18px] p-6 ">
          Categories
        </div>
        <div className="flex flex-col bg-white gap-5 p-8 rounded-2xl w-full  h-full z-30">
          {categories &&
            categories.map((category, index) => (
              <div
                key={index}
                className="flex gap-4 items-center text-sm border-b-2 border-dashed py-2"
              >
                <input
                  type="checkbox"
                  name={category.name}
                  id={category.name}
                  className=" focus:outline-0 border rounded w-4 h-4"
                  onChange={() => {
                    selectHandler("cat", category.name);
                  }}
                  checked={
                    Router.query.cat
                      ? Router.query.cat.indexOf(category.name) != -1
                      : false
                  }
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
        </div>
      </div>
      <div className="w-10/12  flex flex-col shadow-2xl rounded-2xl  ">
        <div className="text-xl bg-[#E2F2BF] w-full rounded-t-2xl mb-[-18px] p-6 ">
          Ingredients
        </div>
        <div className="flex flex-col bg-white gap-5 p-8 rounded-2xl w-full  h-full z-30">
          {ingredients &&
            ingredients.map(
              (ingredient, index) =>
                ingredient.name && (
                  <div
                    key={index}
                    className="flex gap-4 items-center text-sm border-b-2 border-dashed py-2"
                  >
                    <input
                      type="checkbox"
                      name={ingredient.name}
                      id={ingredient.name}
                      className=" focus:outline-0 border rounded w-4 h-4"
                      onChange={() => {
                        selectHandler("ing", ingredient.name);
                      }}
                      checked={
                        Router.query.ing
                          ? Router.query.ing.indexOf(ingredient.name) != -1
                          : false
                      }
                    />
                    <label htmlFor={ingredient.name}>{ingredient.name}</label>
                  </div>
                )
            )}
        </div>
      </div>
      <div className="w-10/12 rounded-3xl shadow-2xl p-8  flex flex-col gap-5 ">
        <p className="text-2xl">Tags</p>
        <div className=" w-full flex flex-wrap gap-3 justify-center">
          {tags &&
            tags.map((tag, index: number) => (
              <button
                className={`border border-black px-3 text-sm py-1 rounded-full
                 ${
                   Router.query.tag && Router.query.tag.indexOf(tag.name) != -1
                     ? `bg-primary text-white border-none`
                     : ""
                 } `}
                key={index}
                onClick={() => selectHandler("tag", tag.name)}
              >
                {tag.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
