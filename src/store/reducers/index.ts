import { combineReducers, Reducer } from 'redux';
import BurgerBuilderReducer, { StoreState as BurgerBuilderState } from '../reducers/burger-builder.reducer';
import OrderReducer, { StoreState as OrderState } from '../reducers/order.reducer';
import AuthReducer, { StoreState as AuthState } from '../reducers/auth.reducer';

export interface AppState {
  burgerBuilder: BurgerBuilderState;
  order:         OrderState;
  auth:          AuthState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  burgerBuilder: BurgerBuilderReducer,
  order:         OrderReducer,
  auth:          AuthReducer
});

export default rootReducer;
