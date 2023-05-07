/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { RecipeType } from "@/utils/types";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from "react-icons/md";
import RecipeCard from "../RecipeCard";

type PopularProps = {
  recipes: RecipeType[];
};

export default function PopularSection({ recipes }: PopularProps) {
  return (
    <>
      <div className="popular">
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
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await fetch(`http://localhost:3030/recipes`);
    const recipes = await res.json();
    return { props: { recipes: recipes } };
  } catch (err) {
    return err;
  }
};
