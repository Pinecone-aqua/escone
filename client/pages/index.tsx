import Carousel from "@/components/Home/Carousel";
import RecipesGrid from "@/components/Home/RecipesGrid";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const limitedRecipes = recipes.slice(0, 12);
  console.log(recipes);
  useEffect(() => {
    axios
      .get("http://localhost:3030/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Head>
        <title key="title">Home | FOODIE</title>
      </Head>
      <Carousel recipes={recipes} />
      <RecipesGrid recipes={limitedRecipes} />
    </>
  );
}
