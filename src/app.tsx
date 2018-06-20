import * as React from 'react';
import { Route, Switch, Redirect }  from 'react-router-dom';

import Auth          from './components/auth/auth.component';
import Layout        from './components/layout/layout.component';
import BurgerBuilder from './components/burger-builder/burger-builder.component';
import Checkout      from './components/checkout/checkout.component';
import Orders        from './components/orders/orders.component';

const App: React.SFC<{}> = (props: {}): JSX.Element => (
  <div>
    <Layout>
      <Switch>
        <Route path="/" exact={true} component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  </div>
);

export default App;
