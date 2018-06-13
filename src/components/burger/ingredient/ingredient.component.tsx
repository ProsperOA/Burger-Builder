import * as React from 'react';

import * as styles from './ingredient.component.css';

interface PropTypes {
  key?: any;
  kind: string;
}

class Ingredient extends React.Component<PropTypes, {}> {
  public render() {
    let ingredient: JSX.Element;

    switch (this.props.kind) {
      case 'bread-bottom':
        ingredient = <div className={styles.BreadBottom} />;
        break;
      case 'bread-top':
        ingredient = (
          <div className={styles.BreadTop}>
            <div className={styles.Seeds1} />
            <div className={styles.Seeds1} />
          </div>
        );
        break;
      case 'meat':
        ingredient = <div className={styles.Meat} />;
        break;
      case 'bacon':
        ingredient = <div className={styles.Bacon} />;
        break;
      case 'cheese':
        ingredient = <div className={styles.Cheese} />;
        break;
      case 'salad':
        ingredient = <div className={styles.Salad} />;
        break;
      default:
        return <div>Invalid ingredient kind</div>;
    }

    return ingredient;
  }
}

export default Ingredient;
