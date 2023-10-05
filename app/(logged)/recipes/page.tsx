import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recetas",
};

interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  instrucciones: string;
}

async function Recetas() {
  const res = await fetch("http://localhost:3000/api/recipes");
  const data = await res.json();
  return data;
}

async function Recipes() {
  const recetas = await Recetas();

  return (
    <div>
      {recetas.map((receta: Receta) => (
        <div key={receta.id} className="ml-80 mt-10 w-96 text-center">
          <h2 className="m-5 font-bold">{receta.nombre}</h2>
          <p>
            <b>Descripcion: </b>
            {receta.descripcion}
          </p>
          <p>
            <b>ingredientes: </b>
            {receta.ingredientes}
          </p>
          <p>
            <b>instrucciones: </b>
            {receta.instrucciones}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
