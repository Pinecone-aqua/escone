import React from "react";

export type PropType = {
  children: React.ReactElement;
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
  status: ProcessStatus;
  _id: string;
  created_by: UserType;
  images: string[];
  title: string;
  description: string;
  ingredients: IngredientType[];
  categories: CategoryType[];
  tags: TagType[];
  instructions: RecipeInstruction[];
  servings: number;
  cook_time: number;
  created_date: Date;
  rate: { rating: number; vote: number };
}

export interface IngredientType {
  name: string;
  quantity: number;
  measure: string;
}

export interface CategoryType {
  _id: string;
  name: string;
  picture: string;
}

export interface TagType {
  _id: string;
  name: string;
}

export interface RecipeInstruction {
  step: number;
  description: string;
}

export interface ReviewType {
  _id: string;
  created_by: UserType;
  recipe_id: string;
  rate: number;
  content: string;
  created_date: Date;
}

export enum ProcessStatus {
  Pending = "pending",
  Approve = "approve",
  Deny = "deny",
}

// TYPES of CONTEXT
export type RecipeContextType = {
  recipes: RecipeType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
  finish: boolean;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserContextType = {
  user: UserType | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserType | null | undefined>>;
  token: string | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export type ReviewContextType = {
  review: ReviewType[] | undefined;
  setReview: React.Dispatch<React.SetStateAction<ReviewType[] | undefined>>;
};
