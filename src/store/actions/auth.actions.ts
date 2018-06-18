import { Action, ActionCreator, Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
// import axios from '../../axios-instances/orders.instance';
import * as types from './types';

interface AuthStart extends Action {
  'type': types.AUTH_START
}

interface AuthSuccess extends Action {
  'type':   types.AUTH_SUCCESS;
   payload: any;
}

interface AuthFail extends Action {
  'type':   types.AUTH_FAIL;
   payload: AxiosError;
}

export type AuthAction =
  | AuthStart
  | AuthSuccess
  | AuthFail;

export const authStart: ActionCreator<AuthStart> = (): AuthStart => ({
  'type': types.AUTH_START
});

export const authSuccess: ActionCreator<AuthSuccess> =
  (authData: AxiosResponse): AuthSuccess => ({
    'type':   types.AUTH_SUCCESS,
     payload: authData
});

export const authFail: ActionCreator<AuthFail> =
  (error: AxiosError): AuthFail => ({
    'type':   types.AUTH_FAIL,
     payload: error
});

export const auth = (email: string, password: string): any =>
  (dispatch: Dispatch<AuthAction>): void => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBiiphxBuNTSQFFKolhU5uGfPEnbP07OAQ', authData)
      .then((res:  AxiosResponse) => dispatch(authSuccess(res)))
      .catch((err: AxiosError)    => dispatch(authFail()));
};
