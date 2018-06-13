import * as React from 'react';

import * as styles  from './build-controls.component.css';
import BuildControl from './build-control/build-control.component';
import Control      from '../../../models/control.model';

interface PropTypes {
  disabled:          {[key: string]: boolean};
  ingredientAdded:   (ingredient: string) => void;
  ingredientRemoved: (ingredient: string) => void;
  ordered:           () => void;
  price:             number;
  purchaseable:      boolean;
}

class BuildControls extends React.Component<PropTypes, {}> {
  private controls: Control[] = [
    {label: 'Salad',  ingredient: 'salad'},
    {label: 'Bacon',  ingredient: 'bacon'},
    {label: 'Cheese', ingredient: 'cheese'},
    {label: 'Meat',   ingredient: 'meat'}
  ];

  public render() {
    return (
      <div className={styles.BuildControls}>
        <p>Current Price <strong>${this.props.price.toFixed(2)}</strong></p>
        {this.controls.map(ctrl => (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            ingredient={ctrl.ingredient}
            added={this.props.ingredientAdded.bind(this, ctrl.ingredient)}
            removed={this.props.ingredientRemoved.bind(this, ctrl.ingredient)}
            disabled={this.props.disabled[ctrl.ingredient]} />
        ))}
        <button
          className={styles.OrderButton}
          disabled={!this.props.purchaseable}
          onClick={this.props.ordered}>
          ORDER NOW
        </button>
      </div>
    );
  }
}

export default BuildControls;
