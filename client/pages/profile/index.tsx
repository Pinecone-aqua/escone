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
  const router = useRouter();
  let totalPages = 1;
  const page = router.query.page ? router.query.page : 1;
  if (recipes.length < limit) {
    if (recipes.length == 0) {
      if (page == 1) {
        totalPages = 1;
      } else {
        totalPages = Number(`${page}`) - 1;
        router.query.page = `${totalPages}`;
        router.push({ query: router.query });
      }
    } else {
      totalPages = Number(`${page}`);
    }
  } else {
    totalPages = Number(page) + 1;
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
