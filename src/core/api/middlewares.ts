import { AnyAction, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { setAnonymous, setAuthenticated } from 'core/auth/services';
import { AppDispatch } from 'store';

import { authApi } from './authApi';

const ignoredEndpointsForMiddleware = [authApi.endpoints.loginUser.name, authApi.endpoints.refreshToken.name];

export const handleExpiredTokenMiddleware: Middleware =
    (storeAPI: MiddlewareAPI<AppDispatch>) => (next) => async (action: AnyAction) => {
        if (
            action.error &&
            action.payload &&
            action.payload.originalStatus === 401 &&
            !ignoredEndpointsForMiddleware.includes(action.meta.arg.endpointName)
        ) {
            // call the refresh endpoint
            const refreshResult = await storeAPI.dispatch(authApi.endpoints.refreshToken.initiate(null));

            if ('error' in refreshResult || !refreshResult?.data?.accessToken) return storeAPI.dispatch(setAnonymous());
            // save the new accessToken to the state and localStorage
            storeAPI.dispatch(setAuthenticated({ token: refreshResult.data.accessToken }));
            // call the getMe endpoint to get the user credentials
            await storeAPI.dispatch(authApi.endpoints.getMe.initiate(null));
            return next(action);
            // storeAPI.dispatch(action);
        }

        return next(action);
    };
