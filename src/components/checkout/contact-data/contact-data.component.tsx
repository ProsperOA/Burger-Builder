import * as React from 'react';
import { cloneDeep } from 'lodash';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from '../../../axios-instances/orders.instance';;

import * as styles from './contact-data.component.css';
import Button from '../../ui/button/button.component';
import Spinner from '../../ui/spinner/spinner.component';
import Input from '../../ui/input/input.component';

interface PropTypes extends RouteComponentProps<{}> {
  ingredients: any;
  totalPrice:  number;
}

class ContactData extends React.Component<PropTypes, any> {
  public state: any = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          'type': 'text',
          placeholder: 'Full Name'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          'type': 'email',
          placeholder: 'Email'
        },
        value: ''
      },
      address: {
        elementType: 'input',
        elementConfig: {
          'type': 'text',
          placeholder: 'Address'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest'
      }
    },
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

    updatedFormElement.value = e.currentTarget.value;
    updatedOrderForm[inputID] = updatedFormElement;

    this.setState({ orderForm: updatedOrderForm });
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
                changed={this.inputChangedHandler.bind(this, element.id)} />
            ))}
            <Button buttonType="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>}
      </div>
    );
  }
}

export default withRouter(ContactData);
