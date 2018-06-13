import * as React from 'react';

import * as styles     from './side-drawer.component.css';
import Logo            from '../../ui/logo/logo.component';
import NavigationItems from '../navigation-items/navigation-items.component';
import Backdrop        from '../../ui/modal/backdrop/backdrop.component';

interface PropTypes {
  closed: () => void;
  open:   boolean;
}

const SideDrawer: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => {
  const attachedClasses: string[] = [
    styles.SideDrawer, props.open ? styles.Open : styles.Close
  ];

  return (
    <React.Fragment>
      <Backdrop
        show={props.open}
        clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
