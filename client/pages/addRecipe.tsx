/* eslint-disable camelcase */
import Login from "@/components/common/Login";
import Ingredient from "@/components/offcanva/Ingredient";
import Instructions from "@/components/offcanva/Instructions";
import { useUser } from "@/context/userContext";
import { CategoryType, RecipeType, TagType } from "@/utils/types";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
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
    const token = Cookies.get("token");
    setAdding(true);
    const recipeFormData = new FormData();

    if (images.length > 0) {
      images.forEach((image) => recipeFormData.append("images", image));
    }

    recipeFormData.append("body", JSON.stringify(newRecipe));
    axios
      .patch(
        `${process.env.BACK_END_URL}/recipe/upload/${recipe?._id}`,
        recipeFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

    axios
      .post(`${process.env.BACK_END_URL}/recipe/create`, recipeFormData)
      .then(() => {
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
  }

  return (
    <div className="add">
      <div className="container">
        {!user && <Login show={true} />}
        <div className="add-head">
          <h2>Add recipe</h2>
          <p>
            post by
            <span>{user?.username}</span>
          </p>
        </div>
        <form>
          <div className="title">
            <label htmlFor="title">title</label>
            <input
              defaultValue={newRecipe.title}
              type="text"
              onChange={(e) => {
                newRecipe.title = e.target.value;
                setNewRecipe({ ...newRecipe });
              }}
            />
          </div>
          <div className="images">
            <label htmlFor="image">upload image</label>
            <div className="images-gallery">
              {newRecipe.images.map(
                (img: string | undefined, index: number) => (
                  <picture key={index}>
                    <img src={img} alt="" />
                    <div
                      className="remove "
                      onClick={() => removeRecipeImage(index)}
                    >
                      <IoMdCloseCircleOutline />
                    </div>
                  </picture>
                )
              )}

              {images.map((img, index) => (
                <picture key={index}>
                  <img src={URL.createObjectURL(img)} alt="" />
                  <div className="remove " onClick={() => removeImage(index)}>
                    <IoMdCloseCircleOutline />
                  </div>
                </picture>
              ))}
            </div>

            <input className="uploader" type="file" onChange={uploadHandler} />
          </div>
          <div className="serving">
            <label htmlFor="serving">serving</label>
            <input
              type="number"
              defaultValue={newRecipe.servings}
              className="w-16 border border-black rounded-md ps-3"
              onChange={(e) => {
                newRecipe.servings = Number(e.target.value);
                setNewRecipe({ ...newRecipe });
              }}
            />
          </div>
          <div className="cooktime">
            <label htmlFor="cooktime">cooktime (min)</label>
            <input
              type="number"
              defaultValue={newRecipe.cook_time}
              className="w-16 border border-black rounded-md ps-3"
              onChange={(e) => {
                newRecipe.cook_time = Number(e.target.value);
                setNewRecipe({ ...newRecipe });
              }}
            />
          </div>
          <div className="category">
            <label htmlFor="category">category</label>
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
              <select onChange={addCategoryHandler}>
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
          </div>
          <div className="tags">
            <label htmlFor="tags">tags</label>
            <div className="flex flex-wrap gap-3">
              <select onChange={addTagHandler}>
                <option defaultChecked>choose tags</option>
                {tags.map((tag) => {
                  if (
                    !newRecipe.tags.some(
                      (i: { _id: string }) => i._id == tag._id
                    )
                  ) {
                    return (
                      <option value={[tag._id, tag.name]} key={tag._id}>
                        {tag.name}
                      </option>
                    );
                  }
                })}
              </select>
              
              {newRecipe.tags.map((tag: TagType) => (
                <div
                  className="tag relative  group "
                  key={tag._id}
                >
                  <p>{tag.name}</p>
                  <div
                    className="remove absolute top-[-10px] right-[-10px] bg-gray-100 px-2 hover:bg-red-300 text-sm border rounded-full group-hover:block hidden"
                    onClick={() => removeTagHandler(tag._id)}
                  >
                    x
                  </div>
                </div>
              ))}
            </div>
          </div>
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
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: any) {
  const id = context.query.recipeId;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recipe: any;
  const catResult = await axios.get(`${process.env.BACK_END_URL}/category/all`);
  const tagResult = await axios.get(`${process.env.BACK_END_URL}/tag/all`);

  const categories = catResult.data;
  const tag = tagResult.data;
  if (id) {
    const recipeResult = await axios.get(
      `${process.env.BACK_END_URL}/recipe/${id}`
    );
    recipe = recipeResult.data;
    return {
      props: { categories, tag, recipe },
    };
  }

  return {
    props: { categories, tag },
  };
}
