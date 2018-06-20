import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../axios-instances/orders.instance';
import { AppState } from '../reducers';
import * as types from './types';

export interface PurchaseInit extends Action {
  'type': types.PURCHASE_INIT;
}

export interface PurchaseBurgerStart extends Action {
  'type': types.PURCHASE_BURGER_START;
}

export interface PurchaseBurgerSuccess extends Action {
  'type': types.PURCHASE_BURGER_SUCCESS;
   payload: {
     orderID:   string;
     orderData: object;
   };
}

export interface PurchaseBurgerFail extends Action {
  'type':   types.PURCHASE_BURGER_FAILED;
   payload: AxiosError;
}

export interface FetchOrdersStart extends Action {
  'type':   types.FETCH_ORDERS_START;
}

export interface FetchOrdersSuccess extends Action {
  'type':   types.FETCH_ORDERS_SUCCESS;
   payload: any[];
}

export interface FetchOrdersFailed extends Action {
  'type':  types.FETCH_ORDERS_FAILED;
  payload: AxiosError;
}

export type OrderAction =
  | PurchaseInit
  | PurchaseBurgerStart
  | PurchaseBurgerSuccess
  | PurchaseBurgerFail
  | FetchOrdersStart
  | FetchOrdersSuccess
  | FetchOrdersFailed;

const purchaseBurgerSuccess: ActionCreator<PurchaseBurgerSuccess> =
  (id: string, orderData: object): PurchaseBurgerSuccess => ({
    'type': types.PURCHASE_BURGER_SUCCESS,
    payload: {
      orderID: id,
      orderData
    }
});

const purchaseBurgerFail: ActionCreator<PurchaseBurgerFail> =
  (error: any): PurchaseBurgerFail => ({
    'type': types.PURCHASE_BURGER_FAILED,
    payload: error
});

export const initPurchase: ActionCreator<PurchaseInit> =
  (): PurchaseInit => ({ 'type': types.PURCHASE_INIT });

export const purchaseBurgerStart: ActionCreator<PurchaseBurgerStart> =
  (): PurchaseBurgerStart => ({ 'type': types.PURCHASE_BURGER_START });

export const purchaseBurger = (orderData: object): any => (dispatch: Dispatch<OrderAction>): void => {
  dispatch(purchaseBurgerStart());

  axios.post('/orders.json', orderData)
    .then((res:  AxiosResponse) => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
    .catch((err: AxiosError)    => dispatch(purchaseBurgerFail(err)));
};

export const fetchOrders = (): any =>
  (dispatch: Dispatch<OrderAction>, getState: () => AppState): void => {
    dispatch(fetchOrdersStart());
    const { token, userID } = getState().auth;

    axios.get(`/orders.json?auth=${token}&orderBy="userID"&equalTo="${userID}"`)
      .then((res: AxiosResponse) => {
        const fetchedOrders: any[] = [];

        for (const key of Object.keys(res.data)) {
          fetchedOrders.push({ id: key, ...res.data[key] });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err: AxiosError) => dispatch(fetchOrdersFailed(err)));
};

const fetchOrdersStart: ActionCreator<FetchOrdersStart> =
  (orders: any[]): FetchOrdersStart => ({ 'type':   types.FETCH_ORDERS_START });

const fetchOrdersSuccess: ActionCreator<FetchOrdersSuccess> =
  (orders: any[]): FetchOrdersSuccess => ({
    'type':   types.FETCH_ORDERS_SUCCESS,
    payload: orders
});

const fetchOrdersFailed: ActionCreator<FetchOrdersFailed> =
  (error: AxiosError): FetchOrdersFailed => ({
    'type':  types.FETCH_ORDERS_FAILED,
    payload: error
});
