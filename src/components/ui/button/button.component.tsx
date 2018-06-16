import * as React from 'react';

import * as styles from './button.component.css';
import ButtonTypes from '../../../models/button-types.model';

interface PropTypes {
  buttonType: ButtonTypes;
  children:   any;
  disabled?:  boolean;
  clicked?:   any;
}

const Button: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => (
  <button
    className={[styles.Button, styles[props.buttonType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}>
    {props.children}
  </button>
);

export default Button;
