import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  })

  const isHome = useMemo(() => pathname === "/", [pathname]);

  const { fetchCategories, categories, searchRecipes, showNotification } = useAppStore()

  useEffect(() => {
    fetchCategories()
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSearchFilters({
      ...searchFilters,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(Object.values(searchFilters).includes('')) {
      showNotification({
        text: 'Por favor completa todos los campos',
        error: true,
      })
      return
    }

    searchRecipes(searchFilters)
  }

  return (
    <header className={isHome ? 'bg-[url(/bg.jpg)] bg-center bg-cover' : 'bg-slate-800'}>
      <div className="container mx-auto px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="logo.svg" alt="logo" className="w-32" />
          </div>

          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>

        {isHome && (
            <form 
              className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
              onSubmit={handleSubmit}
              >
                <div className="space-y-4">
                    <label 
                        htmlFor="ingredient"
                        className="block text-white text-lg font-extrabold uppercase"
                    >Nombre o Ingredientes</label>


                    <input 
                      type="text" 
                      id="ingredient" 
                      name="ingredient" 
                      className="p-3 w-full rounded-lg focus:outline-none bg-amber-50" 
                      placeholder="Nombre o Ingrediente. (Vodka, Tequila, Café"
                      onChange={handleChange}
                      value={searchFilters.ingredient}
                      />
                </div>

                <div className="space-y-4">
                    <label 
                        htmlFor="category"
                        className="block text-white text-lg font-extrabold uppercase"
                    >Categoria</label>

                    <select 
                      id="category" 
                      name="category" 
                      className="p-3 w-full rounded-lg focus:outline-none bg-amber-50"
                      onChange={handleChange}
                      value={searchFilters.category}
                      >
                        <option value="">--Selecciona una categoria--</option>
                        {categories.drinks.map(category => {
                            return (
                                <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                            )
                        })}
                    </select>                        
                </div>

                <input type="submit" value="Buscar Recetas" className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"/>
            </form>
        )}
      </div>
    </header>
  );
}
