import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';

import { baseQuery } from './baseQuery';

export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery,
    tagTypes: ['Companies'],
    endpoints: (builder) => ({
        getCompanyData: builder.query<
            {
                ico: string;
                dic: string;
                name: string;
                address: {
                    street: string;
                    city: string;
                    houseNumber: string;
                    zip: number;
                };
            },
            { companyRegistrationNumber: number }
        >({
            providesTags: ['Companies'],
            query: ({ companyRegistrationNumber }) => ({
                url: config.api.endpoints.ares,
                method: 'GET',
                params: { ico: String(companyRegistrationNumber).padStart(8, '0') },
            }),
        }),
    }),
});

export const { useLazyGetCompanyDataQuery } = appApi;
