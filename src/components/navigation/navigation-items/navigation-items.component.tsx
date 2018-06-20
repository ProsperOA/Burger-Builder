import * as React   from 'react';
import { connect, Dispatch }  from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../../store/reducers';
// import { StoreState as AuthState } from '../../../store/reducers/auth.reducer';
import * as actions from '../../../store/actions';

import * as styles    from './navigation-items.component.css';
import NavigationItem from './navigation-item/navigation-item.component';

interface PropTypes extends RouteComponentProps<{}> {
  isAuth: boolean;
  logout: () => any; // FIXME: add type
}

class NavigationItems extends React.Component<PropTypes, {}> {

  public logoutHandler = (): void => {
    this.props.history.push('/');
    this.props.logout();
  };

  public render(): JSX.Element {
    return (
      <ul className={styles.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {this.props.isAuth && <NavigationItem link="/orders">Orders</NavigationItem>}
        {!this.props.isAuth
          ? <NavigationItem link="/auth">Signin</NavigationItem>
          : <NavigationItem anchor={true} clicked={this.logoutHandler}>Logout</NavigationItem>}
      </ul>
    );
  }
}

const mapStateToProps = ({ auth: { token }}: AppState) => ({ isAuth: token !== null });

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthLogout>) => ({
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(NavigationItems)
);
