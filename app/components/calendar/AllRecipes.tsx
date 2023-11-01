"use client";

import { useEffect, useState } from "react";
import { Recetas } from "../ApiCalls";
import { recipe } from "@/components/Types";
import { DayMeals, WeekMeals, useMyContext } from "../../Context";

import React from "react";

function AllRecipes({
  dayName,
  mealType,
}: {
  dayName: keyof WeekMeals;
  mealType: keyof DayMeals;
}) {
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const { addMeal } = useMyContext();

  useEffect(() => {
    Recetas().then((resultados) => {
      const resultadosSinMapear = resultados;
      setRecetas(resultadosSinMapear);
    });
  }, []);
  const handleRecipeClick = (receta: recipe) => {
    addMeal(dayName, mealType, receta.name);
  };

  return (
    <div>
      {recetas.map((receta: recipe) => (
        <div key={receta.id} className="cursor-pointer">
          <h3 onClick={() => handleRecipeClick(receta)}>{receta.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default AllRecipes;
