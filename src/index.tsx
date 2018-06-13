import * as React        from 'react';
import * as ReactDOM     from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App                   from './app';
import registerServiceWorker from './register-service-worker';

const app: JSX.Element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);
registerServiceWorker();
