import { model, Schema } from "mongoose";
import { UserType } from "../utils/types";

const UserSchema = new Schema<UserType>({
  username: String,
  image: { type: String, required: false },
  email: String,
  role: Boolean,
  favorites: [String],
  created_date: Date,
});

const UserModel = model<UserType>("user", UserSchema);

export default UserModel;
