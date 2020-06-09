import { createAction, props } from '@ngrx/store';
import { Restaurant, UpdateEntity } from '@bon-appetit/interfaces';

export const LoadRestaurants = createAction('[Restaurant] Load Restaurants');

export const SuccessLoadRestaurants = createAction(
    '[Restaurant] Success Fetch Restaurants',
    props<{ restaurants: Restaurant[] }>())
;

export const CreateRestaurant = createAction('[Restaurant] Create Restaurant', props<{ createRestaurant: Restaurant; }>());
export const SuccessCreateRestaurant = createAction('[Restaurant] Success Create Restaurant', props<{ restaurant: Restaurant; }>());

export const EditRestaurant = createAction('[Restaurant] Edit Restaurant', props<{ editRestaurant: Restaurant; }>());
export const SuccessEditRestaurant = createAction('[Restaurant] Success Edit Restaurant', props<{ changes: UpdateEntity<Restaurant>; }>());

export const RemoveRestaurant = createAction('[Restaurant] Remove Restaurant', props<{ restaurantId: number; }>());
export const SuccessRemoveRestaurant = createAction('[Restaurant] Success Remove Restaurant', props<{ restaurantId: number; }>());

export const SelectedRestaurant = createAction('[Restaurant] Selected Restaurant Company', props<{ restaurantId: number; }>());

export const LoadCategories = createAction('[Restaurant] Load Categories');
export const SuccessLoadCategories = createAction('[Restaurant] Succcess Load Categories', props<{ categories: []; }>());
export const FilterCategories = createAction('[Restaurant] Filter', props<{ categoryId: number; }>());

export const LoadCompanyRestaurants = createAction('[Restaurant] Load Company Restaurants');

export const SearchRestaurants = createAction('[Restaurant] Search Restaurants', props<{ searchQuery: string; }>());
