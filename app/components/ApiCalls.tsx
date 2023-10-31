/// USERS ///
export async function Users() {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();
  return data;
}

/// RECIPES ///

export async function Recetas() {
  const res = await fetch("http://localhost:3000/api/recipes");
  const data = await res.json();
  return data;
}

/// STOCK ///

export async function Stock() {
  const res = await fetch("http://localhost:3000/api/stock");
  const data = await res.json();
  return data;
}

export async function typeCarnes() {
  const res = await fetch("http://localhost:3000/api/stock/carnes");
  const data = await res.json();
  return data;
}
export async function frutasVerduras() {
  const res = await fetch("http://localhost:3000/api/stock/verduras");
  const data = await res.json();
  return data;
}
export async function AlacenaCall() {
  const res = await fetch("http://localhost:3000/api/stock/alacena");
  const data = await res.json();
  return data;
}
export async function LacteosCall() {
  const res = await fetch("http://localhost:3000/api/stock/lacteos");
  const data = await res.json();
  return data;
}

/////////// INGREDIENTS
export async function Ingredients() {
  const res = await fetch("http://localhost:3000/api/ingredients");
  const data = await res.json();
  return data;
}

/// FAVOURITES ///
export async function Favourites() {
  const res = await fetch("http://localhost:3000/api/favourites");
  const data = await res.json();
  return data;
}

/// WEEKMEALS ///
export async function WeekMeals() {
  const res = await fetch("http://localhost:3000/api/weekMeal");
  const data = await res.json();
  return data;
}
export async function WeekMealsById(user_id: number) {
  const res = await fetch(`http://localhost:3000/api/weekMeal/user/${user_id}`);
  const data = await res.json();
  return data;
}

export async function Featured() {
  const res = await fetch("http://localhost:3000/api/recipesIngredients");
  const data = await res.json();
  return data;
}
