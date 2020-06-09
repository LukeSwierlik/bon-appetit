import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { Action, createReducer, on } from '@ngrx/store';
import {
    FilterCategories,
    LoadRestaurants,
    SelectedRestaurant,
    SuccessCreateRestaurant, SuccessLoadCategories,
    SuccessLoadRestaurants
} from './restaurants.actions';
import { Restaurant } from '@bon-appetit/interfaces';


export const restaurantsEntityAdapter = createEntityAdapter<Restaurant>();

export interface RestaurantsState extends EntityState<Restaurant> {
    error: boolean;
    loaded: boolean;
    selectedRestaurant: number;
    template: string;
    categories: [];
    categoryId: number;
}

export const initialState: RestaurantsState = restaurantsEntityAdapter.getInitialState({
    error: false,
    loaded: false,
    selectedRestaurant: 0,
    template: '',
    categories: [],
    categoryId: 0,
});

export const reducer = createReducer(
    initialState,
    on(LoadRestaurants, state => ({
        ...state,
        loaded: false
    })),
    on(SuccessLoadRestaurants, (state, action) => {
        return restaurantsEntityAdapter.setAll(action.restaurants, {
            ...state,
            loaded: true
        });
    }),
    on(SelectedRestaurant, (state, action) => {
        return {
            ...state,
            selectedRestaurant: action.restaurantId
        }
    }),
    on(SuccessCreateRestaurant, (state, action) => {
        return restaurantsEntityAdapter.addOne(action.restaurant, {
            ...state,
            loaded: true
        });
    }),
    on(SuccessLoadCategories, (state, action) => {
        return {
            ...state,
            categories: action.categories
        }
    }),
    on(FilterCategories, (state, action) => {
        return {
            ...state,
            categoryId: action.categoryId
        }
    })
);

export function restaurantsReducer(state: RestaurantsState | undefined, action: Action) {
    return reducer(state, action);
}
