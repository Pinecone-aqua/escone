import mongoose from "mongoose";

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
  created_by: mongoose.SchemaDefinitionProperty<string>;
  images: string[];
  title: string;
  description: string;
  ingredients: mongoose.SchemaDefinitionProperty<string[]>;
  categories: mongoose.SchemaDefinitionProperty<string[]>;
  tags: mongoose.SchemaDefinitionProperty<string[]>;
  servings: number;
  cook_time: number;
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
  quintity: number;
  measure: string;
  picture: string;
}

export interface ReviewType {
  _id: string;
  created_by: mongoose.SchemaDefinitionProperty<string>;
  recipe_id: string;
  rate: number;
  content: string;
  created_date: Date;
}

export interface TagType {
  _id: string;
  name: string;
}
