import {
  Store,
  Middleware,
  applyMiddleware,
  compose,
  Action,
  Dispatch
} from 'redux';

export const logger: Middleware = (s: Store) => (next: Dispatch) => (action: Action) => {
  console.log(action);
  console.log(s.getState);
  return next(action);
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(applyMiddleware(logger));
