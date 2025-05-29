import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useAppStore } from "../stores/useAppStore";
import type { DrinkDetail } from "../types";

export default function Modal() {
  const {
    modal,
    closeModal,
    selectedRecipe,
    handleClickFavorite,
    favoriteExists,
  } = useAppStore();

  const renderIngredients = () => {
    const ingredients: React.JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof DrinkDetail];
      const measure = selectedRecipe[`strMeasure${i}` as keyof DrinkDetail];

      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-sm font-normal">
            {ingredient} - {measure}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <Transition appear show={modal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-3 py-4 text-left shadow-xl transition-all w-full max-w-md">
                <h3 className="text-gray-900 text-xl font-bold mb-4 text-center">
                  {selectedRecipe.strDrink}
                </h3>

                <img
                  src={selectedRecipe.strDrinkThumb}
                  alt={`Imagen de ${selectedRecipe.strDrink}`}
                  className="w-full max-w-xs object-cover rounded-lg mx-auto mb-4"
                />

                <h4 className="text-gray-900 text-lg font-semibold mb-2">Ingredientes</h4>
                <ul className="list-disc list-inside mb-4">{renderIngredients()}</ul>

                <h4 className="text-gray-900 text-lg font-semibold mb-2">Instrucciones</h4>
                <p className="text-sm mb-4">{selectedRecipe.strInstructions}</p>

                <div className="mt-4 flex flex-col sm:flex-row justify-between gap-2">
                  <button
                    type="button"
                    className="w-full rounded bg-gray-600 py-2 text-sm font-bold uppercase text-white hover:bg-gray-500 transition-colors"
                    onClick={closeModal}
                  >
                    Cerrar
                  </button>

                  <button
                    type="button"
                    className="w-full rounded bg-orange-600 py-2 text-sm font-bold uppercase text-white hover:bg-orange-500 transition-colors"
                    onClick={() => handleClickFavorite(selectedRecipe)}
                  >
                    {favoriteExists(selectedRecipe.idDrink)
                      ? "Eliminar Favorito"
                      : "Agregar a favoritos"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
