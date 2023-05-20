/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";

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
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/upload/${recipe?._id}`,
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
      .post(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/create`,
        recipeFormData
      )
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
          <h2>Жор нэмэх</h2>
          <p>
            нийтлэсэн:
            <span>{user?.username}</span>
          </p>
        </div>
        <form>
          <div className="title">
            <label htmlFor="title">гарчиг</label>
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
            <label htmlFor="images">Зураг оруулах</label>
            <div className="images-list">
              {newRecipe.images.map(
                (img: string | undefined, index: number) => (
                  <picture key={index}>
                    <img src={img} alt="recipe" />
                    <button onClick={() => removeRecipeImage(index)}>
                      <CiCircleRemove />
                    </button>
                  </picture>
                )
              )}
              {images.map((img, index) => (
                <picture key={index}>
                  <img src={URL.createObjectURL(img)} alt="remove" />
                  <button onClick={() => removeImage(index)}>
                    <CiCircleRemove />
                  </button>
                </picture>
              ))}
            </div>

            <input className="uploader" type="file" onChange={uploadHandler} />
          </div>
          <div className="category">
            <label htmlFor="category">категори</label>
            <div className="category-list">
              <select onChange={addCategoryHandler}>
                <option defaultChecked>категори сонгох</option>
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
              {newRecipe.categories.map((cat: CategoryType) => (
                <div className="category-list-item" key={cat._id}>
                  <p>{cat.name}</p>
                  <button onClick={() => removeCategoryHandler(cat._id)}>
                    <CiCircleRemove />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="tags">
            <label htmlFor="tags">Ангилал</label>
            <div className="tags-list">
              <select onChange={addTagHandler}>
                <option defaultChecked>ангилал нэмэх</option>
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
                <div className="tags-list-item" key={tag._id}>
                  <p>{tag.name}</p>
                  <button onClick={() => removeTagHandler(tag._id)}>
                    <CiCircleRemove />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="serving">
            <label htmlFor="serving">Порц</label>
            <input
              type="number"
              defaultValue={newRecipe.servings}
              onChange={(e) => {
                newRecipe.servings = Number(e.target.value);
                setNewRecipe({ ...newRecipe });
              }}
            />
          </div>
          <div className="cooktime">
            <label htmlFor="cooktime">Бэлтгэх хугацаа (минут)</label>
            <input
              type="number"
              defaultValue={newRecipe.cook_time}
              onChange={(e) => {
                newRecipe.cook_time = Number(e.target.value);
                setNewRecipe({ ...newRecipe });
              }}
            />
          </div>

          <div className="description">
            <label htmlFor="description">Товч тайлбар</label>
            <textarea
              defaultValue={newRecipe.description}
              onChange={(e) => {
                newRecipe.description = e.target.value;
                setNewRecipe({ ...newRecipe });
              }}
            />
          </div>

          <Ingredient newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
          <Instructions newRecipe={newRecipe} setNewRecipe={setNewRecipe} />

          <div className="post">
            <button onClick={recipe ? updateRecipe : createRecipe}>
              Нийтлэх
            </button>
          </div>
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
  const catResult = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/category/all`
  );
  const tagResult = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/tag/all`
  );

  const categories = catResult.data;
  const tag = tagResult.data;
  if (id) {
    const recipeResult = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/${id}`
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
