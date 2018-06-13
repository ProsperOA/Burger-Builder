import * as React from 'react';

import * as styles     from './toolbar.component.css';
import Logo            from '../../ui/logo/logo.component';
import NavigationItems from '../navigation-items/navigation-items.component';
import DrawerToggle    from '../side-drawer/drawer-toggle/drawer-toggle.component';

interface PropTypes {
  drawerToggleClicked: () => void;
}

const Toolbar: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
