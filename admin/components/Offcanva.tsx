import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { useRouter } from "next/router";
import axios from "axios";
import {
  CategoryType,
  IngredientType,
  ProcessStatus,
  RecipeType,
  TagType,
} from "@/utils/types";
import Instructions from "./offcanva/Instructions";
import Ingredient from "./offcanva/Ingredient";
import { IoMdCloseCircleOutline } from "react-icons/io";

type PropType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};
function Offcanva({ show, setShow }: PropType) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<RecipeType>();
  const [status, setStatus] = useState<ProcessStatus | string>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>();
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const [recipecategory, setRecipeCategory] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>();
  const [recipeTags, setRecipeTags] = useState<TagType[]>([]);
  const [tags, setTags] = useState<TagType[]>();
  const [instructions, setInstructions] = useState<{ [x: number]: string }[]>(
    []
  );
  const [images, setImages] = useState<File[]>([]);
  const [servings, setServings] = useState<number>();
  const [cookTime, setCookTime] = useState<number>();
  const [recipeImages, setRecipeImages] = useState<string[]>([]);

  useEffect(() => {
    setRecipe(undefined);
    router.query.id &&
      axios
        .get(`http://localhost:3030/recipes/${router.query.id}`)
        .then((res) => {
          setRecipe(res.data);
          setRecipeCategory(res.data.categories);
          setRecipeTags(res.data.tags);
          setTitle(res.data.title);
          setServings(res.data.servings);
          setCookTime(res.data.cook_time);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
          setStatus(res.data.status);
          setRecipeImages(res.data.images);
          setInstructions(res.data.instructions);
        });
    axios.get(`http://localhost:3030/category/all`).then((res) => {
      setCategory(res.data);
    });
    axios.get(`http://localhost:3030/tag/all`).then((res) => {
      setTags(res.data);
    });
  }, [router.query.id]);

  function hideHandler() {
    setShow(false);
    setImages([]);
    const { pathname } = router;
    router.push({ pathname }, undefined, { shallow: true });
  }

  function updateRecipe() {
    console.log("work");
    const recipeFormData = new FormData();
    const updatedRecipe = {
      status,
      title,
      // eslint-disable-next-line camelcase
      created_by: recipe?.created_by._id,
      images: recipeImages,
      description,
      ingredients,
      categories: recipecategory.map((category) => category._id),
      tags: recipeTags.map((tag) => tag._id),
      instructions,
      servings,
      // eslint-disable-next-line camelcase
      cook_time: cookTime,
      // eslint-disable-next-line camelcase
      created_date: recipe?.created_date,
    };
    if (images.length > 0) {
      images.forEach((image) => recipeFormData.append("images", image));
    }
    recipeFormData.append("body", JSON.stringify(updatedRecipe));
    console.log(updatedRecipe);

    axios
      .patch(
        `http://localhost:3030/recipes/upload/${recipe?._id}`,
        recipeFormData
      )
      .then((res) => console.log(res.data));

    hideHandler();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addCategoryHandler(e: any) {
    const newCategoryArr = e.target.value.split(",");
    const newCategoryObject = {
      _id: newCategoryArr[0],
      name: newCategoryArr[1],
      picture: newCategoryArr[2],
    };
    setRecipeCategory([...recipecategory, newCategoryObject]);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addTagHandler(e: any) {
    const newTagsArr = e.target.value.split(",");
    const newTagsObject = {
      _id: newTagsArr[0],
      name: newTagsArr[1],
    };
    setRecipeTags([...recipeTags, newTagsObject]);
  }
  function removeTagHandler(id: string) {
    const updatedTag = recipeTags.filter((tag) => tag._id !== id);
    setRecipeTags(updatedTag);
  }
  function removeCategoryHandler(id: string) {
    const updatedCategory = recipecategory.filter((tag) => tag._id !== id);
    setRecipeCategory(updatedCategory);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function uploadHandler(e: any) {
    const image: FileList = e.target.files;
    for (let i = 0; i < image.length; i++) {
      console.log(i);
      images.push(image[i]);
    }
    setImages([...images]);
    console.log(images);
  }
  function removeImage(index: number) {
    images.splice(index, 1);

    setImages([...images]);
  }
  function removeRecipeImage(index: number) {
    recipeImages.splice(index, 1);
    setRecipeImages([...recipeImages]);
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
        {recipe ? (
          <div className="w-full mb-20">
            <h2 className="text-2xl font-bold">Recipe edit</h2>
            <form className="px-10 py-5 flex flex-col gap-5">
              <div className=" flex w-full justify-between">
                <p className="flex gap-2">
                  created by
                  <span className="text-xl font-semibold">
                    {recipe.created_by.username}
                  </span>
                </p>

                <select
                  defaultValue={status}
                  className={`border rounded-lg ${
                    status == ProcessStatus.Approve
                      ? `border-green-500 bg-green-200 text-green-700`
                      : status == ProcessStatus.Deny
                      ? `border-red-500 bg-red-200 text-red-700`
                      : `border-orange-500 bg-orange-200 text-orange-700`
                  }`}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="approve">approve</option>
                  <option value="deny">deny</option>
                </select>
              </div>
              <label className="flex flex-col gap-3">
                <p className="text-xl font-semi">Title</p>
                <input
                  defaultValue={title}
                  type="text"
                  className="border w-full px-3 py-2 rounded-xl"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semi">Image upload</p>
                <div className="flex flex-wrap justify-between items-center">
                  {recipeImages.map((img, index) => (
                    <picture
                      key={index}
                      className="relative group group-hover:delay-300 "
                    >
                      <img src={img} alt="" className="w-40" />
                      <div
                        className=" absolute top-[-10px] right-[-10px] hidden group-hover:block text-2xl text-gray-400 hover:text-black bg-gray-100 rounded-full"
                        onClick={() => removeRecipeImage(index)}
                      >
                        <IoMdCloseCircleOutline />
                      </div>
                    </picture>
                  ))}
                  {images.map((img, index) => (
                    <picture
                      key={index}
                      className="relative group group-hover:delay-300 "
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt=""
                        className="w-40"
                      />
                      <div
                        className=" absolute top-[-10px] right-[-10px] hidden group-hover:block text-2xl text-gray-400 hover:text-black bg-gray-100 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <IoMdCloseCircleOutline />
                      </div>
                    </picture>
                  ))}
                </div>

                <input type="file" multiple onChange={uploadHandler} />
              </div>
              <div className="w-full flex  flex-col gap-3">
                <label className="flex gap-10">
                  <p>Servings</p>
                  <input
                    type="number"
                    defaultValue={servings}
                    className="w-16 border border-black rounded-md ps-3"
                    onChange={(e) => setServings(Number(e.target.value))}
                  />
                </label>
                <label className="flex gap-10">
                  <p>Cook time (min)</p>
                  <input
                    type="number"
                    defaultValue={cookTime}
                    className="w-16 border border-black rounded-md ps-3"
                    onChange={(e) => setCookTime(Number(e.target.value))}
                  />
                </label>
              </div>
              <label>
                <p>Categories</p>
                <div className="flex flex-wrap gap-3">
                  {recipecategory.map((cat) => (
                    <div
                      className=" relative px-3 py-1 border border-green-500 rounded-full bg-green-100 text-green-800 group "
                      key={cat._id}
                    >
                      <p>{cat.name}</p>
                      <div
                        className=" absolute top-[-10px] right-[-10px] bg-gray-100 px-2 hover:bg-red-300 text-sm border rounded-full group-hover:block hidden"
                        onClick={() => removeCategoryHandler(cat._id)}
                      >
                        x
                      </div>
                    </div>
                  ))}
                  <select
                    className="px-3 py-1 border border-blue-200 rounded-full bg-blue-50 text-blue-500 "
                    onChange={addCategoryHandler}
                  >
                    <option defaultChecked>choose category</option>
                    {category?.map((cat) => {
                      if (!recipecategory.some((i) => i._id == cat._id)) {
                        return (
                          <option
                            value={[cat._id, cat.name, cat.picture]}
                            key={cat._id}
                          >
                            {cat.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </label>
              <label>
                <p>Tags</p>
                <div className="flex flex-wrap gap-3">
                  {recipeTags.map((tag) => (
                    <div
                      className=" relative px-3 py-1 border border-orange-500 rounded-full bg-orange-100 text-orange-800 group "
                      key={tag._id}
                    >
                      <p>{tag.name}</p>
                      <div
                        className=" absolute top-[-10px] right-[-10px] bg-gray-100 px-2 hover:bg-red-300 text-sm border rounded-full group-hover:block hidden"
                        onClick={() => removeTagHandler(tag._id)}
                      >
                        x
                      </div>
                    </div>
                  ))}
                  <select
                    className="px-3 py-1 border border-blue-200 rounded-full bg-blue-50 text-blue-500 "
                    onChange={addTagHandler}
                  >
                    <option defaultChecked>choose category</option>
                    {tags?.map((tag) => {
                      if (!recipeTags.some((i) => i._id == tag._id)) {
                        return (
                          <option value={[tag._id, tag.name]} key={tag._id}>
                            {tag.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
              </label>
              <label className="flex flex-col gap-3">
                <p className="text-xl font-semi">Description</p>
                <textarea
                  name=""
                  id=""
                  className="w-full border rounded-lg resize-none p-5 text-lg h-40"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <Ingredient
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
              <Instructions
                instructions={instructions}
                setInstructions={setInstructions}
              />
              <input
                type="button"
                value={"save"}
                onClick={updateRecipe}
                className="fixed bottom-10 px-5 py-3 border border-green-700 bg-green-500 text-green-950 rounded-lg right-14"
              />
            </form>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin">
              <span className="bg-white h-1 w-1 text-white">.</span>
            </div>
          </div>
        )}
      </Sidebar>
      )
    </div>
  );
}

export default Offcanva;
