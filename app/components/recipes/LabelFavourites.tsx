import React, { useEffect, useState } from "react";
import { Favourites, Recetas } from "../ApiCalls";
import { favourites, recipe } from "../Types";
import { useSession } from "next-auth/react";

interface LabelTypes {
  label: string;
}

export default function LabelFavourites({ label }: LabelTypes) {
  const { data } = useSession();
  const [favs, setFavs] = useState<favourites[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const [verFavs, setVerFavs] = useState(false);

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

  const recetasAMostrar = verFavs
    ? recetasFavoritas
    : recetasFavoritas.slice(0, 3);

  const handleViewFavs = () => {
    setVerFavs(!verFavs);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="w-[300px] border-b border-[#00785C] pb-1 text-xl font-medium text-[#00785C]">
          {label}
        </h1>
        <button onClick={handleViewFavs}>
          {verFavs ? "View top 3" : "View all"}
        </button>
        <div className="flex flex-row py-4">
          {recetasAMostrar.length > 0 ? (
            recetasAMostrar.map((recetasFavs: recipe) => (
              <div
                key={recetasFavs.id}
                className="relative z-30 mr-[-5px] h-[200px] w-[90px] transform-gpu rounded-md bg-slate-300 ring-4 ring-[#FAFAFA] transition-transform hover:z-40 hover:scale-110"
              >
                {recetasFavs.name}
              </div>
            ))
          ) : (
            <p>
              {verFavs
                ? "No tienes recetas favoritas"
                : "Aún no tienes recetas favoritas"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
