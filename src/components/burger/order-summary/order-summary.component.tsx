import * as React from 'react';

import Button from '../../ui/button/button.component';

interface PropTypes {
  ingredients:       {[key: string]: number};
  price:             number;
  purchaseContinued: () => void;
  purchaseCanceled:  () => void;
}

const OrderSummary: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => (
  <React.Fragment>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>
      {Object.keys(props.ingredients).map(ingredient => (
        <li key={ingredient}>
          <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
        </li>
      ))}
    </ul>
    <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
    <p>Continue to Checkout?</p>
    <Button
      buttonType="Danger"
      clicked={props.purchaseCanceled}>
      CANCEL
    </Button>
    <Button
      buttonType="Success"
      clicked={props.purchaseContinued}>
      CONTINUE
    </Button>
  </React.Fragment>
);

export default OrderSummary;
