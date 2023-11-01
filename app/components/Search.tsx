"use client";

import { useEffect, useState } from "react";
import { Recetas } from "./ApiCalls";
import { recipe } from "@/components/Types";
import { Button } from "./ui/button";
import { AddRecipes } from "./recipes/AddRecipes";
import Image from "next/image";

export function SearchRecipes() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [changeSearch, setChangeSearch] = useState(true);

  useEffect(() => {
    Recetas().then((resultados) => {
      const resultadosSinMapear = resultados;
      setRecetas(resultadosSinMapear);
    });
  }, []);

  function removeAccents(text: string) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  const handleInputChange = (e: { target: { value: string } }) => {
    const query = removeAccents(e.target.value).toLowerCase();
    setInputValue(query);

    const filterRecipes = recetas.filter((receta: recipe) => {
      const searchIn = changeSearch
        ? removeAccents(receta.name)
        : removeAccents(receta.ingredients);
      return searchIn.toLowerCase().includes(query);
    });
    setSearchResults(filterRecipes);
  };

  const handleChangeSearch = () => {
    setChangeSearch(!changeSearch);
  };

  return (
    <div id="all-recipes" className="p-4">
      <h1 className=" border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
        Todas las recetas
      </h1>
      <AddRecipes />
      <div className="flex flex-col items-center gap-4 py-4">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Buscar por ${changeSearch ? "Nombre" : "Ingrediente"}`}
          className="w-full max-w-[600px] rounded-md border border-[#343434] pl-4"
        ></input>
        <div className="flex flex-row items-center space-x-2">
          <h4 className="text-sm">Buscar por:</h4>
          <Button
            onClick={handleChangeSearch}
            className={
              changeSearch
                ? "h-[20px] cursor-pointer rounded-lg border border-[#343434] bg-[#72E5FF] pb-2 text-xs"
                : "h-[20px] cursor-pointer rounded-lg border border-[#343434] pb-2 text-xs"
            }
          >
            Nombre
          </Button>

          <Button
            onClick={handleChangeSearch}
            className={
              changeSearch
                ? "h-[20px] cursor-pointer rounded-md border border-[#343434] pb-2 text-xs"
                : "h-[20px] cursor-pointer rounded-md border border-[#343434] bg-[#72E5FF] pb-2 text-xs"
            }
          >
            Ingrediente
          </Button>
        </div>
      </div>

      <div className="BUSCADOr">
        {inputValue.length === 0 ? (
          recetas.map((receta: recipe) => (
            <div
              key={receta.id}
              className="h-fit w-full rounded-xl border border-[#343434] bg-[#E9FFEB] p-4 drop-shadow-md sm:w-1/2 lg:w-1/3"
            >
              <Image
                src={receta.image}
                alt={receta.name}
                width={1200}
                height={600}
                className="w-fill h-[200px] rounded-xl object-cover"
              />
              <div className="space-y-2 py-2">
                <h1 className="text-xl font-medium">{receta.name}</h1>
                <p>
                  Ingredientes:
                  {receta.ingredients}
                </p>
                <p>
                  Instrucciones:
                  {receta.instructions}
                </p>
              </div>
            </div>
          ))
        ) : searchResults.length > 0 ? (
          searchResults.map((receta: recipe) => (
            <div key={receta.id} className="mt-10 w-96 text-center">
              <h2 className="m-5 font-bold">{receta.name}</h2>
              <p>
                <b>Descripcion: </b>
                {receta.description}
              </p>
              <p>
                <b>ingredientes: </b>
                {receta.ingredients}
              </p>
              <p>
                <b>instrucciones: </b>
                {receta.instructions}
              </p>
              <button className="m-5 w-32 rounded-md border border-black">
                EDIT
              </button>
              <button className="m-5 w-32 rounded-md border border-black">
                DELETE
              </button>
            </div>
          ))
        ) : (
          <h2 className="mt-10 text-center">No se encontró ningun resultado</h2>
        )}
      </div>
    </div>
  );
}
