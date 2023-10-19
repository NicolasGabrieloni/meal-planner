import { useMyContext } from "./Context";
import { useEffect, useState } from "react";

const AllMealsComponent = () => {
  const { weekMeals } = useMyContext();

  // Utiliza el estado local para mantener actualizado el array de comidas
  const [allMeals, setAllMeals] = useState<string[]>([]);

  // Utiliza un efecto para actualizar allMeals cuando cambian las comidas en el contexto
  useEffect(() => {
    const mealsArray = [];
    for (const day in weekMeals) {
      const { lunch, dinner } = weekMeals[day];
      if (lunch) {
        mealsArray.push(lunch);
      }
      if (dinner) {
        mealsArray.push(dinner);
      }
    }
    // Actualiza el estado local con el nuevo array de comidas
    setAllMeals(mealsArray);
  }, [weekMeals]);

  // Ahora, allMeals contiene todas las comidas de almuerzo y cena de todos los días
  console.log(allMeals);

  // Resto del componente...
};

export default AllMealsComponent;
