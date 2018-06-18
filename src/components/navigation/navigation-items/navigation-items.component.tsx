import * as React from 'react';

import * as styles    from './navigation-items.component.css';
import NavigationItem from './navigation-item/navigation-item.component';

const NavigationItems: React.SFC<{}> = (props: {}): JSX.Element => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </ul>
);

export default NavigationItems;
