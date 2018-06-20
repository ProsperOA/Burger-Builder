import * as React            from 'react';
import { connect, Dispatch } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import * as actions from './store/actions';

import Auth          from './components/auth/auth.component';
import Layout        from './components/layout/layout.component';
import BurgerBuilder from './components/burger-builder/burger-builder.component';
import Checkout      from './components/checkout/checkout.component';
import Orders        from './components/orders/orders.component';

interface PropTypes extends RouteComponentProps<{}> {
  onAutoSignin: () => Dispatch<actions.AuthAction>;
}

class App extends React.Component<PropTypes, {}> {
  public componentDidMount(): void {
    this.props.onAutoSignin();
  }

  public render(): JSX.Element {
    return (
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
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  onAutoSignin: () => dispatch(actions.checkAuthState())
});

export default withRouter(connect(null, mapDispatchToProps)(App));
