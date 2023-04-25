export class AddRecipeDto {
  _id: string;
  title: string;
  description: string;
  images: string[];
  categories: string[];
  tags: string[];
  ingredients: string[];
  cook_time: number;
  servings: number;
  created_by: string;
  created_date: Date;
}
