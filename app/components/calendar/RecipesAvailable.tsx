"use client";

import { useEffect, useState } from "react";
import { Recetas, Stock } from "../ApiCalls";
import { stock, recipe } from "@/components/Types";
import { useMyContext, WeekMeals, DayMeals } from "./Context";

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function RecipesAvailable({
  dayName,
  mealType,
}: {
  dayName: keyof WeekMeals;
  mealType: keyof DayMeals;
}) {
  const [inStock, setInStock] = useState<stock[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const { addMeal } = useMyContext();
  const recipesAvailable: string[] = [];

  useEffect(() => {
    Promise.all([Recetas(), Stock()]).then(([recipes, stockData]) => {
      setRecetas(recipes);
      setInStock(stockData);
    });
  }, []);

  const foodNames = inStock?.map((food: stock) =>
    normalizeText(food.name_food),
  );

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
    <>
      <div>
        {recipesAvailable.map((recipeAv) => (
          <button
            key={recipeAv}
            onClick={() => addMeal(dayName, mealType, recipeAv)}
          >
            <h2 className="cursor-pointer">{recipeAv}</h2>
          </button>
        ))}
      </div>
    </>
  );
}
