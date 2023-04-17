import { model, Schema } from "mongoose";
import { TagType } from "../utils/types";

const tagSchema = new Schema<TagType>({
  _id: String,
  name: String,
});

const TagModel = model<TagType>("tag", tagSchema);

export default TagModel;
