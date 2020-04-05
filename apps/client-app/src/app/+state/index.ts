import { restaurantsReducer, RestaurantsState } from './restaurants/restaurants.reducer';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { authReducer, AuthState } from './auth/auth.reducer';
import { dishesReducer, DishesState } from './dishes/dishes.reducer';
import { ordersReducer, OrdersState } from './orders/orders.reducer';
import { reservationsReducer, ReservationsState } from './reservations/reservations.reducer';
import { CommonsState } from '../../../../shop/src/app/+state/commons/commons.reducer';
import { commonsReducer } from './commons/commons.reducer';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

export interface State {
    restaurantsData: RestaurantsState;
    authData: AuthState;
    dishesData: DishesState;
    ordersData: OrdersState;
    reservationsData: ReservationsState;
    commonsData: CommonsState;
}

const storeReducers = combineReducers({
    restaurantsData: restaurantsReducer,
    authData: authReducer,
    dishesData: dishesReducer,
    ordersData: ordersReducer,
    reservationsData: reservationsReducer,
    commonsData: commonsReducer,
});

const store = createStore(
    storeReducers,
    composeEnhancers(applyMiddleware(reduxThunk)),
);

export default store;
