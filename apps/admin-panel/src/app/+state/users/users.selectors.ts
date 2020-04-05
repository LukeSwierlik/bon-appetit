import { State } from '../index';
import { usersEntityAdapter } from './users.reducer';
import { createSelector } from '@ngrx/store';

const getUsersState = (state: State) => state.users;

const { selectAll, selectEntities, selectIds, selectTotal } = usersEntityAdapter.getSelectors();

const getUsers = createSelector(
    getUsersState,
    (state) => {
        return selectAll(state);
    }
);

const getSelectedUser = createSelector(
    getUsersState,
    (state) => state.selectedUser
);

const getUser = createSelector(
    getUsers,
    getSelectedUser,
    (users, selectedUser) => {
        return users.find(user => user.id === selectedUser) || null;
    }
);

export const usersQuery = {
    getUsers,
};
