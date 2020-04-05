import { createSelector } from '@ngrx/store';
import { restaurantsEntityAdapter } from './restaurants.reducer';
import { State } from '../index';

const getRestaurantsState = (state: State) => state.restaurants;

const { selectAll, selectEntities, selectIds, selectTotal } = restaurantsEntityAdapter.getSelectors();

const getRestaurants = createSelector(
    getRestaurantsState,
    (state) => selectAll(state)
);

const getRestaurant = createSelector(
    getRestaurantsState,
    getRestaurants,
    (state, restaurants) => {
        return restaurants.find(r => r.id === state.selectedRestaurant);
    }
);

const getRestaurantId = createSelector(
    getRestaurant,
    (restaurant) => restaurant ? restaurant.id : 0
);

const getRestaurantCompanyId = createSelector(
    getRestaurant,
    (restaurant) => restaurant ? restaurant.companyId : 0
);

const getTemplate = createSelector(
    getRestaurant,
    (restaurant) => restaurant ? restaurant.template : ''
);

const getSelectedRestaurant = createSelector(
    getRestaurantsState,
    (state) => state.selectedRestaurant
);

const getCategories = createSelector(
    getRestaurantsState,
    (state) => state.categories
);

const getCategoryId = createSelector(
    getRestaurantsState,
    (state) => state.categoryId
);

const getFilterRestaurant = createSelector(
    getRestaurants,
    getCategoryId,
    (restaurants, categoryId) => {
        if (categoryId) {
            return restaurants.filter(restaurant => restaurant.category.id === categoryId);
        } else {
            return restaurants;
        }
    }
);

export const restaurantsQuery = {
    getRestaurants,
    getRestaurant,
    getRestaurantId,
    getTemplate,
    getSelectedRestaurant,
    getRestaurantCompanyId,
    getCategories,
    getFilterRestaurant
};

