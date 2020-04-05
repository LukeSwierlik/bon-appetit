import { State } from '../index';
import { createSelector } from '@ngrx/store';

const getUser = (state: State) => state.auth;

const getAuthenticated = createSelector(
    getUser,
    (state ) => state.isAuthenticated
);

const getEmail = createSelector(
    getUser,
    (auth) => {
        return auth.user ? auth.user.email : ''
    }
);

const getUserId = createSelector(
    getUser,
    (auth) => auth.user ? auth.user.id : 0
);

const getUserRole = createSelector(
    getUser,
    (auth) => {
        return auth.user ? auth.user.userType : null
    }
);


const getUserInfo = createSelector(
    getUser,
    (user) => user ? user.user : null
);

export const authQuery = {
    getAuthenticated,
    getEmail,
    getUserId,
    getUserRole,
    getUserInfo
};
