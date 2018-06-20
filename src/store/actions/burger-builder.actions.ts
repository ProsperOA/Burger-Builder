import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../axios-instances/orders.instance';
import * as types from '../actions/types';

export interface IngredientAdded extends Action {
  'type':   types.ADD_INGREDIENT;
   payload: string;
}

export interface IngredientRemoved extends Action {
  'type':   types.REMOVE_INGREDIENT;
   payload: string;
}

export interface IngredientsSet extends Action {
  'type':   types.SET_INGREDIENTS;
   payload: object;
}

export interface IngredientsFetchFailed extends Action {
  'type': types.FETCH_INGREDIENTS_FAILED;
}

export type BurgerBuilderAction =
  | IngredientAdded
  | IngredientRemoved
  | IngredientsSet
  | IngredientsFetchFailed;

export const addIngredient: ActionCreator<IngredientAdded> =
  (ingredientName: string): IngredientAdded => ({
    'type':   types.ADD_INGREDIENT,
     payload: ingredientName
});

export const removeIngredient: ActionCreator<IngredientRemoved> =
  (ingredientName: string): IngredientRemoved => ({
    'type':   types.REMOVE_INGREDIENT,
     payload: ingredientName
});

const setIngredients: ActionCreator<IngredientsSet> =
  (ingredients: object): IngredientsSet => {
    return {
      'type': types.SET_INGREDIENTS,
       payload: ingredients
}};

const fetchIngredientsFailed: ActionCreator<IngredientsFetchFailed> =
  (): IngredientsFetchFailed => ({
    'type': types.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = (): any => (dispatch: Dispatch<BurgerBuilderAction>): void => {
  axios.get('/ingredients.json')
    .then((res:  AxiosResponse) => dispatch(setIngredients(res.data)))
    .catch((err: AxiosError)    => dispatch(fetchIngredientsFailed()));
};
