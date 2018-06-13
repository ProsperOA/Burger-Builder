import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import CheckoutSummary from './checkout-summary/checkout-summary.component';
import ContactData     from '../checkout/contact-data/contact-data.component';
import Spinner         from '../ui/spinner/spinner.component';

interface State {
  ingredients: {[key: string]: number};
  totalPrice:  number;
}

class Checkout extends React.Component<RouteComponentProps<{}>, State> {
  public state: State = {
    ingredients: null,
    totalPrice:  0
  };

  public componentDidMount(): void {
    const { ingredients, totalPrice } = this.props.location.state;
    this.setState({ ingredients, totalPrice });
  };

  public checkoutCancelledHandler = (): void => this.props.history.goBack();

  public checkoutContinuedHandler = (): void => {
    this.props.history.replace('/checkout/contact-data');
  };

  public renderContactData = (): JSX.Element => (
    <ContactData
      ingredients={this.state.ingredients}
      totalPrice={this.state.totalPrice} />
  );

  public render(): JSX.Element {
    return (
      <div>
        {!this.state.ingredients || !this.state.totalPrice ? <Spinner /> :
          <CheckoutSummary
            ingredients={this.state.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />}
          <Route
            path={this.props.match.path + '/contact-data'}
            render={this.renderContactData} />
      </div>
    );
  }
}

export default Checkout;
