import { DISHES_API } from './api';

export const DishesResource = {
    loadDishes: `${DISHES_API}/load`,
    createDish: `${DISHES_API}/create`,
    loadTemplates: (companyId: number) => `http://localhost:3333/api/restaurants/${companyId}/templates`,
    removeDish: (dishId: number) => `${DISHES_API}/remove/${dishId}`,
    editDish: `${DISHES_API}/edit`
};
