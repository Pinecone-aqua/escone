import { RecipeType } from "@/utils/types";
import { Carousel } from "primereact/carousel";
import RecipeCard from "../common/RecipeCard";

interface PopularSectionProps {
  recipes: RecipeType[];
}

export default function PopularSection({ recipes }: PopularSectionProps) {
  const recipeTemplate = (recipe: RecipeType) => (
    <RecipeCard key={recipe._id} recipe={recipe} />
  );

  return (
    <div className="popular container">
      <h3>Popular recipes</h3>
      <Carousel
        className="carousel"
        value={recipes.slice(0, 9)}
        numVisible={4}
        numScroll={3}
        itemTemplate={recipeTemplate}
      />
    </div>
  );
}
