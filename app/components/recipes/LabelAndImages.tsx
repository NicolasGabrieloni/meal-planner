"use client";
import React, { useEffect, useState } from "react";
import { Favourites, Recetas } from "../ApiCalls";
import { favourites, recipe } from "../Types";
import { useSession } from "next-auth/react";

interface LabelTypes {
  label: string;
}

export default function LabelAndImages({ label }: LabelTypes) {
  const { data } = useSession();
  const [favs, setFavs] = useState<favourites[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);

  useEffect(() => {
    Promise.all([Recetas(), Favourites()]).then(([recipes, favs]) => {
      setRecetas(recipes);
      setFavs(favs);
    });
  }, []);

  const filterFavs = favs.filter(
    (fav: favourites) => fav.user_id === Number(data?.user?.id),
  );

  const recipesFavsId = filterFavs.map(
    (userFavs: favourites) => userFavs.recipes_id,
  );

  const recetasFavoritas = recetas.filter((receta) =>
    recipesFavsId.includes(receta.id),
  );

  return (
    <div className="p-4">
      <h1 className="w-[300px] border-b border-[#00785C] pb-1 text-xl font-medium text-[#00785C]">
        {label}
      </h1>
      <div className="flex flex-row py-4">
        {recetasFavoritas.length > 0 ? (
          recetasFavoritas.map((recetasFavs: recipe) => (
            <div
              key={recetasFavs.id}
              className="relative z-30 mr-[-5px] h-[200px] w-[90px] transform-gpu rounded-md bg-slate-300 ring-4 ring-[#FAFAFA] transition-transform hover:z-40 hover:scale-110"
            >
              {recetasFavs.name}
            </div>
          ))
        ) : (
          <p>Aún no tienes recetas favoritas</p>
        )}
      </div>
    </div>
  );
}
