import { ReactNode } from "react";

export type PropType = {
  children: ReactNode;
};

export interface UserType {
  _id: string;
  username: string;
  image?: string;
  role: boolean;
  email: string;
  password: string;
  favorites?: string[];
  created_date: Date;
}

export interface RecipeType {
  _id: string;
  title: string;
  description: string;
  images: string[];
  ingredients: string[];
  categories: string[];
  tags: string[];
  servings: number;
  cook_time: number;
  created_by: string;
  created_date: Date;
}

export interface CategoryType {
  _id: string;
  name: string;
  picture: string;
}
export interface IngredientType {
  _id: string;
  name: string;
  picture: string;
  quantity: number;
  measure: string;
}

export interface ReviewType {
  _id: string;
  recipe_id: string;
  rate: number;
  content: string;
  created_by: string;
  created_date: Date;
}

export interface TagType {
  _id: string;
  name: string;
}
