"use client";

import { stock } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Recetas, Stock } from "../ApiCalls";
import { recipe } from "../Types";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function Shop() {
  const [inStock, setInStock] = useState<stock[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const recipesAvailable: string[] = [];

  useEffect(() => {
    Promise.all([Recetas(), Stock()]).then(([recipes, stockData]) => {
      setRecetas(recipes);
      setInStock(stockData);
    });
  }, []);

  const foodNames = inStock.map((food: stock) => normalizeText(food.name_food));

  for (const receta of recetas) {
    let isRecipeAvailable = true;

    const recipeIngredients = receta.ingredients
      .split(",")
      .map((ingredient) => normalizeText(ingredient.trim()));

    for (const ingredient of recipeIngredients) {
      const ingredientFound = foodNames.some((foodName) =>
        foodName.includes(ingredient),
      );

      if (!ingredientFound) {
        isRecipeAvailable = false;
        break;
      }
    }

    if (isRecipeAvailable) {
      recipesAvailable.push(receta.name);
    }
  }

  return (
    <div className="w-full text-center">
      <h2 className="font-bold">ShopList</h2>
    </div>
  );
}

export default Shop;
