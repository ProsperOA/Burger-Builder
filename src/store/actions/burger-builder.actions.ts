import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../axios-instances/orders.instance';
import * as types from '../actions/types';

interface IngredientAdded extends Action {
  'type':   types.ADD_INGREDIENT;
   payload: string;
}

interface IngredientRemoved extends Action {
  'type':   types.REMOVE_INGREDIENT;
   payload: string;
}

interface IngredientsSet extends Action {
  'type':   types.SET_INGREDIENTS;
   payload: object;
}

interface IngredientsFetchFailed extends Action {
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

export const setIngredients: ActionCreator<IngredientsSet> =
  (ingredients: object): IngredientsSet => ({
    'type': types.SET_INGREDIENTS,
     payload: ingredients
});

export const fetchIngredientsFailed: ActionCreator<IngredientsFetchFailed> =
  (): IngredientsFetchFailed => ({
    'type': types.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = (): any => (dispatch: Dispatch<BurgerBuilderAction>): void => {
  axios.get('/ingredients.json')
    .then((res:  AxiosResponse) => dispatch(setIngredients(res.data)))
    .catch((err: AxiosError)    => dispatch(fetchIngredientsFailed()));
};
