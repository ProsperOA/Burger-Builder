import { Reducer } from 'redux';

import { OrderActions } from '../actions/order.actions';
import * as types from '../actions/types';

export interface StoreState {
  orders: object[];
  loading: boolean;
}

const initialState: Readonly<StoreState> = {
  orders: [],
  loading: false
};

const reducer: Reducer = (state: StoreState = initialState, action: OrderActions): StoreState => {
  switch (action.type) {
    case types.PURCHASE_BURGER_START:
      return {...state, loading: true};
    case types.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.concat({
          ...action.payload.orderData,
          id: action.payload.orderID
        })
      };
    case types.PURCHASE_BURGER_FAILED:
      return {...state, loading: false};
    default:
      return state;
  }
};

export default reducer;
