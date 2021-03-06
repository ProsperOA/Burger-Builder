import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AxiosError } from 'axios';
import { cloneDeep } from 'lodash';
import { AppState } from '../../store/reducers';
import * as actions from '../../store/actions/auth.actions';

import * as styles from './auth.component.css';
import Button      from '../ui/button/button.component';
import Spinner     from '../ui/spinner/spinner.component';
import FormControl, {
  formControlToInput,
  validateFormControl
} from '../../models/form-control.model';

interface PropTypes {
  isAuth:           boolean;
  loading:          boolean;
  error:            AxiosError;
  authRedirectPath: string;
  buildingBurger:   boolean;
  auth: (email: string, password: string, isSignup: boolean) => Dispatch<actions.AuthAction>;
  setAuthRedirectPath: () => Dispatch<actions.SetAuthRedirectPath>;
}

interface State {
  controls: {[name: string]: FormControl};
  isSignup: boolean;
}

class Auth extends React.Component<PropTypes, State> {
  public state: Readonly<State> = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          'type': 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          'type': 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 20
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  public componentDidMount(): void {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.setAuthRedirectPath();
    }
  }

  public switchAuthMode = () => {
    this.setState((prevState: State) => ({ isSignup: !prevState.isSignup }));
  };

  public inputChangedHandler = (
    controlName: string,
    e:           React.SyntheticEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();

    const updatedControls = cloneDeep(this.state.controls);

    updatedControls[controlName].touched = true;
    updatedControls[controlName].value = e.currentTarget.value;
    updatedControls[controlName].valid = validateFormControl(
      e.currentTarget.value,
      this.state.controls[controlName].validation
    );

    this.setState({ controls: updatedControls });
  };

  public submitHandler = (event: any): void => {
    event.preventDefault();

    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  public render(): JSX.Element {
    return (
      <div className={styles.Auth}>
        {this.props.isAuth && <Redirect to={this.props.authRedirectPath} />}
        {this.props.error && <p>{this.props.error.message}</p>}
        {this.props.loading ? <Spinner /> :
          <form onSubmit={this.submitHandler}>
            {formControlToInput(
              this.state.controls,
              this.inputChangedHandler,
              this
            ).map(input => input)}
            <Button
              submit={true}
              buttonType="Success">
              Submit
            </Button>
            <Button
              buttonType="Danger"
              clicked={this.switchAuthMode}>
              Switch to {this.state.isSignup ? 'Signin' : 'Signup'}
            </Button>
          </form>}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, burgerBuilder }: AppState) => ({
  loading:          auth.loading,
  isAuth:           auth.token !== null,
  error:            auth.error,
  authRedirectPath: auth.authRedirectPath,
  buildingBurger:   burgerBuilder.building
});

const mapDispatchToProps = (dispatch: any) => ({
  auth: (email: string, password: string, isSignup: boolean) => {
    dispatch(actions.auth(email, password, isSignup))
  },
  setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
