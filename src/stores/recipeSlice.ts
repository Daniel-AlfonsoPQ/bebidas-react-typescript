import type { StateCreator } from "zustand"
import { getCategories, getDetailDrink, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, DrinkDetail, Recipe, SearchFilter } from "../types"


export type RecipiesSliceType = {
    categories: Categories
    recipes: Recipe
    selectedRecipe: DrinkDetail
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipiesSlice : StateCreator<RecipiesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    recipes: {
        drinks: []
    },
    selectedRecipe: {} as DrinkDetail,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({ categories })
    },
    searchRecipes: async (filters) => {
        const recipes = await getRecipes(filters)
        set({ recipes })
    },
    selectRecipe: async (id) => {
        const drink = await getDetailDrink(id)
        set({ selectedRecipe: drink })
        set({ modal: true })
    },
    closeModal: () => {
        set({ modal: false,
            selectedRecipe: {} as DrinkDetail
         })
    }
})