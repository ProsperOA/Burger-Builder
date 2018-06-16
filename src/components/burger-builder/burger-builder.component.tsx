import * as React              from 'react';
import * as _                  from 'lodash';
import { connect, Dispatch   } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import axios                   from '../../axios-instances/orders.instance';
import * as actions            from '../../store/actions/burger-builder.actions';
import { StoreState          } from '../../store/reducers/burger-builder.reducer';

import Burger           from '../burger/burger.component';
import BuildControls    from '../burger/build-controls/build-controls.component';
import OrderSummary     from '../burger/order-summary/order-summary.component';
import Modal            from '../ui/modal/modal.component';
import Spinner          from '../ui/spinner/spinner.component';
import withErrorHandler from '../error-handler/error-handler.component';

interface PropTypes extends StoreState, RouteComponentProps<{}> {
  onIngredientAdded:   (name: string) => Dispatch<actions.BurgerBuilderAction>;
  onIngredientRemoved: (name: string) => Dispatch<actions.BurgerBuilderAction>;
}

interface State {
  purchasing:   boolean;
  loading:      boolean;
  error:        boolean;
}

class BurgerBuilder extends React.Component<PropTypes, State> {
  public state: State = {
    purchasing:   false,
    loading:      false,
    error:        false
  };

  public componentDidMount(): void {
    // axios.get('/ingredients.json')
    //   .then(res => this.setState({ ingredients: res.data }))
    //   .catch(err => this.setState({ error: true }));
  }

  public updatePurchaseState = (): boolean => (
    _.sum(_.values(this.props.ingredients)) > 0
  );

  public purchaseHandler = (): void => this.setState({ purchasing: true });

  public purchaseCancelHandler = (): void => this.setState({ purchasing: false });

  public purchaseContinueHandler = (): void => this.props.history.push('/checkout');

  public render(): JSX.Element {
    const errJSX: JSX.Element = (
      <p style={{textAlign: 'center', margin: 15}}>Ingredients cant be loaded</p>
    );

    const disableInfo: any = {...this.props.ingredients}
    for (const key of Object.keys(disableInfo)) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {!this.props.ingredients || this.state.loading ? <Spinner /> :
            <OrderSummary
              ingredients={this.props.ingredients}
              price={this.props.totalPrice}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler} />}
        </Modal>
        {!this.props.ingredients ?
          (this.state.error ? errJSX : <Spinner />) :
          <React.Fragment>
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disableInfo}
              price={this.props.totalPrice}
              purchaseable={this.updatePurchaseState}
              ordered={this.purchaseHandler} />
          </React.Fragment>}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ burgerBuilder: { ingredients, totalPrice }}: any) => ({
  ingredients, totalPrice
});

const mapDispatchToProps = (dispatch: Dispatch<actions.BurgerBuilderAction>) => ({
  onIngredientAdded:   (name: string) => dispatch(actions.addIngredient(name)),
  onIngredientRemoved: (name: string) => dispatch(actions.removeIngredient(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
