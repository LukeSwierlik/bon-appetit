import { fetchDishes, fetchDishesError, fetchDishesSuccess } from './dishes.types';
import { loadDishes } from './dishes.service';

export const fetchDishesAction = (companyId: number, template: string) => (dispatch) => {
  dispatch(fetchDishes());

  loadDishes(companyId, template)
      .then(res => {
          dispatch(fetchDishesSuccess(res.data));
      })
      .catch(e => {
          console.error('[fetchDishesAction] error', e);
          dispatch(fetchDishesError());
      });
};
