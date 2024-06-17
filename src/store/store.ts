import { configureStore } from '@reduxjs/toolkit';
import { appApi, authApi } from 'core/api';
import { handleExpiredTokenMiddleware } from 'core/api/middlewares';
import { appSlice } from 'core/application';
import { authSlice } from 'core/auth';
import { carrierApi } from 'modules/carriers/services';
import { mealCategoryApi } from 'modules/mealCategories';
import { mealApi } from 'modules/meals';

import { reservationApi } from '../modules/reservations/api';
import { userApi } from '../pages/UserTablePage/api';

const slices = {
    [authSlice.name]: authSlice.reducer,
    [appSlice.name]: appSlice.reducer,
};

const apis = {
    [appApi.reducerPath]: appApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [carrierApi.reducerPath]: carrierApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [mealCategoryApi.reducerPath]: mealCategoryApi.reducer,
    [mealApi.reducerPath]: mealApi.reducer,
};

const middleware = [
    appApi.middleware,
    authApi.middleware,
    carrierApi.middleware,
    reservationApi.middleware,
    userApi.middleware,
    mealCategoryApi.middleware,
    mealApi.middleware,
    handleExpiredTokenMiddleware,
];

// Register reducers here from individual modules
export const store = configureStore({
    reducer: {
        ...slices,
        ...apis,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
});
