/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useRecipe } from "@/context/recipeContext";
import { RecipeType } from "@/utils/types";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import RecipeCard from "../common/RecipeCard";

export default function PopularSection() {
  const { recipes } = useRecipe();

  return (
    <div className="popular container">
      <div className="popular-head">
        <h3>Popular recipes</h3>
        <div className="btns">
          <button>
            <MdOutlineArrowBackIos />
          </button>
          <button>
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </div>

      <div className="popular-grid">
        {recipes &&
          recipes
            .slice(0, 4)
            .map((recipe: RecipeType) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
      </div>
    </div>
  );
}
