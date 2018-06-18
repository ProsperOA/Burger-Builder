import * as React                     from 'react';
import { connect                    } from 'react-redux';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { StoreState                 } from '../../store/reducers/burger-builder.reducer';

import CheckoutSummary from './checkout-summary/checkout-summary.component';
import ContactData     from '../checkout/contact-data/contact-data.component';

interface PropTypes extends StoreState, RouteComponentProps<{}>{};

class Checkout extends React.Component<PropTypes, {}> {

  public checkoutCancelledHandler = (): void => this.props.history.goBack();

  public checkoutContinuedHandler = (): void => {
    this.props.history.replace('/checkout/contact-data');
  };

  public render(): JSX.Element {
    return (
      <div>
        {!this.props.ingredients ? <Redirect to="/" /> :
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

const mapStateToProps = ({ burgerBuilder: { ingredients }}: any) => ({
  ingredients
});

export default connect(mapStateToProps, null)(Checkout);
