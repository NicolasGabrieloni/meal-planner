"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z.string().min(1, "Nombre requerido").max(100),
    email: z
      .string()
      .min(1, "Email requerido")
      .email("El email ingresado no es válido"),
    password: z
      .string()
      .min(1, "Contraseña requerida")
      .min(8, "La contraseña debe tener 8 o más caracteres"),
    confirmPassword: z
      .string()
      .min(1, "La confirmación de contraseña es requerida"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    if (response.ok) {
      router.push("/sign-in");
    } else {
      console.error("El registro falló");
    }
  };

  return (
    <div>
      <div className="flex h-[500px] w-[250px] flex-col items-center rounded-[5px] border border-[#343434] bg-[#FAFAFA] p-6 drop-shadow-md">
        <h2 className="text-lg font-medium text-[#00785C] ">Registrarse</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-3 py-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <FormLabel className="text-xs">Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <FormLabel className="text-xs">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <FormLabel className="text-xs">Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="**********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-0">
                    <FormLabel className="text-xs">
                      Volvé a colocar tu contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="**********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-center space-y-1 py-2">
              <Button variant={"green_outlined"}>Enviar</Button>
            </div>
          </form>
        </Form>
      </div>
      <h3 className="pt-2 text-center text-xs text-[#343434]">
        ¿Ya tenés cuenta?{" "}
        <Link href="/sign-in" className="font-bold">
          Ingresá acá
        </Link>
      </h3>
    </div>
  );
};

export default SignUpForm;
