import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { baseQuery } from 'core/api/baseQuery';

import { GetEmailAvailability } from '../types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['User', 'UserItem'],
    endpoints: (builder) => ({
        getEmailAvailability: builder.query<GetEmailAvailability['response'], GetEmailAvailability['request']>({
            query: (params) => ({
                url: config.api.endpoints.emailAvailability,
                params,
                method: 'GET',
            }),
        }),
    }),
});

export const { useLazyGetEmailAvailabilityQuery } = userApi;
