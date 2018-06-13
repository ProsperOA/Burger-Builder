import * as React from 'react';

import * as styles from './logo.component.css';
import burgerLogo from '../../../assets/images/burger-logo.png';

const Logo: React.SFC<{}> = (props: {}): JSX.Element => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;
