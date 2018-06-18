import * as React                           from 'react';
import { connect                          } from 'react-redux';
import { Dispatch                         } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { cloneDeep                        } from 'lodash';
import axios                                from '../../../axios-instances/orders.instance';
import { AppState                         } from '../../../store/reducers';
import { StoreState as OrderState         } from '../../../store/reducers/order.reducer';
import { StoreState as BurgerBuilderState } from '../../../store/reducers/burger-builder.reducer';

import * as actions     from '../../../store/actions/order.actions';
import * as styles      from './contact-data.component.css';
import Button           from '../../ui/button/button.component';
import Spinner          from '../../ui/spinner/spinner.component';
import withErrorHandler from '../../error-handler/error-handler.component';
import FormControl, {
  formControlToInput,
  validateFormControl
} from '../../../models/form-control.model';

interface PropTypes extends OrderState, BurgerBuilderState, RouteComponentProps<{}> {
  onOrderBurger: (orderData: object) => Dispatch<actions.OrderAction>;
}

interface State {
  orderForm:   {[name: string]: FormControl};
  formIsValid: boolean;
}

class ContactData extends React.Component<PropTypes, State> {
  public state: Readonly<State> = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          'type': 'text',
          placeholder: 'Full Name'
        },
        value: '',
        validation: {
          required: true,
          minLength: 1,
          maxLength: 20
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          'type': 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      address: {
        elementType: 'input',
        elementConfig: {
          'type': 'text',
          placeholder: 'Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        valid: true
      }
    },
    formIsValid: false,
  }

  public orderHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    const formData: any = {};

    for (const formElementID of Object.keys(this.state.orderForm)) {
      formData[formElementID] = this.state.orderForm[formElementID].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price:       this.props.totalPrice,
      orderData:   formData
    };

    this.props.onOrderBurger(order);
  }

  public inputChangedHandler = (
    inputID: string,
    e:       React.SyntheticEvent<HTMLInputElement>
  ): void => {
    const updatedOrderForm: any = cloneDeep(this.state.orderForm);
    const updatedFormElement: any = updatedOrderForm[inputID];

    updatedOrderForm[inputID] = updatedFormElement;

    updatedFormElement.touched = true;
    updatedFormElement.value   = e.currentTarget.value;
    updatedFormElement.valid   = validateFormControl(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    let formIsValid: boolean = true;
    for (inputID of Object.keys(updatedOrderForm)) {
      formIsValid = updatedOrderForm[inputID].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    });
  }


  public render(): JSX.Element {
    return (
      <div className={styles.ContactData}>
        <h4>Enter you contact data</h4>
        {this.props.loading ? <Spinner /> :
          <form>
            {formControlToInput(
              this.state.orderForm,
              this.inputChangedHandler,
              this
            ).map(input => input)}
            <Button
              buttonType="Success"
              clicked={this.orderHandler}
              disabled={!this.state.formIsValid}>
              ORDER
            </Button>
          </form>}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice:  state.burgerBuilder.totalPrice,
  loading:     state.order.loading
});

const mapDispatchToProps = (dispatch: Dispatch<actions.OrderAction>) => ({
  onOrderBurger: (orderData: object) => dispatch(actions.purchaseBurger(orderData))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
);
