import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import { IngredientType, RecipeType } from "@/utils/types";
import { FileUpload } from "primereact/fileupload";

type PropType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};
function Offcanva({ show, setShow }: PropType) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeType>();
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [newIngredientName, setNewIngredientName] = useState<string>("");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState<number>(0);
  const [newIngredientMeasure, setNewIngredientMeasure] = useState<string>("");
  const [instructions, setInstructions] = useState<{ [x: number]: string }[]>(
    []
  );
  const [newInstruction, setNewInstruction] = useState<string>();
  const [isChange, setIsChange] = useState<number>();

  useEffect(() => {
    setIsChange(undefined);
    setRecipe(undefined);
    router.query.id &&
      axios
        .get(`http://localhost:3030/recipes/${router.query.id}`)
        .then((res) => {
          setRecipe(res.data);
          setIngredients(res.data.ingredients);
          console.log(res.data);
          setInstructions(res.data.instructions);
        });
  }, [router.query.id]);

  function hideHandler() {
    setShow(false);
    setIsChange(undefined);
    const { pathname } = router;
    router.push({ pathname }, undefined, { shallow: true });
  }

  function addIngredientHandler() {
    if (!newIngredientName || !newIngredientQuantity || !newIngredientMeasure) {
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

  function removeIngredientHanlder(index: number) {
    ingredients.splice(index, 1);
    console.log(ingredients);
    setIngredients([...ingredients]);
  }
  function addInstruction() {
    if (!newInstruction) {
      return;
    }
    const newInstructionObject = { [instructions.length + 1]: newInstruction };
    setInstructions([...instructions, newInstructionObject]);
    setNewInstruction("");
  }
  return (
    <div>
      (
      <Sidebar
        visible={show}
        position="right"
        onHide={hideHandler}
        className="p-sidebar-lg"
      >
        <h2 className="text-2xl font-bold">Recipe edit</h2>

        {recipe && (
          <div className="w-full ">
            <form className="px-10 py-5 flex flex-col gap-5">
              <label className="flex flex-col gap-3">
                <p className="text-xl font-semi">Title</p>
                <input
                  type="text"
                  className="border w-full px-3 py-2 rounded-xl"
                />
              </label>
              <label className="flex flex-col gap-3">
                <p className="text-xl font-semi">Image upload</p>
                <div className="flex flex-wrap justify-between">
                  {recipe.images.map((img, index) => (
                    <img src={img} alt="" key={index} className="w-20" />
                  ))}
                </div>

                <FileUpload
                  name="imageUpload"
                  url={"/api/upload"}
                  multiple
                  accept="image/*"
                />
              </label>
              <label className="flex flex-col gap-3">
                <p className="text-xl font-semi">Description</p>
                <textarea
                  name=""
                  id=""
                  className="w-full border rounded-lg resize-none p-5 text-lg h-40"
                  defaultValue={recipe.description}
                />
              </label>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semi">Ingredients</p>
                {ingredients.map((ing, index) => (
                  <div key={index} className="flex">
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
                          className="cursor-pointer"
                          value={"save"}
                          onClick={() => updateIngredientHanlder(index, ing)}
                        />
                      )}
                      <input
                        type="button"
                        className="cursor-pointer"
                        value={"remove"}
                        onClick={() => removeIngredientHanlder(index)}
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
                    onChange={(e) =>
                      setNewIngredientQuantity(Number(e.target.value))
                    }
                  />
                  <input
                    type="text"
                    className="border w-20 px-2 py-1 border-black rounded-lg"
                    value={newIngredientMeasure}
                    onChange={(e) => setNewIngredientMeasure(e.target.value)}
                  />
                  <input
                    onClick={addIngredientHandler}
                    type="button"
                    value="add"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semi">Instructions</p>
                {instructions.map((ins, index) => (
                  <div key={index}>
                    {" "}
                    <p>Step {Object.keys(ins)}</p>{" "}
                    <textarea
                      name=""
                      id=""
                      defaultValue={Object.values(ins)}
                      className="w-full border p-4 rounded-lg resize-none h-[200px]"
                    />
                  </div>
                ))}
                <div className="flex flex-col w-full ">
                  {" "}
                  <p>Step {instructions.length + 1}</p>{" "}
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
            </form>
          </div>
        )}
      </Sidebar>
      )
    </div>
  );
}

export default Offcanva;
// ) : (
//           <div className="w-full flex justify-center">
//             <div className="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin">
//               <span className="bg-white h-1 w-1 text-white">.</span>
//             </div>
//           </div>
//         )
