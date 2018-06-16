import * as React        from 'react';
import * as ReactDOM     from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore   } from 'redux';
import { Provider      } from 'react-redux';

import './index.css';
import App                   from './app';
import rootReducer           from './store/reducers';
import registerServiceWorker from './register-service-worker';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const app: JSX.Element = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);
registerServiceWorker();
