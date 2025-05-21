import axios from 'axios';
import { CategoriesAPIResponseSchema } from '../utils/recipes-schema';

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