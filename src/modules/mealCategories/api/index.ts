import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { baseQuery } from 'core/api/baseQuery';

import { PostMealCategory, GetAllMealCategories } from '../types';

export const mealCategoryApi = createApi({
    reducerPath: 'mealCategoryApi',
    baseQuery,
    tagTypes: ['MealCategory', 'MealCategoryItems'],
    endpoints: (builder) => ({
        getAllMealCategories: builder.query<GetAllMealCategories['response'], GetAllMealCategories['request']>({
            query: (params) => ({
                url: config.api.endpoints.mealCategory,
                params,
                method: 'GET',
            }),
            providesTags: ['MealCategory'],
        }),
        postMealCategory: builder.mutation<PostMealCategory['response'], PostMealCategory['request']>({
            query: (body) => ({
                url: config.api.endpoints.mealCategory,
                body,
                method: 'POST',
            }),
            invalidatesTags: (_, error) => (error ? [] : ['MealCategory']),
        }),
        // changeReservationStatus: builder.mutation<
        //     ChangeReservationStatus['response'],
        //     ChangeReservationStatus['request']
        // >({
        //     query: (body) => ({
        //         url: config.api.endpoints.changeReservationStatus,
        //         body,
        //         method: 'POST',
        //     }),
        //     invalidatesTags: (_, error, arg) =>
        //         error ? [] : ['Reservation', { type: 'ReservationItem', id: arg.data.reservation_id }],
        // }),
    }),
});

export const { useGetAllMealCategoriesQuery, usePostMealCategoryMutation } = mealCategoryApi;
