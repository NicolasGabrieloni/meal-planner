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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email requerido")
    .email("El email ingresado no es válido"),
  password: z
    .string()
    .min(1, "Contraseña requerida")
    .min(8, "La contraseña debe tener 8 o más caracteres"),
});

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,

      redirect: false,
    });
    if (signInData?.ok) {
      router.push("/home");
    } else {
      toast({
        title: "Error",
        description: "Usuario o contraseña incorrectas",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-row space-x-20">
      <div className="hidden lg:inline-flex">
        <Image
          src={"/Logo.svg"}
          alt={"Logo of Meal Planner"}
          width={500}
          height={500}
          className="animate-pulse"
        />
      </div>
      <div>
        <div className="flex h-[400px] w-[250px] flex-col items-center rounded-[5px] border border-[#343434] bg-[#FAFAFA] p-6 drop-shadow-md">
          <h2 className="text-lg font-medium text-[#00785C] ">
            Iniciar sesión
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-4 pb-10 pt-6">
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
              </div>
              <div className=" flex flex-col items-center space-y-1 py-2">
                <Button variant={"green_outlined"}>Enviar</Button>
              </div>
            </form>
          </Form>
        </div>
        <h3 className="pt-2 text-center text-xs text-[#343434]">
          ¿No tenés cuenta todavía?{" "}
          <Link href="/sign-up" className="font-bold">
            Registrate acá
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default SignInForm;
