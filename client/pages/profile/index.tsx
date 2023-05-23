import axios from "axios";
import { RecipeType } from "../../utils/types";
import RecipeCard from "../../components/common/RecipeCard";
import Pagination from "@/components/common/Pagination";
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
    totalPages = Number(query.page);
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
        <p>Та жор нэмээгүй байна.</p>
      )}
    </div>
  );
}

export async function getServerSideProps(context: {
  query: { user: string; page?: string };
}) {
  let recipes = [];
  const limit = 12;
  const userId: string = context.query.user;
  if (userId) {
    const result = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACK_END_URL
      }/recipe/recipes?user=${userId}&limit=${limit}${
        context.query.page ? `&page=${context.query.page}` : ""
      }`
    );
    recipes = result.data;
  }
  return {
    props: { recipes, limit },
  };
}
