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
    <div className="side-filter">
      {/* CATEGORIES */}
      <div className="categories">
        <h2>All Categories</h2>
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

      {/* INGREDIENTS */}
      <div className="ingredients pack">
        <h2>Ingredients</h2>
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
                      className=" focus:outline-0 border rounded-sm  w-2 h-2 lg:w-4 lg:h-4"
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

      {/* TAGS */}
      <div className="tags pack">
        <h2>Tags</h2>
        <div className="tag-buttons">
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