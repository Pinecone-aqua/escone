import UserModel from "../model/userModel";

export async function getUsers() {
  const result = UserModel.find();
  return result;
}
