"use client";
import React, { useEffect, useState } from "react";
import { Favourites, Recetas } from "../ApiCalls";
import { favourites, recipe } from "../Types";
import { useSession } from "next-auth/react";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface LabelTypes {
  label: string;
}

export default function LabelFavourites({ label }: LabelTypes) {
  const [favs, setFavs] = useState<favourites[]>([]);
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      Promise.all([Recetas(), Favourites(userId)]).then(([recipes, favs]) => {
        setRecetas(recipes);
        setFavs(favs);
        setDataLoaded(true);
      });
    }
  }, [userId]);

  const recipesFavsId = favs.map((userFavs: favourites) => userFavs.recipes_id);

  const recetasFavoritas = recetas.filter((receta) =>
    recipesFavsId.includes(receta.id),
  );

  return (
    <div className="p-4">
      <h1 className=" border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
        {label}
      </h1>
      {!dataLoaded ? (
        <p>Cargando datos...</p>
      ) : (
        <Carousel
          className="z-20 my-4 h-[400px] overflow-hidden rounded-xl border border-[#343434] bg-[#E9FFEB] drop-shadow-md md:mx-auto md:w-[740px]"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-40 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                    activeIndex === i
                      ? "w-8 bg-[#343434]"
                      : "w-4 bg-gray-700/50"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          {recetasFavoritas.length > 0 ? (
            recetasFavoritas.map((recetasFavs: recipe) => (
              <div key={recetasFavs.id} className="flex flex-col sm:flex-row">
                <div className="relative z-30 mr-[-5px] transform-gpu rounded-md transition-transform hover:z-40 hover:scale-110">
                  <Image
                    src={recetasFavs.image}
                    alt={recetasFavs.name}
                    width={1200}
                    height={600}
                    className="h-[220px] w-screen object-cover sm:h-[400px] sm:w-full"
                  />
                </div>
                <div className="space-y-2 px-4 pt-4 sm:w-2/5 sm:space-y-4">
                  <h1 className="text-2xl font-medium"> {recetasFavs.name} </h1>
                  <h4 className="text-sm"> {recetasFavs.description} </h4>
                  <h6 className="text-xs sm:w-1/2">
                    {" "}
                    Ingredientes: {recetasFavs.ingredients}{" "}
                  </h6>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center space-y-4 pt-36">
              <p className="w-1/2 text-center text-lg font-semibold">
                Nada por aquí, añade algunas!
              </p>
              <Button variant={"green_outlined"} className="w-fit text-sm">
                <Link href="#all-recipes">Ver todas las recetas</Link>
              </Button>
            </div>
          )}
        </Carousel>
      )}
    </div>
  );
}
