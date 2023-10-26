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

  const selectedRecipes: string[] = [
    "Milanesa a la Napolitana",
    "Asado",
    "Matambre a la Pizza",
    "Choripán",
  ];
  const { weekMeals } = useMyContext();

  // const recipeNames = Object.values(weekMeals).flatMap((meals) =>
  //   Object.values(meals),
  // );
  // console.log(recipeNames);

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
    <div className="ml-52 w-full text-center">
      <h2 className="font-bold">ShopList</h2>
      <button
        onClick={() =>
          obtenerIngredientesFaltantes(recetasSeleccionadas, stockNormalized)
        }
        className="mt-12 font-bold"
      >
        generar lista de compras
      </button>
      <div>
        <h3>Ingredientes Faltantes:</h3>
        <ul>
          {ingredientesFaltantes.map((ingrediente, index) => (
            <li key={index}>{ingrediente}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Shop;
