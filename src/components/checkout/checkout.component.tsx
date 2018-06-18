import * as React                               from 'react';
import { connect                              } from 'react-redux';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { AppState                             } from '../../store/reducers';
import { StoreState as BurgerBuilderState     } from '../../store/reducers/burger-builder.reducer';
import { StoreState as OrderState             } from '../../store/reducers/order.reducer';

import CheckoutSummary from './checkout-summary/checkout-summary.component';
import ContactData     from '../checkout/contact-data/contact-data.component';

interface PropTypes extends OrderState, BurgerBuilderState, RouteComponentProps<{}>{};

class Checkout extends React.Component<PropTypes, {}> {

  public checkoutCancelledHandler = (): void => this.props.history.goBack();

  public checkoutContinuedHandler = (): void => {
    this.props.history.replace('/checkout/contact-data');
  };

  public render(): JSX.Element {
    return (
      <div>
        {!this.props.ingredients || this.props.purchased ? <Redirect to="/" /> :
          <React.Fragment>
            <CheckoutSummary
              ingredients={this.props.ingredients}
              checkoutCancelled={this.checkoutCancelledHandler}
              checkoutContinued={this.checkoutContinuedHandler} />
            <Route
              path={this.props.match.path + '/contact-data'}
              component={ContactData} />
          </React.Fragment>}
      </div>
    );
  }
}

const mapStateToProps = ({ burgerBuilder, order }: AppState) => ({
  ingredients: burgerBuilder.ingredients,
  purchased:   order.purchased
});

export default connect(mapStateToProps)(Checkout);
