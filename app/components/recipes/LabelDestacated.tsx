"use client";
import React, { useEffect, useState } from "react";
import { Recetas } from "../ApiCalls";
import { recipe } from "../Types";

interface LabelTypes {
  label: string;
}

export default function LabelDestacated({ label }: LabelTypes) {
  const [recetas, setRecetas] = useState<recipe[]>([]);

  useEffect(() => {
    Promise.all([Recetas()]).then(([recipes]) => {
      setRecetas(recipes);
    });
  }, []);

  const randomRecipes = [];
  while (randomRecipes.length < 3 && recetas.length > 0) {
    const randomIndex = Math.floor(Math.random() * recetas.length);
    randomRecipes.push(recetas.splice(randomIndex, 1)[0]);
  }

  return (
    <div className="p-4">
      <h1 className="w-[300px] border-b border-[#00785C] pb-1 text-xl font-medium text-[#00785C]">
        {label}
      </h1>
      <div className="flex flex-row py-4">
        {randomRecipes.map((recetasFavs: recipe) => (
          <div
            key={recetasFavs.id}
            className="bg-slate-300 relative z-30 mr-[-5px] h-[200px] w-[90px] transform-gpu rounded-md ring-4 ring-[#FAFAFA] transition-transform hover:z-40 hover:scale-110"
          >
            {recetasFavs.name}
          </div>
        ))}
      </div>
    </div>
  );
}
