import * as React from 'react';

import * as styles from './layout.component.css';
import Toolbar     from '../navigation/toolbar/toolbar.component';
import SideDrawer  from '../navigation/side-drawer/side-drawer.component';

interface PropTypes {
  children: any;
}

interface State {
  showSideDrawer: boolean;
}

class Layout extends React.Component<PropTypes, State> {
  public state: Readonly<State> = { showSideDrawer: false };

  public sideDrawerClosedHandler = (): void => this.setState({ showSideDrawer: false });

  public sideDrawerToggleHandler = (): void => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer} />
        <main className={styles.content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

export default Layout;
