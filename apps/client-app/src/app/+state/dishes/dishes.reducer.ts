import { Dish } from '@bon-appetit/interfaces';
import { DishesActions, DishesActionsType } from './dishes.types';
import { updateObject } from '../../utility/utility';

export interface DishesState {
    dishes: Dish[];
    loaded: boolean;
    error: boolean;
}

const INITIAL_STATE: DishesState = {
    dishes: [],
    loaded: true,
    error: false,
};

const fetchDishes = (state) => {
    return updateObject(state, {
        loaded: false,
    });
};

const fetchDishesSuccess = (state, action) => {
    return updateObject(state, {
        dishes: action.dishes,
        loaded: true,
    });
};

export const fetchDishesError = (state) => {
    return updateObject(state, {
        error: true,
    });
};

export const dishesReducer = (state = INITIAL_STATE, action: DishesActionsType) => {
    const payload = {
        [DishesActions.FETCH_DISHES]: fetchDishes,
        [DishesActions.FETCH_DISHES_SUCCESS]: fetchDishesSuccess,
        [DishesActions.FETCH_DISHES_ERROR]: fetchDishesError
    };

    return (payload[action.type] || (() => state))(state, action);
};
