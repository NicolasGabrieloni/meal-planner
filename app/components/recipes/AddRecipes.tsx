"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function AddRecipes() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    img: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("URL_DE_TU_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Receta enviada exitosamente");
      } else {
        console.error("Error al enviar la receta");
      }
    } catch (error) {
      console.error("Error de red al enviar la receta", error);
    }
  };

  return (
    <div className="flex justify-center p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-[200px]" variant="blue_outlined">
            Añadir nueva receta
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[310px] border border-[#343434]">
          <div className="grid gap-4">
            <div className="space-y-2 ">
              <h4 className="text-lg font-medium leading-none text-[#00785C]">
                Nueva receta
              </h4>
              <p className="text-muted-foreground text-sm">
                Agregá todo lo necesario para hacer la receta:
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Fideos con crema"
                  className="col-span-2 h-8 w-[180px] "
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Altos fideos bestia"
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="ingredients">Ingredientes</Label>
                <Input
                  id="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  placeholder="Fideos, crema"
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="instructions">Instrucciones</Label>
                <Input
                  id="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="..."
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="img">Imágen</Label>
                {/* CHEQUEAR LO QUE MANDÓ GIULS AL MD */}
                <Input
                  id="img"
                  placeholder="URL de la imagen"
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                className="w-[100px] "
                variant="green_outlined"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
