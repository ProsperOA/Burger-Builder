import { Reducer } from 'redux';
import * as types from '../actions/types';
import { BurgerBuilderAction } from '../actions/burger-builder.actions';
import { INGREDIENT_PRICES, BASE_BURGER_PRICE } from '../../models/ingredient.model';

export interface StoreState {
  ingredients: {[name: string]: number};
  totalPrice:  number;
  building:    boolean;
  error:       boolean;
}

export const initialState: Readonly<StoreState> = {
  ingredients: null,
  totalPrice:  BASE_BURGER_PRICE,
  building:    false,
  error:       false
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
    totalPrice: updatedPrice,
    building:   true
  };
};

const setIngredients = (
  state: StoreState,
  { salad, bacon, cheese, meat }: any
): StoreState => {
  return {
    ...state,
    ingredients: { salad, bacon, cheese, meat },
    totalPrice:  BASE_BURGER_PRICE,
    building:    false,
    error:       false
  };
}

const reducer: Reducer = (state: StoreState = initialState, action: BurgerBuilderAction): StoreState => {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      return editIngredients(IngredientMethods.add, state, action.payload);
    case types.REMOVE_INGREDIENT:
      return editIngredients(IngredientMethods.remove, state, action.payload);
    case types.SET_INGREDIENTS:
      return setIngredients(state, action.payload);
    case types.FETCH_INGREDIENTS_FAILED:
      return {...state, error: true};
    default:
      return state;
  }
};

export default reducer;
