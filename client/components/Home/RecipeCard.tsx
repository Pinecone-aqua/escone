import { RecipeType } from "@/utils/types";
import Link from "next/link";
import { useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

type PropType = {
  recipe: RecipeType;
  width?: string;
};
export default function RecipeCard({ recipe, width }: PropType): JSX.Element {
  const [save, setSave] = useState(false);
  const saveHandler = () => {
    setSave(!save);
  };
  return (
    <div className="recipeCard">
      <Link href={`/recipes/${recipe._id}`}>
        <picture>
          <img src={recipe.images[0]} alt="" />
        </picture>
        <div className="text">
          <div className="title">
            <h4>{recipe.title.slice(0, 20)}</h4>
            <button onClick={saveHandler}>
              {save === false ? <MdFavoriteBorder /> : <MdFavorite />}
            </button>
          </div>
          <p>{recipe.description.slice(0, 80)}...</p>
          <button className="more">
            read more <span>&#8594;</span>
          </button>
        </div>
      </Link>
    </div>
  );
}
