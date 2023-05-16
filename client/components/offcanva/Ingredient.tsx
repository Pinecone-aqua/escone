import { IngredientType, RecipeType } from "@/utils/types";
import React, { useState } from "react";

type propType = {
  newRecipe: RecipeType;
  setNewRecipe: React.Dispatch<React.SetStateAction<RecipeType>>;
};

export default function Ingredient({ newRecipe, setNewRecipe }: propType) {
  const [newIngredientName, setNewIngredientName] = useState<string>("");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState<number>(0);
  const [newIngredientMeasure, setNewIngredientMeasure] = useState<string>("");
  const [isChange, setIsChange] = useState<number>();

  function addIngredientHandler() {
    if (
      !newIngredientName ||
      !newIngredientQuantity ||
      !newIngredientMeasure ||
      newRecipe.ingredients.some((ing) => ing.name == newIngredientName)
    ) {
      return;
    }
    const newIngredient: IngredientType = {
      name: newIngredientName,
      quantity: newIngredientQuantity,
      measure: newIngredientMeasure,
    };
    console.log(newIngredient);
    newRecipe.ingredients = [...newRecipe.ingredients, newIngredient];
    setNewRecipe({ ...newRecipe });
    setNewIngredientName("");

    setNewIngredientQuantity(0);
    setNewIngredientMeasure("");
  }

  function updateIngredientHanlder(index: number, ing: IngredientType) {
    const updateIngredient: IngredientType = {
      name: newIngredientName == "" ? ing.name : newIngredientName,
      quantity:
        newIngredientQuantity == 0 ? ing.quantity : newIngredientQuantity,
      measure: newIngredientMeasure == "" ? ing.measure : newIngredientMeasure,
    };
    newRecipe.ingredients.splice(index, 1, updateIngredient);
    setNewRecipe({ ...newRecipe });
    setNewIngredientName("");
    setIsChange(undefined);
    setNewIngredientQuantity(0);
    setNewIngredientMeasure("");
  }

  function removeIngredient(name: string) {
    const updatedIngredients = newRecipe.ingredients.filter(
      (ing) => ing.name !== name
    );
    console.log(updatedIngredients);
    newRecipe.ingredients = updatedIngredients;
    setNewRecipe({ ...newRecipe });
  }

  return (
    <div className="ingredients">
      <label htmlFor="ingredients">ingredients</label>
      {newRecipe.ingredients.map((ing, index) => (
        <div key={ing.name} className="ingredient">
          <div className="ingredient-detail">
            <input
              type="text"
              defaultValue={ing.name}
              onChange={(e) => {
                setIsChange(index);
                setNewIngredientName(e.target.value);
              }}
            />
            <input
              type="number"
              defaultValue={ing.quantity}
              onChange={(e) => {
                setIsChange(index);
                setNewIngredientQuantity(Number(e.target.value));
              }}
            />
            <input
              type="text"
              defaultValue={ing.measure}
              onChange={(e) => {
                setIsChange(index);
                setNewIngredientMeasure(e.target.value);
              }}
            />
            {isChange == index && (
              <input
                type="button"
                className="cursor-pointer text-green-500"
                value={"save"}
                onClick={() => updateIngredientHanlder(index, ing)}
              />
            )}
            <input
              type="button"
              className="cursor-pointer text-red-500"
              value={"remove"}
              onClick={() => removeIngredient(ing.name)}
            />
          </div>
        </div>
      ))}

      <div className="ingredients-add">
        <input
          placeholder="ingredient"
          type="text"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
        />
        <input
          type="number"
          value={newIngredientQuantity}
          onChange={(e) => setNewIngredientQuantity(Number(e.target.value))}
        />
        <input
          placeholder="measure"
          type="text"
          value={newIngredientMeasure}
          onChange={(e) => setNewIngredientMeasure(e.target.value)}
        />

        <button onClick={addIngredientHandler}>Add</button>
      </div>
    </div>
  );
}
