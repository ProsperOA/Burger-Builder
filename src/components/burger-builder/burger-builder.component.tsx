import * as React              from 'react';
import * as _                  from 'lodash';
import { connect, Dispatch   } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import axios                   from '../../axios-instances/orders.instance';
import * as actions            from '../../store/actions';
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
  initIngredients:     ()             => Dispatch<actions.BurgerBuilderAction>;
}

interface State {
  purchasing: boolean;
}

class BurgerBuilder extends React.Component<PropTypes, State> {
  public state: Readonly<State> = { purchasing: false };

  public componentDidMount(): void {
    this.props.initIngredients();
  }

  public updatePurchaseState = (): boolean => _.sum(_.values(this.props.ingredients)) > 0;

  public purchaseHandler = (): void => this.setState({ purchasing: true });

  public purchaseCancelHandler = (): void => this.setState({ purchasing: false });

  public purchaseContinueHandler = (): void => this.props.history.push('/checkout');

  public render(): JSX.Element {
    const errJSX: JSX.Element = (
      <p style={{textAlign: 'center', margin: 15}}>Ingredients cannot be loaded</p>
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
          {!this.props.ingredients ? <Spinner /> :
            <OrderSummary
              ingredients={this.props.ingredients}
              price={this.props.totalPrice}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler} />}
        </Modal>
        {!this.props.ingredients ?
          (this.props.error ? errJSX : <Spinner />) :
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

const mapStateToProps = ({ burgerBuilder: state}: any) => ({
  ingredients: state.ingredients,
  totalPrice:  state.totalPrice,
  error:       state.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onIngredientAdded:   (name: string) => dispatch(actions.addIngredient(name)),
  onIngredientRemoved: (name: string) => dispatch(actions.removeIngredient(name)),
  initIngredients:     ()             => dispatch(actions.initIngredients())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
