"use client";
import React, { useEffect, useState } from "react";
import { Recetas, Stock, WeekMealsById } from "../ApiCalls";
import { recipe, stock } from "../Types";
import { DayMeals, WeekMeals } from "@/Context";
import { useSession } from "next-auth/react";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Shop() {
  const [stock, setStock] = useState<stock[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<recipe[]>([]);
  const [ingredientesFaltantes, setIngredientesFaltantes] = useState<string[]>(
    [],
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  useEffect(() => {
    Promise.all([Recetas(), Stock()]).then(([recipes, stockData]) => {
      setRecetas(recipes);
      setStock(stockData);
      setDataLoaded(true);
    });
  }, []);

  const WeekMealsNames = async (userId: number) => {
    try {
      const res = await WeekMealsById(userId);
      const results = res;
      const recipesArray: string[] = [];
      results?.forEach(
        (item: {
          dayName: keyof WeekMeals;
          mealType: keyof DayMeals;
          mealName: string;
        }) => {
          const mealNames = item.mealName;
          recipesArray.push(mealNames);
        },
      );
      if (recipesArray.length > 10) {
        recipesArray.splice(0, recipesArray.length - 10);
      }
      setSelectedRecipes(recipesArray);
    } catch (error) {
      console.error("hay algo mal que no esta bien:", error);
    }
  };

  const stockNormalized = stock.map((food) => normalizeText(food.name_food));
  const recetasSeleccionadas = recetas.filter((receta: recipe) =>
    selectedRecipes.includes(receta.name),
  );

  function obtenerIngredientesFaltantes(
    recetasSeleccionadas: recipe[],
    stockNormalized: string[],
  ) {
    const ingredientesFaltantes: string[] = [];
    const ingredientesRecetas = recetasSeleccionadas
      .map((receta) => normalizeText(receta.ingredients))
      .join(",");
    const ingredientesRecetasArray = ingredientesRecetas
      .split(",")
      .map((ingrediente) => normalizeText(ingrediente.trim()));
    const uniqueIngredientesRecetasArray = Array.from(
      new Set(ingredientesRecetasArray),
    );
    for (const ingrediente of uniqueIngredientesRecetasArray) {
      if (
        !stockNormalized.includes(ingrediente) &&
        !ingredientesFaltantes.includes(ingrediente)
      ) {
        ingredientesFaltantes.push(ingrediente);
      }
    }
    setIngredientesFaltantes(ingredientesFaltantes);
  }

  const handleGenerarLista = () => {
    obtenerIngredientesFaltantes(recetasSeleccionadas, stockNormalized);
    WeekMealsNames(userId);
  };

  return (
    <div className="ml-8 w-full text-center">
      <h2 className="font-bold">ShopList</h2>
      <button
        onClick={handleGenerarLista}
        className=" text-md w-full border-b border-[#00785C] p-4 text-[#00785C] lg:border-b-2 lg:text-xl"
      >
        Calcular ingredientes faltantes
      </button>
      {!dataLoaded ? (
        <p>Cargando..</p>
      ) : (
        <div className="mx-auto mt-3 w-3/5 flex-row items-center space-x-4 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 pt-8 text-center shadow-xl lg:min-h-[150px]">
          <h3 className="text-lg font-bold">Ingredientes Faltantes:</h3>
          <ul className="flex flex-col justify-start">
            <ul className="flex flex-col justify-start">
              {ingredientesFaltantes.map((ingrediente, index) => (
                <li key={index} className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  {ingrediente}
                </li>
              ))}
            </ul>
          </ul>
        </div>
      )}
    </div>
  );
}
export default Shop;
