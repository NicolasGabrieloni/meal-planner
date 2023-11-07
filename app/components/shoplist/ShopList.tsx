"use client";
import React, { useEffect, useState } from "react";
import { Recetas, Stock, WeekMealsById, stockById } from "../ApiCalls";
import { recipe, stock } from "../Types";
import { DayMeals, WeekMeals } from "@/Context";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Shop() {
  const [stock, setStock] = useState<stock[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
  const [ingredientesFaltantes, setIngredientesFaltantes] = useState<string[]>(
    [],
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  useEffect(() => {
    if (userId) {
      Promise.all([Recetas(), stockById(userId)]).then(
        ([recipes, stockData]) => {
          setRecetas(recipes);
          setStock(stockData);
          setDataLoaded(true);
        },
      );
    }
  }, [userId]);

  console.log(stock)

  const stockNormalized = stock.map((food) => normalizeText(food.name_food));
  const recetasSeleccionadas = recetas.filter((receta: recipe) =>
    selectedRecipes.includes(receta.name),
  );

  const WeekMealsNames = async (userId: number) => {
    try {
      const res = await WeekMealsById(userId);
      const results = res;
      results.splice(0, results.length - 10);

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
      setSelectedRecipes(recipesArray);
    } catch (error) {
      console.error("hay algo mal que no esta bien:", error);
    }
  };

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
    <div className="w-full space-y-4 p-4">
      <h1 className="border-b border-[#00785C] pb-1 text-xl font-medium text-[#00785C] lg:font-semibold">
        Lista de compras
      </h1>
      <div className="flex justify-center">
        <Button
          variant={"blue_outlined"}
          onClick={handleGenerarLista}
          className="w-fit border-b border-[#343434] p-4 text-sm lg:border-b-2 lg:text-base"
        >
          Generar lista de compras
        </Button>
      </div>
      {!dataLoaded ? (
        <p>Cargando..</p>
      ) : (
        <div className="mx-auto w-full flex-row items-center space-x-4 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 text-center shadow-xl lg:min-h-[150px]">
          <h3 className="text-lg font-bold">Ingredientes faltantes:</h3>
          <ul className="flex flex-col justify-start">
            <ul className="flex flex-col justify-start space-y-4">
              {ingredientesFaltantes.length === 1
                ? null
                : ingredientesFaltantes.map((ingrediente, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="before:content[''] peer relative mr-2 h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#343434] transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#00785C] checked:bg-[#00785C] checked:before:bg-[#00785C] hover:before:opacity-10"
                      />
                      <h4 className="text-lg normal-case">{ingrediente}</h4>
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
