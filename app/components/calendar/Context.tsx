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
type selectedRecipes = string[];
interface MyContextType {
  // removeData: () => void;
  selectedRecipes: selectedRecipes;
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
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
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
      const recipesArray: string[] = [];

      results?.forEach(
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
            recipesArray.push(mealName);
          }
        },
      );
      if (recipesArray.length > 10) {
        recipesArray.splice(0, recipesArray.length - 10);
      }
      setWeekMeals(updatedWeekMeals);
      setSelectedRecipes(recipesArray);
    } catch (error) {
      console.error("hay algo mal que no esta bien:", error);
    }
  };

  console.log(selectedRecipes);
  // const removeData = () => {
  //   setData(null);
  // };

  return (
    <MyContext.Provider
      value={{
        // removeData,
        selectedRecipes,
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
      "useMyContext no va a andar si no esta dentro de WeeklyFoodProvider",
    );
  }
  return context;
}
