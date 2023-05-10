import { RecipeType } from "@/utils/types";
import React, { Dispatch, SetStateAction } from "react";
import Card from "./Card";

type PropType = {
  recipes: RecipeType[];
  setShow: Dispatch<SetStateAction<boolean>>;
};

function GridCards({ recipes, setShow }: PropType) {
  return (
    <div className="flex flex-wrap justify-between gap-10">
      {recipes.map((recipe, index) => (
        <Card key={index} recipe={recipe} setShow={setShow} />
      ))}
    </div>
  );
}

export default GridCards;
