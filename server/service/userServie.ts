import UserModel from "../model/userModel";
import { UserType } from "../utils/types";

export async function getUsers(): Promise<UserType[]> {
  const result = UserModel.find();
  return result;
}

export async function getUser(id: string): Promise<UserType | null> {
  console.log(id);
  const result = await UserModel.findOne({ _id: id });
  console.log(result, "is data");
  return result;
}

export async function createUser(newUser: any) {
  const result = await UserModel.insertMany({ ...newUser });
  return result;
}

export async function deleteUser(id: string) {
  console.log(id);
  const result = await UserModel.deleteOne({ _id: id });
  return result;
}

export async function updateUser() {}
