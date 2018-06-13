import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from '../../../axios-instances/orders.instance';;

import * as styles from './contact-data.component.css';
import Button from '../../ui/button/button.component';
import Spinner from '../../ui/spinner/spinner.component';

interface PropTypes extends RouteComponentProps<{}> {
  ingredients: any;
  totalPrice:  number;
}

interface State {
  name:  string;
  email: string;
  address: {
    street:  string;
    zipcode: string;
  };
  loading: boolean;
}

class ContactData extends React.Component<PropTypes, State> {
  public state: State = {
    name: '',
    email: '',
    address: {
      street: '',
      zipcode: ''
    },
    loading: false
  }

  public orderHandler = (e: React.FormEvent): void => {
    e.preventDefault();

    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price:       this.props.totalPrice,
      customer: {
        name: 'Prosper',
        address: {
          street: '123 Road',
          zipcode: '133769',
          country: 'Africa'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    };

    axios.post('/orders.json', order)
      .then((res: any) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((err: any) => this.setState({ loading: false }));
  }

  public render(): JSX.Element {
    return (
      <div className={styles.ContactData}>
        <h4>Enter you contact data</h4>
        {this.state.loading ? <Spinner /> :
          <form>
            <input className={styles.Input} type="text" name="name" placeholder="Name" />
            <input className={styles.Input} type="email" name="email" placeholder="Email" />
            <input className={styles.Input} type="text" name="street" placeholder="Street" />
            <input className={styles.Input} type="text" name="zipcode" placeholder="Zip Code" />
            <Button buttonType="Success" clicked={this.orderHandler}>
              ORDER
            </Button>
          </form>}
      </div>
    );
  }
}

export default withRouter(ContactData);
