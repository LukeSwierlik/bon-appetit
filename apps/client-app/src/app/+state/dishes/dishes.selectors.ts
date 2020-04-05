import { createSelector } from 'reselect';

const getDishesData = (state) => state.dishesData;

const getDishes = createSelector(
    [getDishesData],
    (dishesData) => dishesData.dishes
);

export const dishesQuery = {
    getDishes
};
