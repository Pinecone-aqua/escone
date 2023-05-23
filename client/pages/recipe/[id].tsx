/* eslint-disable camelcase */
import PopularSection from "@/components/home/Popular";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeType, ReviewType } from "@/utils/types";
import { ScrollPanel } from "primereact/scrollpanel";
import { toast } from "react-toastify";
import { useUser } from "@/context/userContext";

import { ConfirmDialog } from "primereact/confirmdialog";
import Review from "@/components/subs/Review";
import { dateFormat, starPrinter } from "@/utils/functions";
import Cookies from "js-cookie";

function Recipe({
  recipe,
  review,
  recipes,
}: {
  recipes: RecipeType[];
  recipe: RecipeType;
  review: ReviewType[];
}) {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const { user } = useUser();
  const [newRate, setNewRate] = useState(0);
  const [content, setContent] = useState("");
  const token = Cookies.get("token");

  const rates = review.map((rev) => rev.rate);
  useEffect(() => {
    setReviews(review);
  }, [review]);
  function Avg(array: number[]) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  }

  function reviewHandler() {
    // eslint-disable-next-line camelcase, @typescript-eslint/no-explicit-any
    const newReview: any = {
      created_by: {
        _id: user?._id,
        username: user?.username,
        image: user?.image,
      },
      recipe_id: recipe._id,
      rate: newRate,
      content: content,
      created_date: dayjs().format(),
    };
    if (!user) {
      toast.error("Та нэвтрэх хэрэгтэй");
    } else if (newRate === 0) {
      toast.error("Та үнэлгээ өгөөгүй байна");
    } else if (content === "") {
      toast.error("Та сэтгэгдэл бичээгүй байна");
    } else {
      setReviews([...reviews, newReview]);
      console.log(newReview);
      const reqReview = { ...newReview };
      reqReview.created_by = user._id;
      console.log(reqReview);
      axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/review/create`,
        newReview
      );
      toast.success("Сэтгэгдэл бичсэнд баярлалаа");
      setContent("");
      setNewRate(0);
    }
  }
  function deleteReviewHandler(id: string) {
    const newviews = reviews.filter((review) => review._id != id);
    setReviews([...newviews]);
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACK_END_URL}/review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => toast.success("Үнэлгээ устгагдлаа."));
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
              {starPrinter({ rate: Avg(rates) })}
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
            <h3>Хоолны орц:</h3>
            <ScrollPanel style={{ width: "300px", height: "280px" }}>
              <div className="ingredients">
                {recipe.ingredients.map((ing, index) => (
                  <p className="ingredient" key={index}>
                    {ing.quantity}
                    <span>{ing.measure}</span>
                    {ing.name}
                  </p>
                ))}
              </div>
            </ScrollPanel>
          </div>
        </div>
      </div>

      <div className="recipe-methods">
        <div className="recipe-methods-body">
          <h2>Алхамууд:</h2>
          <div className="steps">
            {recipe.instructions.map((mtd, index) => (
              <div key={index} className="step">
                <h4>{Object.keys(mtd)}-р алхам</h4>
                <p>{Object.values(mtd)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PopularSection recipes={recipes} />

      <div className="recipe-reviews">
        <h2>Үнэлгээ</h2>
        <ConfirmDialog />

        <div className="recipe-reviews-review">
          {reviews.map((rev, index) => (
            <Review
              key={index}
              review={rev}
              deleteReviewHandler={deleteReviewHandler}
            />
          ))}
        </div>
      </div>

      <div className="recipe-review-write">
        <h2>Үнэлгээ өгөх</h2>
        <div className="review-stars">
          {starPrinter({
            rate: newRate,
            onClick: (e: React.MouseEvent<HTMLInputElement>) => {
              setNewRate(Number(e.currentTarget.id));
            },
          })}
        </div>

        <div className="input">
          <textarea
            name="review"
            placeholder="Сэтгэгдэл бичих хэсэг"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit" onClick={reviewHandler}>
            Илгээх
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

export async function getStaticPaths() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/ids`
  );
  const recipes = result.data;

  const paths = recipes.map((recipe: RecipeType) => ({
    params: { id: recipe._id },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { id: string } }) {
  const id = context.params.id;
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/${id}`
  );
  const reviewResult = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/review/recipe/${id}`
  );
  const resultRecipes = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_END_URL}/recipe/recipes?status=approve`
  );
  const recipe = result.data;
  const recipes = resultRecipes.data;
  const review = reviewResult.data;
  return {
    props: { recipe, review, recipes },
  };
}
