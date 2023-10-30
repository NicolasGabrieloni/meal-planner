"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { WeekMealsById } from "../ApiCalls";
type LoadWeekMeals = (userId: number) => Promise<void>;
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
  loadWeekMeals: LoadWeekMeals;
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

  const loadWeekMeals: LoadWeekMeals = async (userId: number) => {
    try {
      const res = await WeekMealsById(userId);
      const results = res;

      const updatedWeekMeals = { ...weekMeals };

      results.forEach(
        (item: {
          dayName: keyof WeekMeals;
          mealType: keyof DayMeals;
          mealName: string;
        }) => {
          const { dayName, mealType, mealName } = item;
          if (
            dayName in updatedWeekMeals &&
            mealType in updatedWeekMeals[dayName]
          ) {
            updatedWeekMeals[dayName][mealType] = mealName;
          }
        },
      );
      setWeekMeals(updatedWeekMeals);
    } catch (error) {
      console.error("hay algo mal que no esta bien:", error);
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
