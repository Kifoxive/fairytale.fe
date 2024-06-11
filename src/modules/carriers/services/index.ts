import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from 'core/api/baseQuery';

import { PostOnboardingEmailSchema } from '../types';

export const carrierApi = createApi({
    reducerPath: 'carrierApi',
    baseQuery,
    tagTypes: ['Carriers', 'CarrierItem'],
    endpoints: (builder) => ({
        postOnboardingEmail: builder.mutation<{ [email: string]: boolean }, PostOnboardingEmailSchema>({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            }),
            invalidatesTags: (_, error, arg) =>
                error ? [] : ['Carriers', { type: 'CarrierItem', id: arg.carrier_id }],
        }),
    }),
});

export const { usePostOnboardingEmailMutation } = carrierApi;
