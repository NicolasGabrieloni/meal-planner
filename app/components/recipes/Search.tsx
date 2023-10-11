"use client";

import { useEffect, useState } from "react";
import { Recetas } from "../ApiCalls";
import { recipe } from "@/components/Types";

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
    <div className="mx-32 w-full text-center">
      <div>
        <div>
          <h2>search by </h2>
          <label
            htmlFor="range"
            onClick={handleChangeSearch}
            className={
              changeSearch
                ? "cursor-pointer rounded-lg border border-black bg-blue-400 p-1"
                : "cursor-pointer rounded-lg border border-black p-1"
            }
          >
            Name
          </label>

          <label
            htmlFor="range"
            onClick={handleChangeSearch}
            className={
              changeSearch
                ? "cursor-pointer rounded-lg border border-black p-1"
                : "cursor-pointer rounded-lg border border-black bg-blue-400 p-1"
            }
          >
            Ingredient
          </label>
        </div>

        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`search by ${changeSearch ? "name" : "ingredient"}`}
          className="mt-5 w-72 rounded-lg border border-black"
        ></input>
      </div>

      <div className="BUSCADOr">
        {inputValue.length === 0 ? (
          recetas.map((receta: recipe) => (
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
