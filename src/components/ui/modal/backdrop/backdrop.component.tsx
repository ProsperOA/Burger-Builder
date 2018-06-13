import * as React from 'react';

import * as styles from './backdrop.component.css';

interface PropTypes {
  show:    boolean;
  clicked: () => void;
}

const Backrop: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => (
  props.show && <div className={styles.Backrop} onClick={props.clicked} />
);

export default Backrop;
