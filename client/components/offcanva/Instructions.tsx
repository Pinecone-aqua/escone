import { RecipeType } from "@/utils/types";
import React, { Dispatch, SetStateAction, useState } from "react";

type propType = {
  newRecipe: RecipeType;
  setNewRecipe: Dispatch<SetStateAction<RecipeType>>;
};

function Instructions({ newRecipe, setNewRecipe }: propType) {
  const [newInstruction, setNewInstruction] = useState<string>();
  const [updateInstruction, setUpdateInstruction] = useState<string>();
  const [isChangeIns, setIsChangeIns] = useState<number>();

  function addInstruction() {
    if (!newInstruction) {
      return;
    }

    const newInstructionObject = {
      [newRecipe.instructions.length + 1]: newInstruction,
    };

    newRecipe.instructions = [...newRecipe.instructions, newInstructionObject];
    setNewRecipe({ ...newRecipe });
    setNewInstruction("");
  }

  function removeInstruction(index: number) {
    newRecipe.instructions.splice(index, 1);
    setNewRecipe({ ...newRecipe });
  }

  function updateInstructionHandler(index: number) {
    if (updateInstruction) {
      const InstructionObj = { [index + 1]: updateInstruction };
      newRecipe.instructions.splice(index, 1, InstructionObj);
      setNewRecipe({ ...newRecipe });
    } else {
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semi">Instructions</p>
      {newRecipe.instructions.map((ins, index) => (
        <div key={index} className="relative">
          {" "}
          <div className="flex w-full justify-between ">
            <p>Step {index + 1}</p>
            <input
              type={"button"}
              value="remove"
              className="text-red-500"
              onClick={() => removeInstruction(index)}
            />
          </div>
          <textarea
            defaultValue={Object.values(ins)}
            onChange={(e) => {
              setUpdateInstruction(e.target.value);
              setIsChangeIns(index);
            }}
            className="w-full border p-4 rounded-lg resize-none h-[150px]"
          />
          {isChangeIns == index &&
            updateInstruction != Object.values(ins).at(0) && (
              <input
                type="button"
                value={"save"}
                onClick={() => updateInstructionHandler(index)}
                className="text-green-500 absolute bottom-3 right-2 px-2 py-1 border border-green-500 rounded-xl hover:bg-green-500 hover:text-white"
              />
            )}
        </div>
      ))}
      <div className="flex flex-col w-full ">
        {" "}
        <p>Step {newRecipe.instructions.length + 1}</p>{" "}
        <textarea
          name=""
          id=""
          placeholder="next Ingredients"
          value={newInstruction}
          className="w-full border p-4 rounded-lg resize-none h-[150px]"
          onChange={(e) => setNewInstruction(e.target.value)}
        />
        <input
          type="button"
          value={"add"}
          onClick={addInstruction}
          className={"self-end px-3 py-1 border rounded-lg "}
        />
      </div>
    </div>
  );
}

export default Instructions;
