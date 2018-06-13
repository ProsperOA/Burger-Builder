import * as React from 'react';

import * as styles from './spinner.component.css';

const Spinner: React.SFC<{}> = (): JSX.Element => (
  <div className={styles.Loader}>Loading...</div>
);

export default Spinner;
