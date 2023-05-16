import RecipeCard from "@/components/common/RecipeCard";
import { RecipeType } from "@/utils/types";
import axios from "axios";

export default function Profile({
  recipes,
}: {
  recipes: RecipeType[];
}): JSX.Element {
  return (
    <div className="recipes lg:w-9/12 flex h-full flex-wrap gap-3">
      {recipes.length != 0 ? (
        recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))
      ) : (
        <p>empty</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context: { query: { user: string } }) {
  let recipes = [];
  const userId: string = context.query.user;
  if (userId) {
    const result = await axios.get(
      `${process.env.BACK_END_URL}/recipe/recipes?user=${userId}`
    );
    recipes = result.data;
  }
  return {
    props: { recipes },
  };
}
