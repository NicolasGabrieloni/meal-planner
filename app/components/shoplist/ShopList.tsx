"use client";

import React, { useEffect, useState } from "react";
import { Recetas, Stock } from "../ApiCalls";
import { recipe, stock } from "../Types";
import { useMyContext } from "../calendar/Context";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Shop() {
  const [stock, setStock] = useState<stock[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const [ingredientesFaltantes, setIngredientesFaltantes] = useState<string[]>(
    [],
  );
  const { selectedRecipes } = useMyContext();
  console.log(selectedRecipes);

  useEffect(() => {
    Promise.all([Recetas(), Stock()]).then(([recipes, stockData]) => {
      setRecetas(recipes);
      setStock(stockData);
    });
  }, []);
  const stockNormalized = stock.map((food) => normalizeText(food.name_food));

  const recetasSeleccionadas = recetas.filter((receta) =>
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

  return (
    <div className="ml-8 w-full text-center">
      <h2 className="font-bold">ShopList</h2>
      <button
        onClick={() =>
          obtenerIngredientesFaltantes(recetasSeleccionadas, stockNormalized)
        }
        className=" text-md w-full border-b border-[#00785C] p-4 text-[#00785C] lg:border-b-2 lg:text-xl"
      >
        Generar lista de compras
      </button>
      <div className="mx-auto mt-3 w-3/5 flex-row items-center space-x-4 rounded-lg border border-[#000000] bg-[#E9FFEB] p-5 pt-8 text-center shadow-xl lg:min-h-[150px]">
        <h3 className="text-lg font-bold">Ingredientes Faltantes:</h3>
        <ul className="flex flex-col justify-start">
          {ingredientesFaltantes.map((ingrediente, index) => (
            <li key={index} className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {ingrediente}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Shop;
