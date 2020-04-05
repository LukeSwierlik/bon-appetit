import { updateObject } from '../../utility/utility';
import { RestaurantsActions, RestaurantsActionTypes } from './restaurants.types';
import { Restaurant } from '@bon-appetit/interfaces';

export interface RestaurantsState {
    restaurants: Restaurant[];
    error: boolean;
    loaded: boolean;
    selectedRestaurantId: number;
    template: string;
}

const INITIAL_STATE: RestaurantsState = {
    restaurants: [],
    loaded: true,
    error: false,
    selectedRestaurantId: 0,
    template: '',
};

const fetchRestaurants = (state: RestaurantsState) => updateObject(state, {
    loaded: false,
});

const fetchRestaurantsSuccess = (state: RestaurantsState, action) => {
    return updateObject(state, {
        loaded: true,
        restaurants: action.restaurants
    });
};

const fetchRestaurantsError = (state, action) => updateObject(state, {
    error: action.error,
});

const selectedRestaurant = (state, action) => updateObject(state, {
    selectedRestaurantId: action.restaurantId
});

export const restaurantsReducer = (state = INITIAL_STATE, action: RestaurantsActionTypes) => {
    const payload = {
        [RestaurantsActions.FETCH_RESTAURANTS]: fetchRestaurants,
        [RestaurantsActions.FETCH_RESTAURANTS_SUCCESS]: fetchRestaurantsSuccess,
        [RestaurantsActions.FETCH_RESTAURANTS_ERROR]: fetchRestaurantsError,
        [RestaurantsActions.SELECTED_RESTAURANT]: selectedRestaurant,
    };

    return (payload[action.type] || (() => state))(state, action);
};
