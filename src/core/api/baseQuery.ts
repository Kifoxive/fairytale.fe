import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { config } from 'config';
import { RootState } from 'store';

export const baseQuery = fetchBaseQuery({
    baseUrl: config.api.url,
    credentials: 'include',
    prepareHeaders: async (headers: Headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
