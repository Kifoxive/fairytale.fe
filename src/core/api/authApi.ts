import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { LoginSchema } from 'core/auth/schemas';

import { baseQuery } from './baseQuery';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        loginUser: builder.mutation<{ authToken: string }, LoginSchema>({
            query(data) {
                return {
                    url: config.api.endpoints.login,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        refreshToken: builder.mutation({
            query() {
                return {
                    url: config.api.endpoints.refresh,
                    method: 'POST',
                };
            },
        }),
        logoutUser: builder.query({
            query() {
                return {
                    url: config.api.endpoints.logout,
                    method: 'POST',
                };
            },
        }),
    }),
});

export const { useLoginUserMutation, useRefreshTokenMutation, useLazyLogoutUserQuery } = authApi;
