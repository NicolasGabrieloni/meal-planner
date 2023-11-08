"use client";

import { useEffect, useState } from "react";
import { Favourites, Recetas } from "../ApiCalls";
import { recipe } from "@/components/Types";
import { Button } from "../ui/button";
import { AddRecipes } from "./AddRecipes";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type favRecipes = {
  id: number;
  recipes_id: number;
  user_id: number;
};

export function SearchRecipes() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [changeSearch, setChangeSearch] = useState(true);
  const [recetasFavoritas, setRecetasFavoritas] = useState<favRecipes[]>([]);
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      Promise.all([Recetas(), Favourites(userId)]).then(
        ([recipes, favData]) => {
          setRecetas(recipes);
          setRecetasFavoritas(favData);
          setDataLoaded(true);
        },
      );
    }
  }, [userId]);

  //////// BUSCADOR //////////////
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

  const guardarRecetaFavorita = async (user_id: number, recipes_id: number) => {
    try {
      const response = await fetch(`/api/favourites`, {
        method: "POST",
        body: JSON.stringify({
          user_id,
          recipes_id,
        }),
      });
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const eliminarRecetaFavorita = async (
    user_id: number,
    recipes_id: number,
  ) => {
    try {
      const response = await fetch(
        `/api/favourites/user/${user_id}/${recipes_id}`,
        {
          method: "DELETE",
        },
      );
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const toggleFavorito = (receta: recipe) => {
    const recipesId = receta.id;
    if (
      recetasFavoritas.some((favorito) => favorito.recipes_id === recipesId)
    ) {
      eliminarRecetaFavorita(userId, recipesId).then(() => {
        setRecetasFavoritas((prevFavoritos) =>
          prevFavoritos.filter((favorito) => favorito.recipes_id !== receta.id),
        );
      });
    } else {
      guardarRecetaFavorita(userId, recipesId).then(() => {
        setRecetasFavoritas((prevFavoritos) => [
          ...prevFavoritos,
          { id: 0, recipes_id: receta.id, user_id: userId },
        ]);
      });
    }
  };

  return (
    <div id="all-recipes" className="p-4">
      <h1 className=" border-b border-[#00785C] pb-2 text-xl font-medium text-[#00785C] lg:font-semibold">
        Todas las recetas
      </h1>
      {!dataLoaded ? (
        <p>Cargando datos...</p>
      ) : (
        <div>
          <AddRecipes />
          <div className="flex flex-col items-center gap-4 py-4">
            <input
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Buscar por ${
                changeSearch ? "Nombre" : "Ingrediente"
              }`}
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

          <div className="grid gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {inputValue.length === 0 ? (
              recetas.map((receta: recipe) => (
                <div
                  key={receta.id}
                  className="h-[400px] w-full rounded-xl border border-[#343434] bg-[#E9FFEB] p-4 drop-shadow-md"
                >
                  <Image
                    src={receta.image}
                    alt={receta.name}
                    width={1200}
                    height={600}
                    className="w-fill h-[200px] rounded-xl object-cover"
                  />
                  <div className="space-y-2 py-2">
                    <h2 className="flex items-center">
                      <span className="text-lg font-bold">{receta.name}</span>
                      <span
                        className="ml-auto cursor-pointer text-2xl"
                        onClick={() => toggleFavorito(receta)}
                      >
                        {recetasFavoritas.some(
                          (favorito) => favorito.recipes_id === receta.id,
                        ) ? (
                          <AiFillHeart />
                        ) : (
                          <AiOutlineHeart />
                        )}
                      </span>
                    </h2>
                    <div className="flex flex-row justify-between pr-4">
                      <p className="text-md w-2/3">{receta.description}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="green_outlined"
                            className="mt-10 w-fit text-sm font-bold"
                          >
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="space-y-2 rounded-xl border border-[#343434] sm:max-w-[500px] md:max-w-[425px]">
                          <DialogHeader className="space-y-4">
                            <Image
                              src={receta.image}
                              alt={receta.name}
                              width={1200}
                              height={600}
                              className="w-fill mt-4 h-[300px] rounded-xl object-cover"
                            />
                            <DialogTitle className="text-2xl text-[#00785C]">
                              {" "}
                              {receta.name}{" "}
                            </DialogTitle>

                            <DialogDescription className="text-lg font-semibold">
                              {receta.description}
                            </DialogDescription>
                          </DialogHeader>
                          <h4 className="text-lg font-medium">
                            <span className="font-bold">Ingredientes: </span>
                            {receta.ingredients}{" "}
                          </h4>
                          <h3 className="items-center text-lg font-medium">
                            <span className="font-bold">Instrucciones: </span>
                            {receta.instructions}{" "}
                          </h3>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))
            ) : searchResults.length > 0 ? (
              searchResults.map((receta: recipe) => (
                <div
                  key={receta.id}
                  className="h-[400px] w-full rounded-xl border border-[#343434] bg-[#E9FFEB] p-4 drop-shadow-md"
                >
                  <Image
                    src={receta.image}
                    alt={receta.name}
                    width={1200}
                    height={600}
                    className="w-fill h-[200px] rounded-xl object-cover"
                  />
                  <div className="space-y-2 py-2">
                    <h2 className="flex items-center">
                      <span className="text-lg font-bold">{receta.name}</span>
                      <span
                        className="ml-auto cursor-pointer text-2xl"
                        onClick={() => toggleFavorito(receta)}
                      >
                        {recetasFavoritas.some(
                          (favorito) => favorito.recipes_id === receta.id,
                        ) ? (
                          <AiFillHeart />
                        ) : (
                          <AiOutlineHeart />
                        )}
                      </span>
                    </h2>
                    <div className="flex flex-row justify-between pr-4">
                      <p className="text-md w-2/3">{receta.description}</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="green_outlined"
                            className="mt-10 w-fit text-sm font-bold"
                          >
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="space-y-2 rounded-xl border border-[#343434] sm:max-w-[500px] md:max-w-[425px]">
                          <DialogHeader className="space-y-4">
                            <Image
                              src={receta.image}
                              alt={receta.name}
                              width={1200}
                              height={600}
                              className="w-fill mt-4 h-[300px] rounded-xl object-cover"
                            />
                            <DialogTitle className="text-2xl text-[#00785C]">
                              {" "}
                              {receta.name}{" "}
                            </DialogTitle>

                            <DialogDescription className="text-lg font-semibold">
                              {receta.description}
                            </DialogDescription>
                          </DialogHeader>
                          <h4 className="text-lg font-medium">
                            <span className="font-bold">Ingredientes: </span>
                            {receta.ingredients}{" "}
                          </h4>
                          <h3 className="items-center text-lg font-medium">
                            <span className="font-bold">Instrucciones: </span>
                            {receta.instructions}{" "}
                          </h3>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h2 className="mt-10 text-center">
                No se encontró ningun resultado
              </h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
