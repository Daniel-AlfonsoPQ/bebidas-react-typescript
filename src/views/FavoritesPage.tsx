import { useMemo } from "react";
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritesPage() {
  const { favorites } = useAppStore();
  const hasFavorites = useMemo(() => favorites.length, [favorites])
  return (
    <>
      <div className="container mx-auto max-w-screen-lg">
        <h1 className="text-6xl font-extrabold">Favoritos</h1>

        {hasFavorites ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-10">
          {favorites.map( drink => {
            return (
              <DrinkCard
                key={drink.idDrink}
                drink={drink}
              />
            );
          })}
        </div>
        ) : (
          <p className="my-10 text-center text-2xl">No tienes favoritos, empieza a buscar tus recetas!</p>
        )
        }
      </div>
    </>
  );
}
