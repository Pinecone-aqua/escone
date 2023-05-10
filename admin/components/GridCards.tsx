import { RecipeType } from "@/utils/types";
import React from "react";
import Card from "./Card";

function GridCards({ recipes }: { recipes: RecipeType[] }) {
  return (
    <div className="flex flex-wrap justify-between gap-10">
      {recipes.map((recipe, index) => (
        <Card key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default GridCards;
