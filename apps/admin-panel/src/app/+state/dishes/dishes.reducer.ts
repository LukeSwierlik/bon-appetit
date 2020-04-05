import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Dish, Template } from '@bon-appetit/interfaces';
import {
    LoadDishes, SelectedDish,
    SuccessCreateDish,
    SuccessLoadDishes,
    SuccessLoadTemplates,
    SuccessRemoveDish
} from './dishes.actions';

export const dishesEntityAdapter = createEntityAdapter<Dish>();

export interface DishesState extends EntityState<Dish> {
    loaded: boolean;
    templates: Template[];
    selectedDish: number;
}

export const initialState: DishesState = dishesEntityAdapter.getInitialState({
    loaded: true,
    templates: [],
    selectedDish: 0,
});

const reducer = createReducer(
    initialState,
    on(LoadDishes, (state) => {
        return {
            ...state,
            loaded: false,
        }
    }),
    on(SuccessLoadDishes, (state, { dishes }) => {
        return dishesEntityAdapter.addAll(dishes, {
            ...state,
            loaded: true,
        });
    }),
    on(SuccessCreateDish, (state, { dish}) => {
        return dishesEntityAdapter.addOne(dish, state);
    }),
    on(SuccessLoadTemplates, (state, { templates }) => {
        return {
            ...state,
            templates
        }
    }),
    on(SuccessRemoveDish, (state, { dishId }) => {
        return dishesEntityAdapter.removeOne(dishId, state);
    }),
    on(SelectedDish, (state, { id }) => {
        return {
            ...state,
            selectedDish: id
        }
    })
);

export function dishesReducer(state: DishesState | undefined, action: Action) {
    return reducer(state, action);
}
