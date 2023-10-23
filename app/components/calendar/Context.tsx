import React, { createContext, useContext, useState, ReactNode } from "react";

interface DayMeals {
  almuerzo: string;
  cena: string;
}

interface WeekMeals {
  lunes: DayMeals;
  martes: DayMeals;
  miercoles: DayMeals;
  jueves: DayMeals;
  viernes: DayMeals;
}

interface MyContextType {
  data: string;
  setData: (data: string) => void;
  removeData: () => void;
  weekMeals: WeekMeals;
  addMeal: (
    day: string,
    mealType: "almuerzo" | "cena",
    mealName: string,
  ) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [data, setData] = useState<any>(null);
  const [weekMeals, setWeekMeals] = useState<WeekMeals>({
    lunes: { almuerzo: "", cena: "" },
    martes: { almuerzo: "", cena: "" },
    miercoles: { almuerzo: "", cena: "" },
    jueves: { almuerzo: "", cena: "" },
    viernes: { almuerzo: "", cena: "" },
  });
  const addMeal = (
    day: string,
    mealType: "almuerzo" | "cena",
    mealName: string,
  ) => {
    setWeekMeals((prevWeekMeals) => ({
      ...prevWeekMeals,
      [day]: {
        ...prevWeekMeals[day],
        [mealType]: mealName,
      },
    }));
  };

  const removeData = () => {
    setData(null);
  };

  return (
    <MyContext.Provider
      value={{
        data,
        setData,
        removeData,
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
