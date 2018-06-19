import { Reducer } from 'redux';
import * as types from '../actions/types';
import { AuthAction } from '../actions/auth.actions';

export interface StoreState {
  token:   string;
  userID:  string;
  error:   any;
  loading: boolean;
}

const initialState: Readonly<StoreState> = {
  token:   null,
  userID:  null,
  error:   null,
  loading: false
};

const reducer: Reducer = (state: StoreState = initialState, action: AuthAction): StoreState => {
  switch (action.type) {
    case types.AUTH_START:
      return {...state, error: null, loading: true};
    case types.AUTH_SUCCESS:
      return {
        ...state,
        token:   action.payload.token,
        userID:  action.payload.userID,
        error:   null,
        loading: false
      }
    case types.AUTH_FAIL:
      return {...state, error: action.payload, loading: false};
    case types.AUTH_LOGOUT:
      return {...state, token: null, userID: null};
    default:
      return state;
  }
};

export default reducer;
