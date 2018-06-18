import { combineReducers, Reducer } from 'redux';
import BurgerBuilderReducer, {
  StoreState as BurgerBuilderState
} from '../reducers/burger-builder.reducer';
import OrderReducer, {
  StoreState as OrderState
} from '../reducers/order.reducer';

export interface AppState {
  burgerBuilder: BurgerBuilderState;
  order:         OrderState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  burgerBuilder: BurgerBuilderReducer,
  order:         OrderReducer
});

export default rootReducer;
