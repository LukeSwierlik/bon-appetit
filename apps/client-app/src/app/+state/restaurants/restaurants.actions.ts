import {
    fetchRestaurants,
    fetchRestaurantsError,
    fetchRestaurantsSuccess,
    selectedRestaurant
} from './restaurants.types';
import { getRestaurants } from './restaurants.service';
import { fetchDishesAction } from '../dishes/dishes.actions';

export const fetchRestaurantsAction = () => (dispatch): void => {
    dispatch(fetchRestaurants());

    getRestaurants()
        .then((res) => {
            dispatch(fetchRestaurantsSuccess(res.data));
        })
        .catch((e) => {
            console.log('[fetchRestaurantsAction] error', e);
            dispatch(fetchRestaurantsError());
        });
};

export const selectedRestaurantAction = (restaurantId: number) => (dispatch) => {
    dispatch(selectedRestaurant(restaurantId));
};

export const fetchAndSelectRestaurantAction = (restaurantId: number) => (dispatch) => {
    dispatch(fetchRestaurants());

    getRestaurants()
        .then((res) => {
            dispatch(fetchRestaurantsSuccess(res.data));
            dispatch(selectedRestaurant(restaurantId));

            const restaurant = res.data.find(r => r.id === restaurantId);
            dispatch(fetchDishesAction(restaurant.companyId, restaurant.template))
        })
        .catch((e) => {
            console.log('[fetchAndSelectRestaurantAction] error', e);
            dispatch(fetchRestaurantsError());
        });
};
