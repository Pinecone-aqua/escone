import { isObjectIdOrHexString, model, Schema } from "mongoose";
import { UserType } from "../utils/types";

const UserSchema = new Schema<UserType>({
  _id: String,
  username: String,
  image: { type: String, required: false },
  password: String,
  email: String,
  role: Boolean,
  favorites: [String],
  created_date: Date,
});

const UserModel = model<UserType>("user", UserSchema);

export default UserModel;
