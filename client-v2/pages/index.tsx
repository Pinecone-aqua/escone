/* eslint-disable react-hooks/exhaustive-deps */
import HeroSection from "@/components/Home/HeroSection";
import PopularSection from "@/components/Home/PopularSection";
import SpecialRecipe from "@/components/Home/SpecialRecipe";
import { RecipeType } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    console.log(recipes);
    axios
      .get("http://localhost:3030/recipes/all")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <title>foodie. | Home</title>

      <div className="container">
        <HeroSection />
        <PopularSection recipes={recipes} />
        <SpecialRecipe recipes={recipes.slice(0, 1)} />
      </div>
    </>
  );
}
