import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { config } from 'config';
import { setAnonymous, setToken } from 'core/auth/services';
import { RootState } from 'store';

export const baseQuery = fetchBaseQuery({
    baseUrl: config.api.url,
    credentials: 'include',
    prepareHeaders: async (headers: Headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        if (token) {
            headers.set('x-auth-token', token);
        }
        return headers;
    },
});
export const baseQueryWithAuthRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshResult: QueryReturnValue<any, FetchBaseQueryError, FetchBaseQueryMeta> = await baseQuery(
            { url: '/v3/refresh', method: 'POST' },
            api,
            extraOptions,
        );
        if (refreshResult.data) {
            api.dispatch(setToken(refreshResult.data.authToken));
            // retry the initial query

            const baseQuery2 = fetchBaseQuery({
                baseUrl: config.api.url,
                credentials: 'include',
                prepareHeaders: async (headers: Headers) => {
                    if (refreshResult.data.authToken) {
                        headers.set('x-auth-token', refreshResult.data.authToken);
                    }
                    return headers;
                },
            });

            result = await baseQuery2(args, api, extraOptions);
        } else {
            api.dispatch(setAnonymous());
        }
    }

    return result;
};
