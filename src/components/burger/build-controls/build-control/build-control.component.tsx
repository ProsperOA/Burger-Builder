import * as React from 'react';

import * as styles from './build-control.component.css';
import Control     from '../../../../models/control.model';

interface PropTypes extends Control {
  key:      any;
  added:    any;
  removed:  any;
  disabled: boolean;
}

const BuildControl: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label}</div>
    <button
      className={styles.Less}
      onClick={props.removed}
      disabled={props.disabled}>
      Less
    </button>
    <button
      className={styles.More}
      onClick={props.added}>
      More
    </button>
  </div>
);

export default BuildControl;
