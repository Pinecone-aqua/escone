/* eslint-disable camelcase */
import Login from "@/components/common/Login";
import Ingredient from "@/components/offcanva/Ingredient";
import Instructions from "@/components/offcanva/Instructions";
import { useUser } from "@/context/userContext";
import { CategoryType, RecipeType, TagType } from "@/utils/types";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

export default function AddRecipe({
  categories,
  tag,
  recipe,
}: {
  categories: CategoryType[];
  tag: TagType[];
  recipe?: RecipeType;
}) {
  const { user } = useUser();
  const emtpyObject = {
    created_by: user?._id,
    images: [],
    title: "",
    description: "",
    ingredients: [],
    categories: [],
    tags: [],
    instructions: [],
    servings: 0,
    cook_time: 0,
    created_date: "",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [newRecipe, setNewRecipe] = useState<any>(emtpyObject);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [adding, setAdding] = useState<boolean>(false);

  useEffect(() => {
    setCategory(categories);
    setTags(tag);
    if (recipe) {
      setNewRecipe(recipe);
    }
  }, [categories, recipe, tag]);

  function updateRecipe() {
    setAdding(true);
    const recipeFormData = new FormData();

    if (images.length > 0) {
      images.forEach((image) => recipeFormData.append("images", image));
    }

    recipeFormData.append("body", JSON.stringify(newRecipe));
    axios
      .patch(
        `http://localhost:3030/recipes/upload/${recipe?._id}`,
        recipeFormData
      )
      .then(() => {
        toast.success("succes recipe updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  function createRecipe() {
    if (
      newRecipe.title === "" ||
      newRecipe.description === "" ||
      newRecipe.ingredients.length == 0 ||
      newRecipe.categories.length == 0 ||
      newRecipe.tags.length == 0 ||
      newRecipe.instructions.length == 0 ||
      newRecipe.servings === 0 ||
      newRecipe.cook_time === 0
    ) {
      toast.error("information is missing", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    setAdding(true);
    const recipeFormData = new FormData();
    newRecipe.created_by = user?._id;
    newRecipe.created_date = dayjs().format();
    if (images.length > 0) {
      images.forEach((image) => recipeFormData.append("images", image));
    }
    recipeFormData.append("body", JSON.stringify(newRecipe));

    axios.post(`http://localhost:3030/recipes/add`, recipeFormData).then(() => {
      toast.success("succes recipe add", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addCategoryHandler(e: any) {
    const newCategoryArr = e.target.value.split(",");
    const newCategoryObject = {
      _id: newCategoryArr[0],
      name: newCategoryArr[1],
      picture: newCategoryArr[2],
    };
    newRecipe.categories = [...newRecipe.categories, newCategoryObject];
    setNewRecipe({ ...newRecipe });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function addTagHandler(e: any) {
    const newTag = e.target.value.split(",");
    const newTagObject = {
      _id: newTag[0],
      name: newTag[1],
    };
    const newTagArr = [...newRecipe.tags, newTagObject];
    newRecipe.tags = newTagArr;
    setNewRecipe({ ...newRecipe });
  }
  function removeTagHandler(id: string) {
    const updatedTag = newRecipe.tags.filter(
      (tag: { _id: string }) => tag._id !== id
    );
    newRecipe.tags = updatedTag;
    setNewRecipe({ ...newRecipe });
  }

  function removeCategoryHandler(id: string) {
    const updatedCategory = newRecipe.categories.filter(
      (tag: { _id: string }) => tag._id !== id
    );
    newRecipe.categories = updatedCategory;
    setNewRecipe({ ...newRecipe });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function uploadHandler(e: any) {
    const image: FileList = e.target.files;
    for (let i = 0; i < image.length; i++) {
      images.push(image[i]);
    }
    setImages([...images]);
  }
  function removeImage(index: number) {
    images.splice(index, 1);

    setImages([...images]);
  }
  function removeRecipeImage(index: number) {
    newRecipe.images.splice(index, 1);
    setNewRecipe({ ...newRecipe });
    // setRecipeImages([...recipeImages]);
  }

  return (
    <div className="container mb-20 relative">
      {!user && <Login show={true} />}
      <form className="px-10 py-5 flex flex-col gap-5">
        <div className=" flex w-full justify-between">
          <p className="flex gap-2">
            created by
            <span className="text-xl font-semibold">{user?.username}</span>
          </p>
        </div>
        <label className="flex flex-col gap-3">
          <p className="text-xl font-semi">Title</p>
          <input
            defaultValue={newRecipe.title}
            type="text"
            className="border w-full px-3 py-2 rounded-xl"
            onChange={(e) => {
              newRecipe.title = e.target.value;
              setNewRecipe({ ...newRecipe });
            }}
          />
        </label>
        <div className="flex flex-col gap-3">
          <p className="text-xl font-semi">Image upload</p>
          <div className="flex flex-wrap justify-between items-center">
            {newRecipe.images.map((img: string | undefined, index: number) => (
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
                <img src={URL.createObjectURL(img)} alt="" className="w-40" />
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
        <div className="w-full flex items-center gap-10">
          <label className="flex items-center gap-3">
            <p>Servings</p>
            <input
              type="number"
              defaultValue={newRecipe.servings}
              className="w-16 border border-black rounded-md ps-3"
              onChange={(e) => {
                newRecipe.servings = Number(e.target.value);
                setNewRecipe({ ...newRecipe });
              }}
            />
          </label>
          <label className="flex items-center gap-3">
            <p>Cook time (min)</p>
            <input
              type="number"
              defaultValue={newRecipe.cook_time}
              className="w-16 border border-black rounded-md ps-3"
              onChange={(e) => {
                newRecipe.cook_time = Number(e.target.value);
                setNewRecipe({ ...newRecipe });
              }}
            />
          </label>
        </div>
        <label>
          <p>Categories</p>
          <div className="flex flex-wrap gap-3">
            {newRecipe.categories.map((cat: CategoryType) => (
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
              {category.map((cat) => {
                if (
                  !newRecipe.categories.some(
                    (i: { _id: string }) => i._id == cat._id
                  )
                ) {
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
            {newRecipe.tags.map((tag: TagType) => (
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
              {tags.map((tag) => {
                if (
                  !newRecipe.tags.some((i: { _id: string }) => i._id == tag._id)
                ) {
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
            defaultValue={newRecipe.description}
            onChange={(e) => {
              newRecipe.description = e.target.value;
              setNewRecipe({ ...newRecipe });
            }}
          />
        </label>
        <Ingredient newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        <Instructions newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
        .
        <input
          type="button"
          value={`${
            recipe
              ? `update recipe ${adding ? `O` : ""}`
              : `add recipe ${adding ? `O` : ""}`
          }`}
          disabled={adding}
          onClick={recipe ? updateRecipe : createRecipe}
          className=" sticky w-40  bottom-10 px-5 py-3 border border-green-700 bg-green-500 text-green-950 rounded-lg "
        />
      </form>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const id = context.query.recipeId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recipe: any;
  const catResult = await axios.get(`http://localhost:3030/category/all`);
  const tagResult = await axios.get(`http://localhost:3030/tag/all`);

  const categories = catResult.data;
  const tag = tagResult.data;
  if (id) {
    const recipeResult = await axios.get(`http://localhost:3030/recipes/${id}`);
    recipe = recipeResult.data;
    return {
      props: { categories, tag, recipe },
    };
  }

  return {
    props: { categories, tag },
  };
}
