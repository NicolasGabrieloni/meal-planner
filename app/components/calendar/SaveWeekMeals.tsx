import { PrismaClient } from "@prisma/client";
import { WeekMeals, DayMeals } from "./Context";

const prisma = new PrismaClient();

// Función para guardar datos en la base de datos
async function guardarWeekMealsEnBaseDeDatos(
  userId: number,
  weekMeals: WeekMeals
): Promise<void> {
  try {
    for (const day in weekMeals) {
      const meals = weekMeals[day];
      for (const mealType in meals) {
        const recipeName = meals[mealType];

        // Obtén el ID de la receta asociada al nombre
        const recipe = await prisma.recipes.findUnique({
          where: {
            name: recipeName,
          },
        });

        if (recipe) {
          // Guarda el registro en la tabla WeekMeal
          await prisma.weekMeal.create({
            data: {
              dayName: day as keyof WeekMeals,
              mealType: mealType as keyof DayMeals,
              recipe_id: recipe.id,
              user_id: userId, // Asocia el usuario actual
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error);
  }
}

// Función para recuperar datos de la base de datos
async function obtenerWeekMealsDesdeBaseDeDatos(
  userId: number
): Promise<WeekMeals | null> {
  try {
    const weekMeals: WeekMeals = [];

    const weekMealsFromDB = await prisma.weekMeal.findMany({
      where: {
        user_id: userId, // Filtra por el usuario actual
      },
    });

    // Procesa los datos y organízalos en weekMeals
    weekMealsFromDB.forEach((meal) => {
      const { dayName, mealType, recipe_id } = meal;
      if (!weekMeals[dayName]) {
        weekMeals[dayName] = {};
      }
      weekMeals[dayName][mealType] = recipe.name;
    });

    return weekMeals;
  } catch (error) {
    console.error("Error al recuperar datos de la base de datos:", error);
    return null;
  }
}

export { guardarWeekMealsEnBaseDeDatos, obtenerWeekMealsDesdeBaseDeDatos };
