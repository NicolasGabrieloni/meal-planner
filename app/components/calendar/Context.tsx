import React, { createContext, useContext, useState, ReactNode } from "react";

interface MyContextType {
  data: string;
  setData: (data: string) => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [data, setData] = useState<string>("");

  return (
    <MyContext.Provider value={{ data, setData }}>
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
