import type { StateCreator } from 'zustand'
import type { DrinkDetail } from '../types'
import { createRecipiesSlice, type RecipiesSliceType } from './recipeSlice'
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice'

export type FavoritesSliceType = {
    favorites: DrinkDetail[]
    handleClickFavorite: (drink: DrinkDetail) => void
    favoriteExists: (id: DrinkDetail['idDrink']) => boolean
    loadFavorites: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipiesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (drink) => {
        if(get().favoriteExists(drink.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter((favorite) => favorite.idDrink !== drink.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification(
                {text: 'Se eliminó de favoritos', error: false})
        }
        else {
            set((state) => ({
                favorites: [...state.favorites, drink]
            }))
            createNotificationSlice(set, get, api).showNotification(
                {text: 'Se agregó a favoritos', error: false})
        }
        createRecipiesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExists: (id) => {
        return get().favorites.some((favorite) => favorite.idDrink === id)
    },
    loadFavorites: () => {
        const favorites = localStorage.getItem('favorites')
        if (favorites) {
            set({ favorites: JSON.parse(favorites) })
        }
    }
})