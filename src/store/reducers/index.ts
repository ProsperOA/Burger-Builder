import { combineReducers, Reducer } from 'redux';
import BurgerBuilderReducer, {
  StoreState as BurgerBuilderState
} from '../reducers/burger-builder.reducer';

export interface ApplcationState {
  burgerBuilder: BurgerBuilderState;
}

const rootReducer: Reducer<ApplcationState> = combineReducers<ApplcationState>({
  burgerBuilder: BurgerBuilderReducer
});

export default rootReducer;
