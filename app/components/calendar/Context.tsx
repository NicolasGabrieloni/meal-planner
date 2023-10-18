import React, { createContext, useContext, useState, ReactNode } from "react";

interface MyContextType {
  data: string;
  setData: (data: string) => void;
  removeData: () => void;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyContextProviderProps {
  children: ReactNode;
}

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [data, setData] = useState<any>(null);
  const removeData = () => {
    setData(null);
  };

  return (
    <MyContext.Provider value={{ data, setData, removeData }}>
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
