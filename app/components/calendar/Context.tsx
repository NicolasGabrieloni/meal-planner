"use client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { WeekMealsById } from "../ApiCalls";

export interface DayMeals {
  Almuerzo: string;
  Cena: string;
}

export interface WeekMeals {
  Lunes: DayMeals;
  Martes: DayMeals;
  Miercoles: DayMeals;
  Jueves: DayMeals;
  Viernes: DayMeals;
}

interface MyContextType {
  // removeData: () => void;
  loadWeekMeals: WeekMeals;
  weekMeals: WeekMeals;
  addMeal: (
    dayName: keyof WeekMeals,
    mealType: keyof DayMeals,
    mealName: string,
  ) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

interface WeeklyFoodProviderProps {
  children: ReactNode;
}

export function WeeklyFoodProvider({ children }: WeeklyFoodProviderProps) {
  const [weekMeals, setWeekMeals] = useState<WeekMeals>({
    Lunes: { Almuerzo: "", Cena: "" },
    Martes: { Almuerzo: "", Cena: "" },
    Miercoles: { Almuerzo: "", Cena: "" },
    Jueves: { Almuerzo: "", Cena: "" },
    Viernes: { Almuerzo: "", Cena: "" },
  });

  const addMeal = (
    dayName: keyof WeekMeals,
    mealType: keyof DayMeals,
    mealName: string,
  ) => {
    setWeekMeals((prevWeekMeals) => ({
      ...prevWeekMeals,
      [dayName]: {
        ...prevWeekMeals[dayName],
        [mealType]: mealName,
      },
    }));
  };

  const { data: session } = useSession();
  const idUser = session?.user.id;
  const userId = parseInt(idUser as string);

  const loadWeekMeals = async (userId: number) => {
    try {
      const res = await WeekMealsById(userId);
      const resultados = res;

      const updatedWeekMeals = { ...weekMeals };

      resultados.forEach((item) => {
        const { dayName, mealType, mealName } = item;
        if (
          dayName in updatedWeekMeals &&
          mealType in updatedWeekMeals[dayName]
        ) {
          updatedWeekMeals[dayName][mealType] = mealName;
        }
      });
      setWeekMeals(updatedWeekMeals);
    } catch (error) {
      console.error("Error al cargar los datos de la semana", error);
    }
  };

  // const removeData = () => {
  //   setData(null);
  // };

  return (
    <MyContext.Provider
      value={{
        // removeData,
        weekMeals,
        addMeal,
        loadWeekMeals,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      "useMyContext debe utilizarse dentro de un MyContextProvider",
    );
  }
  return context;
}
