import { Dish } from '@bon-appetit/interfaces';

export const DishesActions = {
    FETCH_DISHES: 'Fetch Dishes',
    FETCH_DISHES_SUCCESS: 'Fetch Dishes Success',
    FETCH_DISHES_ERROR: 'Fetch Dishes Error',
};

export interface FetchDishes {
    type: typeof DishesActions.FETCH_DISHES;
}

export interface FetchDishesSuccess {
    type: typeof DishesActions.FETCH_DISHES_SUCCESS;
    dishes: Dish[];
}

export interface FetchDishesError {
    type: typeof DishesActions.FETCH_DISHES_ERROR;
}

export const fetchDishes = (): FetchDishes => {
    return {
        type: DishesActions.FETCH_DISHES,
    }
};

export const fetchDishesSuccess = (dishes: Dish[]): FetchDishesSuccess => {
    return {
        type: DishesActions.FETCH_DISHES_SUCCESS,
        dishes,
    }
};

export const fetchDishesError = (): FetchDishesError => {
    return {
        type: DishesActions.FETCH_DISHES_ERROR
    }
};

export type DishesActionsType =
    FetchDishes |
    FetchDishesSuccess |
    FetchDishesError;
