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
  totalPrice:   4,
};

const reducer = (state: StoreState = initialState, action: BurgerBuilderAction): StoreState => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
      };
    default:
      break;
  }

  return state;
};

export default reducer;
