import * as React from 'react';

import * as styles from './checkout-summary.component.css';
import Burger from '../../burger/burger.component';
import Button from '../../ui/button/button.component';

interface PropTypes {
  ingredients:       object;
  checkoutContinued: () => void;
  checkoutCancelled: () => void;
}

const CheckoutSummary: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => (
  <div className={styles.OrderSummary}>
    <h1>We hope it tastes great!</h1>
    <div style={{width: '100%', margin: 'auto'}}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button
      buttonType='Danger'
      clicked={props.checkoutCancelled}>
      Cancel
    </Button>
    <Button
      buttonType='Success'
      clicked={props.checkoutContinued}>
      Continue
    </Button>
  </div>
);

export default CheckoutSummary;
