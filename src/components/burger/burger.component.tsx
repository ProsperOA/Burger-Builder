import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as styles from './burger.component.css';
import Ingredient  from './ingredient/ingredient.component';

interface PropTypes extends RouteComponentProps<{}> {
  ingredients: object;
}

const Burger: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => {
  const ingredientsJSX: JSX.Element[] = [];

  Object.keys(props.ingredients).forEach(ingredient => {
    for (let i = 0; i < props.ingredients[ingredient]; i++) {
      ingredientsJSX.push(<Ingredient key={ingredient + i} kind={ingredient} />);
    }
  });

  ingredientsJSX.reduce((arr, val) => [...arr, val], []);

  return (
    <div className={styles.Burger}>
      <Ingredient kind="bread-top" />
      {ingredientsJSX.length > 0 ? ingredientsJSX : <p>Please start adding ingredients</p>}
      <Ingredient kind="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
