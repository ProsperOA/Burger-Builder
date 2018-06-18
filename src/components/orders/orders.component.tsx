import * as React                    from 'react';
import { connect, Dispatch         } from 'react-redux';
import axios                         from '../../axios-instances/orders.instance';
import * as actions                  from '../../store/actions';
import { AppState                  } from '../../store/reducers';
import { StoreState                } from '../../store/reducers/order.reducer';

import withErrorHandler from '../error-handler/error-handler.component';
import Order            from './order/order.component';
import Spinner          from '../ui/spinner/spinner.component';

interface PropTypes extends StoreState {
  fetchOrders: () => Dispatch<actions.OrderAction>;
}

class Orders extends React.Component<PropTypes, {}> {

  public componentDidMount(): void {
    this.props.fetchOrders();
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.props.loading ? <Spinner /> : this.props.orders.map((order: any) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ order: { orders, loading }}: AppState) => ({
  orders, loading
});

const mapDispatchToProps = (dispatch: Dispatch<actions.OrderAction>) => ({
  fetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
