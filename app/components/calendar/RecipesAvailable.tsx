"use client";

import { useEffect, useState } from "react";
import { Recetas, Stock, stockById } from "../ApiCalls";
import { stock, recipe } from "@/components/Types";
import { useMyContext, WeekMeals, DayMeals } from "../../Context";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  useEffect(() => {
    if (userId) {
      Promise.all([Recetas(), stockById(userId)]).then(
        ([recipes, stockData]) => {
          setRecetas(recipes);
          setInStock(stockData);
        },
      );
    }
  }, [userId]);

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
        {recipesAvailable.length === 0
          ? "Nada por aqui"
          : recipesAvailable.map((recipeAv) => (
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
