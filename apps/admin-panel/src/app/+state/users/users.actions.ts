import { createAction, props } from '@ngrx/store';
import { User } from '@bon-appetit/interfaces';

export const LoadUsers = createAction('[Users] Load Users');
export const LoadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const SelectedUser = createAction('[Users] Selected User', props<{ selectedUser: number; }>());

export const SearchUsers = createAction('[Users] Search Users', props<{ searchQuery: string; }>());
