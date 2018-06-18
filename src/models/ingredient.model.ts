export type Ingredients = (
  | 'bread-bottom'
  | 'bread-top'
  | 'meat'
  | 'bacon'
  | 'cheese'
  | 'salad'
);

export const INGREDIENT_PRICES: {[name: string]: number} = {
  salad:  0.5,
  cheese: 0.4,
  meat:   1.3,
  bacon:  0.7
}

export const BASE_BURGER_PRICE: number = 1.50
