"use client";

import { useEffect, useState } from "react";
import { Recetas, Stock } from "../ApiCalls";
import { recipe } from "@/components/Types";
import { useMyContext } from "./Context";

import React from "react";

function AllRecipes() {
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const { data, setData } = useMyContext();

  useEffect(() => {
    Recetas().then((resultados) => {
      const resultadosSinMapear = resultados;
      setRecetas(resultadosSinMapear);
    });
  }, []);
  const handleRecipeClick = (receta: recipe) => {
    setData(receta.name);
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
