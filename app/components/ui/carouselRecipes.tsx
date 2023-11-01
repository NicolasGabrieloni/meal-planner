"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import { Recetas } from "../ApiCalls";
import { recipe } from "../Types";
import Image from "next/image";

interface LabelTypes {
  label: string;
}

export function CarouselRecipes({ label }: LabelTypes) {
  const [recetas, setRecetas] = useState<recipe[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([Recetas()]).then(([recipes]) => {
      setRecetas(recipes);
      setDataLoaded(true);
    });
  }, []);

  const randomRecipes = [];
  while (randomRecipes.length < 3 && recetas.length > 0) {
    const randomIndex = Math.floor(Math.random() * recetas.length);
    randomRecipes.push(recetas.splice(randomIndex, 1)[0]);
  }

  return (
    <div className="p-4">
      <h1 className=" border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
        {label}
      </h1>
      {!dataLoaded ? (
        <p>Cargando datos...</p>
      ) : (
        <Carousel
          className="z-20 my-4 h-[400px] overflow-hidden rounded-xl border border-[#343434] bg-[#E9FFEB] drop-shadow-md md:mx-auto md:h-[450px] md:w-[600px]"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-40 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-2 cursor-pointer rounded-2xl transition-all content-[''] ${
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
          {randomRecipes.map((recetasFavs: recipe) => (
            <div key={recetasFavs.id} className="flex flex-col sm:flex-row">
              <div className="relative z-30 mr-[-5px] transform-gpu rounded-md transition-transform hover:z-40 hover:scale-110">
                <Image
                  src={recetasFavs.image}
                  alt={recetasFavs.name}
                  width={1200}
                  height={600}
                  className="h-[220px] w-screen object-cover sm:h-[400px] sm:w-full md:h-[450px] "
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
          ))}
        </Carousel>
      )}
    </div>
  );
}
