import { RecipeType } from "@/utils/types";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import RecipeCard from "../common/RecipeCard";

export default function PopularSection({ recipes }: { recipes: RecipeType[] }) {
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
        {recipes.slice(0, 4).map((recipe: RecipeType) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
