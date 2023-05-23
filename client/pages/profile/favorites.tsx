import Pagination from "@/components/common/Pagination";
import RecipeCard from "@/components/common/RecipeCard";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import { useRouter } from "next/router";

export default function Profile({
  recipes,
  limit,
}: {
  recipes: RecipeType[];
  limit: number;
}): JSX.Element {
  const { query, push } = useRouter();

  let totalPages = Number(query.page) + 1 || 2;

  if (recipes.length < limit) {
    if (recipes.length == 0) {
      totalPages = Number(query.page) - 1;
      push({ query: { ...query, page: totalPages } });
    }
    totalPages = Number(query.page) || 1;
  }
  return (
    <div className="recipes">
      {recipes.length != 0 ? (
        <div className="recipes">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
          <Pagination totalPages={totalPages} />
        </div>
      ) : (
        <p>Та жор хадгалаагүй байна.</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context: {
  query: {
    page?: string;
    user: string;
  };
}) {
  const limit = 12;
  const userId: string = context.query.user; // logs the query parameters
  const result = await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACK_END_URL
    }/recipe/recipes?favorites=${userId}&status=approve&limit=${limit}${
      context.query.page ? `&page=${context.query.page}` : ""
    }`
  );
  const recipes = result.data;
  return {
    props: { recipes, limit },
  };
}
