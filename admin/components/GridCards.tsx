import { RecipeType } from "@/utils/types";
import React, { Dispatch, SetStateAction } from "react";
import Card from "./Card";

type PropType = {
  recipes: RecipeType[];
  setShow: Dispatch<SetStateAction<boolean>>;
};

function GridCards({ recipes, setShow }: PropType) {
  return recipes.length != 0 ? (
    <div className="grid-cards">
      {recipes.map((recipe, index) => (
        <Card key={index} recipe={recipe} setShow={setShow} />
      ))}
    </div>
  ) : (
    <div className="">empty</div>
  );
}

export default GridCards;
