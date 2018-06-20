import { Action, ActionCreator, Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
// import axios from '../../axios-instances/orders.instance';
import * as types from './types';

const FIREBASE_AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';

const API_KEY = 'AIzaSyBiiphxBuNTSQFFKolhU5uGfPEnbP07OAQ';

export interface AuthStart extends Action {
  'type': types.AUTH_START
}

export interface AuthSuccess extends Action {
  'type':   types.AUTH_SUCCESS;
   payload: {
     token:  string;
     userID:  string;
   };
}

interface AuthFail extends Action {
  'type':   types.AUTH_FAIL;
   payload: AxiosError;
}

export interface AuthLogout extends Action {
  'type': types.AUTH_LOGOUT;
}

export interface SetAuthRedirectPath extends Action {
  'type':  types.SET_AUTH_REDIRECT_PATH;
  payload: string;
}

export type AuthAction =
  | AuthStart
  | AuthSuccess
  | AuthFail
  | AuthLogout
  | SetAuthRedirectPath;

export const authStart: ActionCreator<AuthStart> = (): AuthStart => ({
  'type': types.AUTH_START
});

export const authSuccess: ActionCreator<AuthSuccess> =
  (token: string, userID: string): AuthSuccess => ({
    'type':   types.AUTH_SUCCESS,
    payload: { token, userID }
});

export const authFail: ActionCreator<AuthFail> =
  (error: AxiosError): AuthFail => ({
    'type':   types.AUTH_FAIL,
     payload: error
});

export const logout: ActionCreator<AuthLogout> = (): AuthLogout => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userID');

  return { 'type': types.AUTH_LOGOUT };
};

export const setAuthRedirectPath: ActionCreator<SetAuthRedirectPath> =
  (path: string): SetAuthRedirectPath => ({
    'type':   types.SET_AUTH_REDIRECT_PATH,
     payload: path
});

export const auth = (email: string, password: string, isSignup: boolean): any =>
  (dispatch: Dispatch<AuthAction>): void => {
    dispatch(authStart());

    let authURL = `${FIREBASE_AUTH_URL}/signupNewUser?key=${API_KEY}`;
    if (!isSignup) authURL = `${FIREBASE_AUTH_URL}/verifyPassword?key=${API_KEY}`;

    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    axios.post(authURL, authData)
      .then(({ data }: AxiosResponse) => {
        const expirationDate: string = new Date(
          new Date().getTime() + data.expiresIn * 1000
        ).toString();

        localStorage.setItem('token',          data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userID',         data.localId);

        dispatch(authSuccess(data.idToken, data.userId));
        dispatch(checkAuthTimeout(+data.expiresIn))
      })
      .catch((err: AxiosError) => dispatch(authFail(err.response.data.error)));
};

export const checkAuthTimeout = (expirationTime: number): any => (dispatch: Dispatch): void => {
  setTimeout(() => dispatch(logout()), expirationTime * 1000);
};

export const checkAuthState = (): any => (dispatch: Dispatch<AuthAction>): void => {
  const token: string = localStorage.getItem('token');

  if (!token) {
    dispatch(logout());
  }
  else {
    const expirationDate: Date = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    }
    else {
      const userID: string = localStorage.getItem('userID');

      dispatch(checkAuthTimeout(
        (expirationDate.getTime() - new Date().getTime()) / 1000
      ));
      dispatch(authSuccess(token, userID));
    }

    dispatch(authSuccess());
  }
};
