"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function AddFood() {
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = idUser ? parseInt(idUser as string) : null;

  const [formData, setFormData] = useState({
    name_food: "",
    quantity: 1,
    unit: "gramos",
    type_food: "verduras",
    user_id: userId,
  });

  const resetForm = () => {
    setFormData({
      name_food: "",
      quantity: 1,
      unit: "gr",
      type_food: "verduras",
      user_id: userId,
    });
    setError("");
  };
  useEffect(() => {
    if (idUser) {
      const userId = parseInt(idUser as string);
      setFormData({
        ...formData,
        user_id: userId,
      });
    }
  }, [idUser]);

  const handleChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    if (id === "quantity") {
      setFormData({ ...formData, [id]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async () => {
    if (
      formData.name_food &&
      formData.quantity &&
      formData.unit &&
      formData.type_food
    ) {
      try {
        const response = await fetch(`/api/stock`, {
          method: "POST",
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Alimento enviado exitosamente");
          resetForm();
        }
      } catch (error) {
        console.error("Error de red al enviar la receta", error);
      }
    } else {
      setError("Completa todos los campos");
    }
    window.location.reload();
  };

  return (
    <div className="flex justify-center p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="w-full max-w-[400px] text-base font-semibold sm:h-12 sm:text-lg"
            variant="blue_outlined"
          >
            Añadir alimento
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[310px] border border-[#343434] sm:w-[400px]">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="text-xl font-medium leading-none text-[#00785C]">
                Nuevo alimento
              </h4>
              <p className="text-muted-foreground text-base">
                Agregá todos los alimentos que tengas en tu cocina:
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name_food">Nombre de alimento</Label>
                <Input
                  id="name_food"
                  value={formData.name_food}
                  onChange={handleChange}
                  placeholder="bife, queso"
                  className="col-span-2 h-8 w-[180px] "
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="quantity">Cantidad</Label>
                <Input
                  type="number"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="1"
                  className="col-span-2 h-8 w-[180px]"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="unit">Unidad de medida</Label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="kg, gr, lt"
                  className="col-span-2 h-8 w-[180px]"
                >
                  <option value="gramos">gramos</option>
                  <option value="kilogramos">kilogramos</option>
                  <option value="litros">litros</option>
                  <option value="unidades">unidades</option>
                </select>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="type_food">Tipo de Alimento</Label>
                <select
                  id="type_food"
                  value={formData.type_food}
                  onChange={handleChange}
                  className="col-span-2 h-8 w-[180px]"
                >
                  <option value="verduras">verduras</option>
                  <option value="frutas">frutas</option>
                  <option value="carnes">carnes</option>
                  <option value="lacteos">lacteos</option>
                  <option value="secos">secos</option>
                  <option value="frescos">frescos</option>
                </select>
              </div>
            </div>
            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
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
