export async function Users() {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();
  return data;
}
export async function Recetas() {
  const res = await fetch("http://localhost:3000/api/recipes");
  const data = await res.json();
  return data;
}
export async function Despensa() {
  const res = await fetch("http://localhost:3000/api/despensa");
  const data = await res.json();
  return data;
}
export async function Favourites() {
  const res = await fetch("http://localhost:3000/api/favourites");
  const data = await res.json();
  return data;
}
export async function Featured() {
  const res = await fetch("http://localhost:3000/api/featured");
  const data = await res.json();
  return data;
}
export async function Ingredients() {
  const res = await fetch("http://localhost:3000/api/ingredients");
  const data = await res.json();
  return data;
}
export async function Recomended() {
  const res = await fetch("http://localhost:3000/api/recomended");
  const data = await res.json();
  return data;
}
export async function ShopList() {
  const res = await fetch("http://localhost:3000/api/shop-list");
  const data = await res.json();
  return data;
}
