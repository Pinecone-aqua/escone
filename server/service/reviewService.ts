import { ParsedQs } from "qs";
import ReviewModel from "../model/reviewModel";

export async function getReviews(
  id: string | string[] | ParsedQs | ParsedQs[] | undefined
) {
  const result = await ReviewModel.find({ recipe_id: id }).populate({
    path: "created_by",
    select: "username _id image",
  });
  return result;
}
