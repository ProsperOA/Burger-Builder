import * as React from 'react';

import * as styles from './order.component.css';

interface PropTypes {
  key:         string;
  price:       number;
  ingredients: {[key: string]: number};
}

const Order: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => {
  const ingredients: Array<{name: string, amount: number}> = [];

  for (const key of Object.keys(props.ingredients)) {
    ingredients.push({
      name:   key,
      amount: props.ingredients[key]
    });
  }

  return (
    <div className={styles.Order}>
      <p>
        Ingredients: {ingredients.map((ingredient, index) => (
          <span
            key={index}
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: 5
            }}>
            {ingredient.name} ({ingredient.amount})
          </span>
        ))}
      </p>
      <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;
