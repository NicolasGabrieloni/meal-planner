"use client";

import { useEffect, useState } from "react";
import { Recetas, Stock } from "../ApiCalls";
import { stock, recipe } from "@/components/Types";

export function RecipesAvailable() {
  const [recetas, setRecetas] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    Promise.all([Recetas(), Stock()]).then(([recipes, stock]) => {
      setRecetas(recipes);
      setStock(stock);
    });
  }, []);

  const foodNames = stock.map((food: stock) => food.name_food);


  const recipesAvailable = [];

  return (
    <>
      <div>aca van las Disponibles</div>
    </>
  );
}
