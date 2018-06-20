import * as React  from 'react';
import { NavLink } from 'react-router-dom';

import * as styles from './navigation-item.component.css';

interface PropTypes {
  children: string;
  link?:    string;
  active?:  boolean;
  anchor?:  boolean;
  clicked?: any
}

const NavigationItem: React.SFC<PropTypes> = (props: PropTypes): JSX.Element => {
  return <li className={styles.NavigationItem}>
    {props.anchor
      ? <a onClick={props.clicked}>{props.children}</a>
      : <NavLink
          to={props.link}
          exact={true}
          activeClassName={styles.active}>
          {props.children}
        </NavLink>}
  </li>
};

export default NavigationItem;
