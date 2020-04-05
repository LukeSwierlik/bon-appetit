import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@bon-appetit/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadUsers, LoadUsersSuccess, SelectedUser } from './users.actions';

export const usersEntityAdapter = createEntityAdapter<User>();

export interface UsersState extends EntityState<User> {
    error: boolean;
    loaded: boolean;
    selectedUser: number;
}

export const initialState: UsersState = usersEntityAdapter.getInitialState({
    error: false,
    loaded: true,
    selectedUser: 0,
});

const reducer = createReducer(
    initialState,
    on(LoadUsers, state => {
        return {
            ...state,
            loaded: false
        }
    }),
    on(LoadUsersSuccess, (state, action) => {
        return {
            ...usersEntityAdapter.addAll(action.users, {
                ...state,
                loaded: true
            })
        }
    }),
    on(SelectedUser, (state, { selectedUser }) => {
        return {
            ...state,
            selectedUser
        }
    })
);

export function usersReducer(state: UsersState | undefined, action: Action) {
    return reducer(state, action);
}


