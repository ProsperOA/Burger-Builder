import * as React                          from 'react';
import { connect                         } from 'react-redux';
import { cloneDeep                       } from 'lodash';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios                               from '../../../axios-instances/orders.instance';;
import { StoreState                      } from '../../../store/reducers/burger-builder.reducer';

import * as styles from './contact-data.component.css';
import FormControl from '../../../models/form-control.model';
import Button      from '../../ui/button/button.component';
import Spinner     from '../../ui/spinner/spinner.component';
import Input       from '../../ui/input/input.component';

interface PropTypes extends StoreState, RouteComponentProps<{}>{};

interface State {
  orderForm:   {[name: string]: FormControl};
  formIsValid: boolean;
  loading:     boolean;
}

class ContactData extends React.Component<PropTypes, State> {
  public state: State = {
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
    loading: false
  }

  public orderHandler = (e: React.FormEvent): void => {
    e.preventDefault();
    this.setState({ loading: true });

    const formData: any = {};

    for (const formElementID of Object.keys(this.state.orderForm)) {
      formData[formElementID] = this.state.orderForm[formElementID].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price:       this.props.totalPrice,
      orderData:   formData
    };

    axios.post('/orders.json', order)
      .then((res: any) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((err: any) => this.setState({ loading: false }));
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
    updatedFormElement.valid   = this.validate(
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

  public validate = (value: any, rules: any): boolean => {
    let valid: boolean = true;

    if (!rules) return valid;

    if (rules.required) {
      valid = value.trim() !== '' && valid;
    }

    if (rules.minLength) {
      valid = value.length >= rules.minLength && valid;
    }

    if (rules.maxLength) {
      valid = value.length <= rules.maxLength && valid;
    }

    return valid;
  }

  public render(): JSX.Element {
    const formElements: any[] = [];

    for (const key of Object.keys(this.state.orderForm)) {
      formElements.push({
        id:     key,
        config: this.state.orderForm[key]
      });
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter you contact data</h4>
        {this.state.loading ? <Spinner /> :
          <form>
            {formElements.map(element => (
              <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                placeholder={element.config.placeholder}
                value={element.config.value}
                touched={element.config.touched}
                shouldValidate={element.config.validation}
                invalid={!element.config.valid}
                changed={this.inputChangedHandler.bind(this, element.id)} />
            ))}
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

const mapStateToProps = ({ burgerBuilder: { ingredients, totalPrice }}: any) => ({
  ingredients, totalPrice
});

export default connect(mapStateToProps, null)(
  withRouter(ContactData)
);
