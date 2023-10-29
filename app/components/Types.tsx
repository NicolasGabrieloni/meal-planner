type recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  image: string;
};

type stock = {
  id: number;
  name_food: string;
  quantity: string;
  unit: string;
  type_food: string;
  user_id: number;
};

type favourites = {
  id: number;
  recipes_id: number;
  user_id: number;
};

export type { recipe, stock, favourites };
