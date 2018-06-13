import * as React from 'react';

import * as styles from './drawer-toggle.component.css';

interface PropTypes {
  clicked: () => void;
}

const DrawerToggle: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => (
  <div className={styles.DrawerToggle} onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
);

export default DrawerToggle;
