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
      <Carousel
        className="h-[200px] w-[280px] rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        {randomRecipes.map((recetasFavs: recipe) => (
          <div
            key={recetasFavs.id}
            className="relative z-30 mr-[-5px] w-[300px] transform-gpu rounded-md bg-slate-300 ring-4 ring-[#FAFAFA] transition-transform hover:z-40 hover:scale-110"
          >
            <Image
              src={recetasFavs.image}
              alt={recetasFavs.name}
              width={1200}
              height={600}
              className="h-[200px] w-[300px]"
            />
            <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
              <div className="w-3/4 text-center md:w-2/4">
                <h1 className="text-2xl text-white"> {recetasFavs.name} </h1>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
