import { RecipeType } from "@/utils/types";
import { ScrollPanel } from "primereact/scrollpanel";
import { Carousel } from "primereact/carousel";

interface SpecialProps {
  recipes: RecipeType[];
}

export default function SpecialRecipe({ recipes }: SpecialProps) {
  const recipeTemplate = (recipe: RecipeType) => (
    <div className="special-recipe" key={recipe._id}>
      <h3>{recipe.title}</h3>
      <div className="special-recipe-body">
        <picture>
          <img src={recipe.images[0]} alt="special" />
        </picture>
        <div className="ingredients">
          <div className="ingredients-inner">
            <h5>Ingredients</h5>
            <ScrollPanel className="ingredients-body">
              {recipe.ingredients.map((ing, index) => (
                <p className="ingredient" key={index}>
                  {ing.quantity}
                  <span>{ing.measure}</span>
                  {ing.name}
                </p>
              ))}
            </ScrollPanel>
            <div className="description">{recipe.description}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="special">
      <div className="container">
        <h2>Special recipe</h2>
        <Carousel
          value={recipes}
          numVisible={1}
          numScroll={1}
          itemTemplate={recipeTemplate}
        />
      </div>
    </div>
  );
}
