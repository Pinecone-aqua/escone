/* eslint-disable camelcase */
import PopularSection from "@/components/home/Popular";
import dayjs from "dayjs";
import React, { useState } from "react";
import axios from "axios";
import { RecipeType, ReviewType } from "@/utils/types";
import { toast } from "react-toastify";
import { useUser } from "@/context/userContext";

import { ConfirmDialog } from "primereact/confirmdialog";
import Review from "@/components/recipe/Review";
import { dateFormat, starPrinter } from "@/utils/functions";

function Recipe({
  recipe,
  review,
  recipes,
}: {
  recipes: RecipeType[];
  recipe: RecipeType;
  review: ReviewType[];
}) {
  const { user } = useUser();
  const [newRate, setNewRate] = useState(0);
  const [content, setContent] = useState("");

  const rates = review.map((rev) => rev.rate);

  function Avg(array: number[]) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  }

  function reviewHandler() {
    // eslint-disable-next-line camelcase
    const newReview = {
      created_by: user?._id,
      recipe_id: recipe._id,
      rate: newRate,
      content: content,
      created_date: dayjs().format(),
    };
    console.log(newReview);
    if (newRate === 0) {
      toast.error("You have not rated");
    } else if (content === "") {
      toast.error("You have not written a review");
    } else {
      axios.post(`${process.env.BACK_END_URL}/review/create`, newReview);
      toast.success("You have written a review");
      setContent("");
      setNewRate(0);
    }
  }

  return (
    <div className="recipe container ">
      <div className="recipe-body">
        <picture>
          <img src={recipe.images[0]} alt="" />
        </picture>
        <div className="recipe-body-content">
          <div className="body-item">
            <div className="head">
              <h1>{recipe.title}</h1>
              <p>{dateFormat(recipe.created_date)}</p>
            </div>
            <div className="review-stars ">
              {starPrinter(Avg(rates))}
              <p>{Avg(rates).toFixed(1)}/5</p>
            </div>
            <div className="tags">
              {recipe.tags.map((tag, index) => (
                <div className="tag" key={index}>
                  {tag.name}
                </div>
              ))}
            </div>
          </div>

          <div className="body-item">
            <p>{recipe.description}</p>
          </div>

          <div className="body-item">
            <h3>Ingredients</h3>
            <div className="ingredients">
              {recipe.ingredients.map((ing, index) => (
                <p className="ingredient" key={index}>
                  {ing.quantity}
                  <span>{ing.measure}</span>
                  {ing.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-methods">
        <div className="recipe-methods-body">
          <h2>Methods</h2>
          <div className="steps">
            {recipe.instructions.map((mtd, index) => (
              <div key={index} className="step">
                <h4>step {Object.keys(mtd)}</h4>
                <p>{Object.values(mtd)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PopularSection recipes={recipes} />

      <div className="recipe-reviews">
        <h2>Recipe Reviews</h2>
        <ConfirmDialog />

        <div className="recipe-reviews-review">
          {review.map((rev, index) => (
            <Review key={index} review={rev} />
          ))}
        </div>
      </div>

      <div className="recipe-review-write">
        <h2>Write a review</h2>
        <div className="review-stars">
          {starPrinter(newRate, (e) => setNewRate(Number(e.target.id)))}
        </div>

        <div className="input">
          <textarea
            name="review"
            placeholder="Your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" onClick={reviewHandler}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

export async function getStaticPaths() {
  const result = await axios.get(`${process.env.BACK_END_URL}/recipe/recipes`);
  const recipes = result.data;

  const paths = recipes.map((recipe: RecipeType) => ({
    params: { id: recipe._id },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const id = context.params.id;
  const result = await axios.get(`${process.env.BACK_END_URL}/recipe/${id}`);
  const reviewResult = await axios.get(
    `${process.env.BACK_END_URL}/review/recipe/${id}`
  );
  const resultRecipes = await axios.get(
    `${process.env.BACK_END_URL}/recipe/recipes?status=approve`
  );
  const recipe = result.data;
  const recipes = resultRecipes.data;
  const review = reviewResult.data;
  return {
    props: { recipe, review, recipes },
  };
}
