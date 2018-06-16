import { Action, ActionCreator } from 'redux';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/types';

interface IngredientAdded extends Action {
  'type':   ADD_INGREDIENT;
   payload: string;
}

interface IngredientRemoved extends Action {
  'type':   REMOVE_INGREDIENT;
   payload: string;
}

export type BurgerBuilderAction = IngredientAdded | IngredientRemoved;

export const addIngredient: ActionCreator<IngredientAdded> =
  (ingredientName: string): IngredientAdded => ({
    'type':   ADD_INGREDIENT,
     payload: ingredientName
});

export const removeIngredient: ActionCreator<IngredientRemoved> =
  (ingredientName: string): IngredientRemoved => ({
    'type':   REMOVE_INGREDIENT,
     payload: ingredientName
});

