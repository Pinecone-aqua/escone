import { IngredientType } from "@/utils/types";
import React, { useState } from "react";

type propType = {
  ingredients: IngredientType[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientType[]>>;
};

function Ingredient({ ingredients, setIngredients }: propType) {
  const [newIngredientName, setNewIngredientName] = useState<string>("");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState<number>(0);
  const [newIngredientMeasure, setNewIngredientMeasure] = useState<string>("");
  const [isChange, setIsChange] = useState<number>();

  function addIngredientHandler() {
    if (
      !newIngredientName ||
      !newIngredientQuantity ||
      !newIngredientMeasure ||
      ingredients.some((ing) => ing.name == newIngredientName)
    ) {
      return;
    }
    const newIngredient: IngredientType = {
      name: newIngredientName,
      quantity: newIngredientQuantity,
      measure: newIngredientMeasure,
    };
    console.log(newIngredient);
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
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
    ingredients.splice(index, 1, updateIngredient);
    setIngredients(ingredients);
    setNewIngredientName("");
    setIsChange(undefined);
    setNewIngredientQuantity(0);
    setNewIngredientMeasure("");
  }

  function removeIngredient(name: string) {
    // ingredients.splice(index, 1);
    // setIngredients([...ingredients]);
    const updatedIngredients = ingredients.filter((ing) => ing.name !== name);
    console.log(updatedIngredients);

    setIngredients(updatedIngredients);
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xl font-semi">Ingredients</p>
      {ingredients.map((ing, index) => (
        <div key={ing.name} className="flex">
          <div className="flex gap-3">
            <input
              type="text"
              defaultValue={ing.name}
              className="border  px-2 py-1 border-black rounded-lg"
              onChange={(e) => {
                setIsChange(index);
                setNewIngredientName(e.target.value);
              }}
            />
            <input
              type="number"
              defaultValue={ing.quantity}
              className="border w-20 px-2 py-1 border-black rounded-lg"
              onChange={(e) => {
                setIsChange(index);
                setNewIngredientQuantity(Number(e.target.value));
              }}
            />
            <input
              type="text"
              defaultValue={ing.measure}
              className="border w-20 px-2 py-1 border-black rounded-lg "
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
      <div className="flex gap-3">
        <input
          type="text"
          className="border  px-2 py-1 border-black rounded-lg"
          value={newIngredientName}
          onChange={(e) => setNewIngredientName(e.target.value)}
        />
        <input
          type="number"
          className="border w-20 px-2 py-1 border-black rounded-lg"
          value={newIngredientQuantity}
          onChange={(e) => setNewIngredientQuantity(Number(e.target.value))}
        />
        <input
          type="text"
          className="border w-20 px-2 py-1 border-black rounded-lg"
          value={newIngredientMeasure}
          onChange={(e) => setNewIngredientMeasure(e.target.value)}
        />
        <input onClick={addIngredientHandler} type="button" value="add" />
      </div>
    </div>
  );
}

export default Ingredient;
