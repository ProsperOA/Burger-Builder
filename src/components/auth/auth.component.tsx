import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { cloneDeep } from 'lodash';
import * as actions from '../../store/actions/auth.actions';

import * as styles from './auth.component.css';
import Button      from '../ui/button/button.component';
import FormControl, {
  formControlToInput,
  validateFormControl
} from '../../models/form-control.model';

interface PropTypes {
  auth: (email: string, password: string) => Dispatch<actions.AuthAction>;
}

interface State {
  controls: {[name: string]: FormControl};
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
    }
  }

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
      this.state.controls.password.value
    );
  };

  public render(): JSX.Element {
    return (
      <div className={styles.Auth}>
        <form onSubmit={this.submitHandler}>
          {formControlToInput(
            this.state.controls,
            this.inputChangedHandler,
            this
          ).map(input => input)}
          <Button
            buttonType="Success">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthAction>) => ({
  auth: (email: string, password: string) => dispatch(actions.auth(email, password))
});

export default connect(null, mapDispatchToProps)(Auth);
