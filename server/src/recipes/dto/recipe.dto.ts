import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class RecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray({ each: true })
  @IsNotEmpty()
  images: string[];

  @IsArray({ each: true })
  @IsNotEmpty()
  categories: string[];

  @IsArray({ each: true })
  @IsNotEmpty()
  tags: string[];

  @IsArray({ each: true })
  @IsNotEmpty()
  ingredients: string[];

  @IsNumber()
  @IsNotEmpty()
  cook_time: number;

  @IsNumber()
  @IsNotEmpty()
  servings: number;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsDate()
  @IsNotEmpty()
  created_date: Date;

  @IsString()
  @IsNotEmpty()
  status: string;
}
