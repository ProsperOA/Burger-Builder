import { Reducer } from 'redux';

import { OrderAction } from '../actions/order.actions';
import * as types      from '../actions/types';

export interface StoreState {
  orders:    any;
  loading:   boolean;
  purchased: boolean;
}

const initialState: Readonly<StoreState> = {
  orders:    [],
  loading:   false,
  purchased: false
};

const reducer: Reducer = (state: StoreState = initialState, action: OrderAction): StoreState => {
  switch (action.type) {
    case types.PURCHASE_INIT:
      return {...state, purchased: false};
    case types.PURCHASE_BURGER_START:
      return {...state, loading: true};
    case types.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading:   false,
        purchased: true,
        orders: state.orders.concat({
          ...action.payload.orderData,
          id: action.payload.orderID,
        })
      };
    case types.PURCHASE_BURGER_FAILED:
      return {...state, loading: false};
    case types.FETCH_ORDERS_START:
      return {...state, loading: true};
    case types.FETCH_ORDERS_SUCCESS:
      return {...state, orders: action.payload, loading: false};
    case types.FETCH_ORDERS_FAILED:
      return {...state, loading: false};
    default:
      return state;
  }
};

export default reducer;
