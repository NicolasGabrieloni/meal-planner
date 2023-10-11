type recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
};

type Stock = {
  id: number;
  name_food: string;
  quantity: string;
  unit: string;
  type_food: string;
  user_id: number;
};

export type { recipe, Stock };
