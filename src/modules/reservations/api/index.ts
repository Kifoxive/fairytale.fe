import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { baseQuery } from 'core/api/baseQuery';

import { ChangeReservationStatus, GetAllReservations, PostReservation } from '../types';

export const reservationApi = createApi({
    reducerPath: 'reservationApi',
    baseQuery,
    tagTypes: ['Reservation', 'ReservationItem'],
    endpoints: (builder) => ({
        getAllReservations: builder.query<GetAllReservations['response'], GetAllReservations['request']>({
            query: (params) => ({
                url: config.api.endpoints.reservation,
                params,
                method: 'GET',
            }),
            providesTags: ['Reservation'],
        }),
        postReservation: builder.mutation<PostReservation['response'], PostReservation['request']>({
            query: (body) => ({
                url: config.api.endpoints.reservation,
                body,
                method: 'POST',
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Reservation']),
        }),
        changeReservationStatus: builder.mutation<
            ChangeReservationStatus['response'],
            ChangeReservationStatus['request']
        >({
            query: (body) => ({
                url: config.api.endpoints.changeReservationStatus,
                body,
                method: 'PATCH',
            }),
            invalidatesTags: (_, error, arg) =>
                error ? [] : ['Reservation', { type: 'ReservationItem', id: arg.data.reservation_id }],
        }),
    }),
});

export const { useGetAllReservationsQuery, usePostReservationMutation, useChangeReservationStatusMutation } =
    reservationApi;
