import axios from 'axios';
import { CategoriesAPIResponseSchema, drinkDetailSchema, recipesSchema } from '../utils/recipes-schema';
import type { Drink, SearchFilter } from '../types';

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    try {
        const {data} = await axios.get(url);
        const response = CategoriesAPIResponseSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function getRecipes(filters: SearchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}&c=${filters.category}`;
    try {
        const {data} = await axios.get(url);
        const response = recipesSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    }
    catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

export async function getDetailDrink(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
        const {data} = await axios.get(url);
        const response = drinkDetailSchema.safeParse(data.drinks[0]);
        if (response.success) {
            return response.data;
        }
    }
    catch (error) {
        console.error('Error fetching recipe details:', error);
        throw error;
    }
}