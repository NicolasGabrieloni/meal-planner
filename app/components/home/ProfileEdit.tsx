"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconDots } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UsersById } from "../ApiCalls";
import uploadFile from "@/lib/utils";

export function ProfileEdit() {
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = idUser ? parseInt(idUser as string) : null;
  const [formData, setFormData] = useState({
    email: "",
    description: "",
    image: "",
    age: 0,
    sex: "Hombre",
    location: "",
  });

  useEffect(() => {
    if (userId) {
      UsersById(userId).then((res) => {
        const userData = res;
        setFormData({
          email: userData.email || "",
          description: userData.description || "",
          image: userData.image || "",
          age: userData.age || 0,
          sex: userData.sex || "Hombre",
          location: userData.location || "",
        });
      });
    }
  }, [userId]);


  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "age") {
      setFormData({ ...formData, [id]: parseFloat(value) });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex h-[16px] w-[25px] items-center rounded-md border border-black bg-[#80FF95]  ">
          <IconDots stroke={1} height={18} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-screen rounded-xl border border-[#343434] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-medium text-[#00785C]">
            Editar perfil
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-between space-y-5">
          <div className="flex flex-row items-center space-x-5">
            <Image
              src={formData.image}
              alt="User profile image"
              width={200}
              height={200}
              className="max-h-[70px] max-w-[70px] rounded-full"
            />
            <Input
              type="file"
              name="file"
              id="image"
              onChange={async (e) => {
                if (e.target.files) {
                  const result = await uploadFile(e.target.files[0]);
                  setFormData({
                    ...formData,
                    image:
                      "https://guls-escuelita-api-mainst-escuelitabucketc7b4e42a-1e9sgj383k6ak.s3.amazonaws.com/" +
                      result,
                  });
                }
              }}
              className="flex w-[160px] bg-[#E9FFEB]"
            />
          </div>
          <div className="flex flex-row space-y-2 md:flex-col">
            <Label htmlFor="email" className="items-center">
              Email
            </Label>
            <input
              id="email"
              value={formData.email}
              onChange={handleChange}
              className=" w-[270px] rounded-md border border-[#343434] p-1 text-sm shadow-md sm:w-full"
            />
          </div>

          <div className="flex flex-row space-y-2 md:flex-col">
            <Label htmlFor="description" className="items-center">
              Descripción
            </Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className=" w-[270px] rounded-md border border-[#343434] p-1 text-sm shadow-md sm:w-full"
            />
          </div>
          <div className="flex flex-row space-y-2 md:flex-col">
            <Label htmlFor="age" className="items-center">
              Edad
            </Label>
            <input
              id="age"
              value={formData.age}
              type="number"
              onChange={handleChange}
              className=" w-[270px] rounded-md border border-[#343434] p-1 text-sm shadow-md sm:w-full"
            />
          </div>
          <div className="flex flex-row space-y-2 md:flex-col">
            <Label htmlFor="sex" className="items-center">
              Sexo
            </Label>
            <select
              id="sex"
              value={formData.sex}
              onChange={handleChange}
              className=" w-[270px] rounded-md border border-[#343434] p-1 text-sm shadow-md sm:w-full"
            >
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="flex flex-row space-y-2 md:flex-col">
            <Label htmlFor="location" className="items-center">
              Ubicacion
            </Label>
            <input
              id="location"
              value={formData.location}
              onChange={handleChange}
              className=" w-[270px] rounded-md border border-[#343434] p-1 text-sm shadow-md sm:w-full"
            />
          </div>
        </div>
        <DialogFooter className="items-end">
          <Button
            variant={"green_outlined"}
            className="w-fit"
            type="submit"
            onClick={() => {
              handleSaveChanges();
            }}
          >
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
