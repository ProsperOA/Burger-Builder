import {
  Store,
  Middleware,
  applyMiddleware,
  compose,
  Action,
  Dispatch
} from 'redux';
import thunk from 'redux-thunk';

const logger: Middleware = (s: Store) => (next: Dispatch) => (action: Action) => {
  return next(action);
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default composeEnhancers(applyMiddleware(logger, thunk));
