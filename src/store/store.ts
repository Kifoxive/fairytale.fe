import { configureStore } from '@reduxjs/toolkit';
import { appApi, authApi } from 'core/api';
import { appSlice } from 'core/application';
import { authSlice } from 'core/auth';
import { carrierApi } from 'modules/carriers/services';
import { reservationApi } from '../pages/ReservationPage/api/index';

const slices = {
    [authSlice.name]: authSlice.reducer,
    [appSlice.name]: appSlice.reducer,
};

const apis = {
    [appApi.reducerPath]: appApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [carrierApi.reducerPath]: carrierApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
};

const middleware = [appApi.middleware, authApi.middleware, carrierApi.middleware];

// Register reducers here from individual modules
export const store = configureStore({
    reducer: {
        ...slices,
        ...apis,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});
