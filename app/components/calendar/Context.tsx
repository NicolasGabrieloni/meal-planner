"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

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



  // const removeData = () => {
  //   setData(null);
  // };

  return (
    <MyContext.Provider
      value={{
        // removeData,
        weekMeals,
        addMeal,
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
