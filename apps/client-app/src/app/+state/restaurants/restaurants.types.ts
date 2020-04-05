import { Restaurant } from '@bon-appetit/interfaces';

export const RestaurantsActions = {
    FETCH_RESTAURANTS: 'Fetch Restaurants',
    FETCH_RESTAURANTS_SUCCESS: 'Fetch Restaurants Success',
    FETCH_RESTAURANTS_ERROR: 'Fetch Restaurants Error',
    SELECTED_RESTAURANT: 'Selected Restaurant'
};

export interface FetchRestaurantsAction {
    type: typeof RestaurantsActions.FETCH_RESTAURANTS,
}
export interface FetchRestaurantsSuccessAction {
    type: typeof RestaurantsActions.FETCH_RESTAURANTS_SUCCESS
    restaurants: Restaurant[]
}
export type RestaurantsActionTypes = FetchRestaurantsAction | FetchRestaurantsSuccessAction;

export const fetchRestaurantsSuccess = (restaurants: Restaurant[]): FetchRestaurantsSuccessAction => {
    return {
        type: RestaurantsActions.FETCH_RESTAURANTS_SUCCESS,
        restaurants,
    }
};

export const fetchRestaurants = (): FetchRestaurantsAction => {
    return {
        type: RestaurantsActions.FETCH_RESTAURANTS,
    }
};

export const fetchRestaurantsError = () => {
    return {
        type: RestaurantsActions.FETCH_RESTAURANTS_ERROR
    }
};

export const selectedRestaurant = (restaurantId: number) => {
    return {
        type: RestaurantsActions.SELECTED_RESTAURANT,
        restaurantId
    }
};

