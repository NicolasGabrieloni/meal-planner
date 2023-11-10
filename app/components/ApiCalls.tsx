/// USERS ///
export async function Users() {
  const res = await fetch("https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/users");
  const data = await res.json();
  return data;
}
export async function UsersById(id: number) {
  const res = await fetch(`https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/users/${id}`);
  const data = await res.json();
  return data;
}

/// RECIPES ///

export async function Recetas() {
  const res = await fetch("https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/recipes");
  const data = await res.json();
  return data;
}

/// STOCK ///

export async function Stock() {
  const res = await fetch("https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/stock");
  const data = await res.json();
  return data;
}
export async function stockById(user_id: number) {
  const res = await fetch(`https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/stock/user/${user_id}`);
  const data = await res.json();
  return data;
}

export async function typeCarnes(user_id: number) {
  const res = await fetch(`https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/stock/carnes/${user_id}`);
  const data = await res.json();
  return data;
}
export async function frutasVerduras(user_id: number) {
  const res = await fetch(
    `https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/stock/verduras/${user_id}`,
  );
  const data = await res.json();
  return data;
}
export async function AlacenaCall(user_id: number) {
  const res = await fetch(`https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/stock/alacena/${user_id}`);
  const data = await res.json();
  return data;
}
export async function LacteosCall(user_id: number) {
  const res = await fetch(`https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/stock/lacteos/${user_id}`);
  const data = await res.json();
  return data;
}


/// FAVOURITES ///
export async function Favourites(user_id: number) {
  const res = await fetch(
    `https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/favourites/user/${user_id}`,
  );
  const data = await res.json();
  return data;
}
export async function FavouritesById(id: number) {
  const res = await fetch(`https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/favourites${id}`);
  const data = await res.json();
  return data;
}

/// WEEKMEALS ///
export async function WeekMeals() {
  const res = await fetch("https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/weekMeal");
  const data = await res.json();
  return data;
}
export async function WeekMealsById(user_id: number) {
  const res = await fetch(`https://meal-planner-kpsj0me7l-nicolas-projects-c125ad39.vercel.app/api/weekMeal/user/${user_id}`);
  const data = await res.json();
  return data;
}
