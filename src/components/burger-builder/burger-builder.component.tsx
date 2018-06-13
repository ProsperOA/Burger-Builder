import * as React from 'react';
import * as _ from 'lodash';
import axios from '../../axios-instances/orders.instance';
import { RouteComponentProps } from 'react-router-dom';

import Burger                from '../burger/burger.component';
import BuildControls         from '../burger/build-controls/build-controls.component';
import OrderSummary          from '../burger/order-summary/order-summary.component';
import Modal                 from '../ui/modal/modal.component';
import Spinner               from '../ui/spinner/spinner.component';
import withErrorHandler      from '../error-handler/error-handler.component';
import { INGREDIENT_PRICES } from '../../models/ingredient.model';

interface State {
  ingredients:  {[key: string]: number};
  totalPrice:   number;
  purchaseable: boolean;
  purchasing:   boolean;
  loading:      boolean;
  error:        boolean;
}

class BurgerBuilder extends React.Component<RouteComponentProps<{}>, State> {
  public state: State = {
    ingredients:  null,
    totalPrice:   4,
    purchaseable: false,
    purchasing:   false,
    loading:      false,
    error:        false
  };

  public componentDidMount(): void {
    axios.get('/ingredients.json')
      .then(res => this.setState({ ingredients: res.data }))
      .catch(err => this.setState({ error: true }));
  }

  public updatePurchaseState = (updatedIngredients: any): void => {
    const sum: number = _.sum(_.values(updatedIngredients));
    this.setState({ purchaseable: sum > 0 });
  }

  public addIngredientHandler = (ingredient: string): void => {
    const prevCount: number = this.state.ingredients[ingredient];
    const updatedIngredients = {...this.state.ingredients};

    updatedIngredients[ingredient] = prevCount + 1;

    const priceAddition: number = INGREDIENT_PRICES[ingredient];
    const newPrice: number = this.state.totalPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  }

  public removeIngredientHandler = (ingredient: string): void => {
    const prevCount: number = this.state.ingredients[ingredient];
    if (prevCount <= 0) return;

    const updatedIngredients = {...this.state.ingredients};

    updatedIngredients[ingredient] = prevCount - 1;

    const priceDeduction: number = INGREDIENT_PRICES[ingredient];
    const newPrice: number = this.state.totalPrice + priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  }

  public purchaseHandler = (): void => this.setState({ purchasing: true });

  public purchaseCancelHandler = (): void => this.setState({ purchasing: false });

  public purchaseContinueHandler = (): void => {
    this.props.history.push('/checkout', {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice
    });
  }

  public render(): JSX.Element {
    const errJSX: JSX.Element = (
      <p style={{textAlign: 'center', margin: 15}}>Ingredients cant be loaded</p>
    );

    const disableInfo: any = {...this.state.ingredients}
    for (const key of Object.keys(disableInfo)) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {!this.state.ingredients || this.state.loading ? <Spinner /> :
            <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseCanceled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler} />}
        </Modal>
        {!this.state.ingredients ?
          (this.state.error ? errJSX : <Spinner />) :
          <React.Fragment>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disableInfo}
              price={this.state.totalPrice}
              purchaseable={this.state.purchaseable}
              ordered={this.purchaseHandler} />
          </React.Fragment>}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
