import type { StateCreator } from 'zustand'
import type { DrinkDetail } from '../types'

export type FavoritesSliceType = {
    favorites: DrinkDetail[]
    handleClickFavorite: (drink: DrinkDetail) => void
    favoriteExists: (id: DrinkDetail['idDrink']) => boolean
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (drink) => {
        if(get().favoriteExists(drink.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter((favorite) => favorite.idDrink !== drink.idDrink)
            }))
        }
        else {
            set((state) => ({
                favorites: [...state.favorites, drink]
            }))
        }
    },
    favoriteExists: (id) => {
        return get().favorites.some((favorite) => favorite.idDrink === id)
    }
})