import { createAction, props } from '@ngrx/store';
import { Dish, Template } from '@bon-appetit/interfaces';

export const LoadDishes = createAction('[Dishes] Load Dishes');
export const SuccessLoadDishes = createAction('[Dishes] Success Load Dishes', props<{ dishes: Dish[] }>());

export const CreateDish = createAction('[Dishes] Create Dish', props<{ createDish: Dish; }>());
export const SuccessCreateDish = createAction('[Dishes] Success Create Dish', props<{ dish: Dish; }>());

export const LoadTemplates = createAction('[Dishes] Load Templates', props<{ companyId: number; }>());
export const SuccessLoadTemplates = createAction('[Dishes] Success Load Templates', props<{ templates: Template[]; }>());

export const RemoveDish = createAction('[Dishes] Remove Dish', props<{ dishId: number; }>());
export const SuccessRemoveDish = createAction('[Dishes] Success Remove Dish', props<{ dishId: number; }>());

export const SelectedDish = createAction('[Dishes] Selected Dish', props<{ id: number; }>());
export const EditDish = createAction('[Dishes] Edit Dish', props<{ editDish: Dish; }>());
export const SuccessEditDish = createAction('[Dishes] Success Edit Dish', props<{ editDish: Dish; }>());
