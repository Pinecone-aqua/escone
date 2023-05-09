import React, { ReactNode } from "react";

export type PropType = {
  children: ReactNode;
};
export type recipeContextType = {
  recipes: RecipeType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
  recipe: RecipeType | undefined;
  setRecipe: React.Dispatch<React.SetStateAction<RecipeType | undefined>>;
  finish: boolean;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
};
export type userContextType = {
  user: UserType | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>;
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type reviewContextType = {
  review: ReviewType[] | undefined;
  setReview: React.Dispatch<React.SetStateAction<ReviewType[] | undefined>>;
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

export interface RecipeType {
  _id: string;
  created_by: string;
  images: string[];
  title: string;
  description: string;
  ingredients: string[] | IngredientType[];
  categories: string[];
  tags: string[];
  method: { ["number"]: string }[];
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
  _id: string;
  name: string;
  quintity: number;
  measure: string;
  picture: string;
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
