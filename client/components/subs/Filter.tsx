import React, { useEffect, useState } from "react";
import { CategoryType, IngredientType, TagType } from "@/utils/types";
import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Filter({ status }: any): JSX.Element {
  const Router = useRouter();
  const [tags, setTags] = useState<TagType[] | undefined>(status?.tagsStatus);
  const [categories, setCategories] = useState<CategoryType[] | undefined>(
    status?.CategoryStatus
  );
  const [ingredients, setIngredients] = useState<IngredientType[] | undefined>(
    status?.ingredientStatus
  );

  useEffect(() => {
    setTags(status?.tagsStatus);
    setCategories(status?.CategoryStatus);
    setIngredients(status?.ingredientStatus);
  }, [status?.CategoryStatus, status?.ingredientStatus, status?.tagsStatus]);

  function selectHandler(type: string, name: string) {
    let query: string | string[] | undefined = Router.query[type];
    const objectQuery = Router.query;

    if (!query) {
      Router.query.page = "1";
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
      objectQuery.page = "1";
      Router.push({
        query: { ...objectQuery },
      });
    }
  }
  return (
    <div className="filter">
      <div className="categories filter-box">
        <h2>Категори</h2>
        <div className="list">
          {categories &&
            categories.map((category, index) => (
              <div key={index} className="single-item">
                <input
                  type="checkbox"
                  name={category.name}
                  id={category.name}
                  className="focus:outline-0 border rounded-sm  w-2 h-2 lg:w-4 lg:h-4"
                  onChange={() => {
                    selectHandler("category", category.name);
                  }}
                  checked={
                    Router.query.category
                      ? Router.query.category.indexOf(category.name) != -1
                      : false
                  }
                />
                <label htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
        </div>
      </div>

      <div className="ingredients filter-box">
        <h2>Орц</h2>
        <div className="list">
          {ingredients &&
            ingredients.map(
              (ingredient, index) =>
                ingredient.name && (
                  <div key={index} className="single-item">
                    <input
                      type="checkbox"
                      name={ingredient.name}
                      id={ingredient.name}
                      className="focus:outline-0 border rounded-sm  w-2 h-2 lg:w-4 lg:h-4"
                      onChange={() => {
                        selectHandler("ingredient", ingredient.name);
                      }}
                      checked={
                        Router.query.ingredient
                          ? Router.query.ingredient.indexOf(ingredient.name) !=
                            -1
                          : false
                      }
                    />
                    <label htmlFor={ingredient.name}>{ingredient.name}</label>
                  </div>
                )
            )}
        </div>
      </div>

      <div className="tags filter-box">
        <h2>Ангилал</h2>
        <div className="tag list">
          {tags &&
            tags.map((tag, index: number) => (
              <button
                className={`tag
                 ${
                   Router.query.tag && Router.query.tag.indexOf(tag.name) != -1
                     ? "clicked"
                     : ""
                 } `}
                key={index}
                onClick={() => selectHandler("tag", tag.name)}
              >
                {tag.name.slice(0, 5)}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
