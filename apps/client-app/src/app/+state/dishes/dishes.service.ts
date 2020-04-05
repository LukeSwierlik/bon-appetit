import axios from 'axios';
import { DishesResource } from '@bon-appetit/resources';

export const loadDishes = (companyId: number, template: string) => axios.post(DishesResource.loadDishes, {
    companyId,
    template
});
