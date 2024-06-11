import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'core/api';

// import jwt_decode from 'jwt-decode';
// import { AuthState, ITokenPayload } from '../types';
import { AuthState } from '../types';

const initialState: AuthState = {
    isAuthenticated: true,
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<{ token: string }>) => {
            localStorage.setItem('token', action.payload.token);
            state.accessToken = action.payload.token;
            state.isAuthenticated = true;
        },
        setAnonymous: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            // const decoded: ITokenPayload = jwt_decode(payload.accessToken);
            state.accessToken = payload.accessToken;
            state.user = payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', payload.accessToken);
        });
        builder.addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
            // const decoded: ITokenPayload = jwt_decode(payload.accessToken);
            state.accessToken = payload.accessToken;
            state.user = payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', payload.accessToken);
        });
        builder.addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, { payload }) => {
            // const decoded: ITokenPayload = jwt_decode(payload.authToken);
            state.accessToken = payload.accessToken;
            state.user = payload.user;
            state.isAuthenticated = true;
            localStorage.setItem('accessToken', payload.accessToken);
        });
        builder.addMatcher(authApi.endpoints.refreshToken.matchRejected, (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
        });
        builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, { payload }) => {
            state.user = payload;
        });
    },
});

export const { setAuthenticated, setAnonymous } = authSlice.actions;
