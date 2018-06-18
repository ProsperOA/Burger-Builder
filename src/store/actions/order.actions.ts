import { Action, ActionCreator, Dispatch } from 'redux';
import { AxiosResponse, AxiosError } from 'axios';
import axios from '../../axios-instances/orders.instance';
import * as types from './types';

interface PurchaseBurgerStart extends Action {
  'type': types.PURCHASE_BURGER_START;
}

interface PurchaseBurgerSuccess extends Action {
  'type': types.PURCHASE_BURGER_SUCCESS;
   payload: {
     orderID:   string;
     orderData: object;
   };
}

interface PurchaseBurgerFail extends Action {
  'type':   types.PURCHASE_BURGER_FAILED;
   payload: any;
}

export type OrderActions =
  | PurchaseBurgerStart
  | PurchaseBurgerSuccess
  | PurchaseBurgerFail;

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

export const purchaseBurgerStart: ActionCreator<PurchaseBurgerStart> =
  (): PurchaseBurgerStart => ({ 'type': types.PURCHASE_BURGER_START });

export const purchaseBurger = (orderData: object): any => (dispatch: Dispatch<OrderActions>): void => {
  dispatch(purchaseBurgerStart());

  axios.post('/orders.json', orderData)
    .then((res:  AxiosResponse) => dispatch(purchaseBurgerSuccess(res.data, orderData)))
    .catch((err: AxiosError)    => dispatch(purchaseBurgerFail(err)));
};

