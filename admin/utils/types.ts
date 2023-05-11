import { ReactNode } from "react";

export type PropType = {
  children: ReactNode;
};

export interface UserType {
  _id: string;
  username: string;
  image?: string;
  email: string;
  password: string;
  role: boolean;
  favorites?: string[];
  created_date: Date;
}
export enum ProcessStatus {
  Pending = "pending",
  Approve = "approve",
  Deny = "deny",
}
export interface RecipeType {
  status: ProcessStatus;
  _id: string;
  created_by: UserType;
  images: string[];
  title: string;
  description: string;
  ingredients: IngredientType[];
  categories: CategoryType[];
  tags: TagType[];
  instructions: { [x: number]: string }[];
  servings: number;
  cook_time: number;
  created_date: Date;
  rate: { rating: number; vote: number };
}
export interface CategoryType {
  _id: string;
  name: string;
  picture: string;
}
export interface IngredientType {
  name: string;
  quantity: number;
  measure: string;
}

export interface ReviewType {
  _id: string;
  created_by: string;
  recipe_id: string;
  rate: number;
  content: string;
  created_date: Date;
}

export interface TagType {
  _id: string;
  name: string;
}
