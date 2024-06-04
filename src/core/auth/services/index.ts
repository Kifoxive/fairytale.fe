import { createSlice } from '@reduxjs/toolkit';
import { authApi } from 'core/api';
import jwt_decode from 'jwt-decode';

import { AuthState, AuthToken } from '../types';

const initialState: AuthState = {
    isAuthenticated: true,
    user: null,
    token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAnonymous: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            const decoded: AuthToken = jwt_decode(payload.authToken);
            state.token = payload.authToken;
            state.user = {
                id: decoded.user_id,
                email: decoded.email,
                number: decoded.number,
                mobilePhone: decoded.mobilePhone,
                name: decoded.name,
                surname: decoded.surname,
                role: decoded.role,
                dispatcher_id: decoded?.dispatcher_id,
            };
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', payload.authToken);
        });
        builder.addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, { payload }) => {
            const decoded: AuthToken = jwt_decode(payload.authToken);
            state.token = payload.authToken;
            state.user = {
                id: decoded.user_id,
                email: decoded.email,
                number: decoded.number,
                mobilePhone: decoded.mobilePhone,
                name: decoded.name,
                surname: decoded.surname,
                role: decoded.role,
                dispatcher_id: decoded?.dispatcher_id,
            };
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', payload.authToken);
        });
        builder.addMatcher(authApi.endpoints.refreshToken.matchRejected, (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        });
    },
});

export const { setAnonymous, setToken } = authSlice.actions;
