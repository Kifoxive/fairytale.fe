import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { PostLogin } from 'core/auth/components/LoginPage/types';
import { PostRegister } from 'core/auth/components/RegisterPage/types';
import { IUser } from 'core/auth/types';

import { baseQuery } from './baseQuery';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        registerUser: builder.query<PostRegister['response'], PostRegister['request']>({
            query(data) {
                return {
                    url: config.api.endpoints.register,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        loginUser: builder.mutation<PostLogin['response'], PostLogin['request']>({
            query(data) {
                return {
                    url: config.api.endpoints.login,
                    method: 'POST',
                    body: data,
                };
            },
        }),
        refreshToken: builder.mutation<PostLogin['response'], null>({
            query() {
                return {
                    url: config.api.endpoints.refresh,
                    method: 'GET',
                };
            },
        }),
        getEmailAvailability: builder.query({
            query(params) {
                return {
                    url: config.api.endpoints.me,
                    params,
                };
            },
        }),
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: config.api.endpoints.me,
                    method: 'GET',
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
        confirmEmail: builder.query<{ success: boolean }, { linkId: string }>({
            query({ linkId }) {
                return {
                    url: `${config.api.endpoints.confirmEmail}/${linkId}`,
                    method: 'POST',
                };
            },
        }),
    }),
});

export const {
    useLazyRegisterUserQuery,
    useLoginUserMutation,
    useRefreshTokenMutation,
    useGetMeQuery,
    useLazyLogoutUserQuery,
    useConfirmEmailQuery,
} = authApi;
