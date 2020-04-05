import { createSelector } from '@ngrx/store';
import { State } from '../index';
import { dishesEntityAdapter } from './dishes.reducer';

const getDishesState = (state: State) => state.dishes;

const { selectAll, selectEntities, selectIds, selectTotal } = dishesEntityAdapter.getSelectors();

const getDishes = createSelector(
    getDishesState,
    (state) => selectAll(state)
);

const getTemplates = createSelector(
    getDishesState,
    (state) => state.templates
);

const getSelectedDishId = createSelector(
    getDishesState,
    (state) => state.selectedDish
);

const getSelectedDish = createSelector(
    getDishes,
    getSelectedDishId,
    (dishes, selectedId) => {
        return dishes.find(dish => dish.id === selectedId) || null;
    }
);

export const dishesQuery = {
    getDishes,
    getTemplates,
    getSelectedDish
};
