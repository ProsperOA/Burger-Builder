import * as React             from 'react';
import * as ReactDOM          from 'react-dom';
import { createStore, Store } from 'redux';
import { BrowserRouter      } from 'react-router-dom';
import { Provider           } from 'react-redux';
import enhancer               from './store/middlewares';

import './index.css';
import App                   from './app';
import rootReducer           from './store/reducers';
import registerServiceWorker from './register-service-worker';

const store: Store = createStore(rootReducer, enhancer);

const app: JSX.Element = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);
registerServiceWorker();
