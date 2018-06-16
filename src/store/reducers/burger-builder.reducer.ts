import { Reducer } from 'redux';
import { BurgerBuilderAction } from '../actions/burger-builder.actions';
import { INGREDIENT_PRICES } from '../../models/ingredient.model';
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT
} from '../actions/types';

export interface StoreState {
  ingredients:  any;
  totalPrice:   number;
}

export const initialState: StoreState = {
  ingredients:  {
    salad:  0,
    bacon:  0,
    cheese: 0,
    meat:   0
  },
  totalPrice: 4,
};

enum IngredientMethods {
  add,
  remove
}

const editIngredients = (
  method: IngredientMethods,
  state:  StoreState,
  name:   string
): StoreState => {
  let updatedIngrdient: {[name: string]: number};
  let updatedPrice: number = 0;

  switch (method) {
    case IngredientMethods.add:
      updatedPrice     = state.totalPrice + INGREDIENT_PRICES[name];
      updatedIngrdient = {[name]: state.ingredients[name] + 1};
      break;
    case IngredientMethods.remove:
      updatedPrice     = state.totalPrice - INGREDIENT_PRICES[name];
      updatedIngrdient = {[name]: state.ingredients[name] - 1};
      break;
    default:
      return state;
  }

  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      ...updatedIngrdient
    },
    totalPrice: updatedPrice
  };
};

const reducer: Reducer = (state: StoreState = initialState, action: BurgerBuilderAction): StoreState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return editIngredients(IngredientMethods.add, state, action.payload);
    case REMOVE_INGREDIENT:
      return editIngredients(IngredientMethods.remove, state, action.payload);
    default:
      break;
  }

  return state;
};

export default reducer;
