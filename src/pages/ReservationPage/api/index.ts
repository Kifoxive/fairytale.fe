import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { baseQueryWithAuthRefresh } from 'core/api/baseQuery';

import { PostReservationRequest, PostReservationResponse } from '../types';

export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery: baseQueryWithAuthRefresh,
    tagTypes: ['Reservation', 'ReservationItem'],
    endpoints: (builder) => ({
        postReservation: builder.mutation<PostReservationResponse, PostReservationRequest>({
            query: (body) => ({
                url: config.api.endpoints.reservation,
                body,
                method: 'POST',
            }),
            invalidatesTags: (_, error, arg) => (error ? [] : ['Reservation']),
        }),
    }),
});

export const { usePostReservationMutation } = reservationApi;
