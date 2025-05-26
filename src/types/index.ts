import {z } from 'zod';
import { CategoriesAPIResponseSchema, drinkDetailSchema, recipeSchema, recipesSchema, searchFilterSchema } from '../utils/recipes-schema';

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilter = z.infer<typeof searchFilterSchema>
export type Recipe = z.infer<typeof recipesSchema>
export type Drink = z.infer<typeof recipeSchema>
export type DrinkDetail = z.infer<typeof drinkDetailSchema>