import * as React                    from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import axios                         from '../../axios-instances/orders.instance';

import withErrorHandler from '../error-handler/error-handler.component';
import Order            from './order/order.component';
import Spinner          from '../ui/spinner/spinner.component';

interface State {
  orders:  Array<{[id: string]: any}>;
  loading: boolean;
}

class Orders extends React.Component<{}, State> {
  public state: State = {
    orders: [],
    loading: true
  };

  public componentDidMount(): void {
    axios.get('/orders.json')
    .then((res: AxiosResponse) => {
      const fetchedOrders: any[] = [];

      for (const key of Object.keys(res.data)) {
        fetchedOrders.push({ id: key, ...res.data[key] });
      }

      this.setState({
        orders: fetchedOrders,
        loading: false
      });
    })
    .catch((err: AxiosError) => this.setState({ loading: false }))
  }

  public render(): JSX.Element {
    return (
      <div>
        {!this.state.orders ? <Spinner /> :
          this.state.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
