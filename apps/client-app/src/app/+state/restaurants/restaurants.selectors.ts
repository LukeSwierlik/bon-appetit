import { createSelector } from 'reselect';

const getRestaurantsData = (state) => state.restaurantsData;

const getRestaurants = createSelector(
    [getRestaurantsData],
    (restaurantsData) => restaurantsData.restaurants
);

const getSelectedRestaurantId = createSelector(
    [getRestaurantsData],
    (restaurantData) => restaurantData.selectedRestaurantId
);

const getSelectedRestaurant = createSelector(
    [getRestaurants,
    getSelectedRestaurantId],
    (restaurants, selectedRestaurantId) => {
        return restaurants.find(restaurant => restaurant.id === selectedRestaurantId) || null;
    }
);

export const restaurantsQuery = {
    getRestaurants,
    getSelectedRestaurant,
};
