import RecipeCard from "@/components/common/RecipeCard";
import { useUser } from "@/context/userContext";
import { RecipeType } from "@/utils/types";
import axios from "axios";

export default function Profile({
  recipes,
}: {
  recipes: RecipeType[];
}): JSX.Element {
  const { user } = useUser();
  console.log(recipes);
  console.log(user);

  return (
    <div className="recipes lg:w-9/12 flex h-full flex-wrap gap-3">
      {recipes.length != 0 ? (
        recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))
      ) : (
        <p>favorites</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context: { query: { user: string } }) {
  const userId: string = context.query.user; // logs the query parameters
  const result = await axios.get(
    `${process.env.BACK_END_URL}/recipe/recipes?favorites=${userId}&status=approve`
  );
  const recipes = result.data;
  return {
    props: { recipes },
  };
}
