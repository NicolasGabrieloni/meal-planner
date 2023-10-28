import { PrismaClient } from "@prisma/client";
import { WeekMeals, DayMeals } from "./Context";

const prisma = new PrismaClient();

const saveWeekMeals = async (
  dayName: keyof WeekMeals,
  mealType: keyof DayMeals,
  mealName: string,
  userId: number,
) => {
  const res = await fetch("/api/weekMeal", {
    method: "POST",
    body: JSON.stringify({
      dayName,
      mealType,
      mealName,
      user_id: userId,
    }),
  });
  if (res.ok) {
    console.log("todo ok");
  } else {
    console.error("todo mal");
  }
};

// // Función para guardar datos en la base de datos
// async function (userId: number, weekMeals: WeekMeals) {
//   for (const day in weekMeals) {
//     // `day` contiene el nombre del día (Lunes, Martes, etc.)
//     const dayMeals: DayMeals = weekMeals[day]; // Obtenemos las comidas para el día actual

//     for (const mealType in dayMeals) {
//       // `mealType` contiene el tipo de comida (Almuerzo o Cena)
//       const mealName: string = dayMeals[mealType];

//       // Guarda el registro en la tabla WeekMeal
//       await prisma.weekMeal.create({
//         data: {
//           dayName: day as keyof WeekMeals,
//           mealType: mealType,
//           mealName: mealName,
//           user_id: userId, // Asocia el usuario actual
//         },
//       });

//       console.log(`${day},${mealType}, Nombre: ${mealName}`);
//     }
//   }
// }

// // Función para recuperar datos de la base de datos
// async function callWeekMealsDB(userId: number) {
//   try {
//     const weekMeals: WeekMeals = [];

//     const weekMealsFromDB = await prisma.weekMeal.findMany({
//       where: {
//         user_id: userId, // Filtra por el usuario actual
//       },
//     });

//     // Procesa los datos y organízalos en weekMeals
//     weekMealsFromDB.forEach((meal) => {
//       const { dayName, mealType, mealName } = meal;
//       if (!weekMeals[dayName]) {
//         weekMeals[dayName] = { Almuerzo: "", Cena: "" };
//       }
//       weekMeals[dayName][mealType] = mealName;
//     });

//     return weekMeals;
//   } catch (error) {
//     console.error("Error al recuperar datos de la base de datos:", error);
//     return null;
//   }
// }

export { saveWeekMeals};
