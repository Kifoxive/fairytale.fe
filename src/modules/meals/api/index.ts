import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { baseQuery } from 'core/api/baseQuery';

import { GetAllMeals, GetOneMeal, PostMeal, PutMeal } from '../types';

export const mealApi = createApi({
    reducerPath: 'mealApi',
    baseQuery,
    tagTypes: ['Meal', 'MealItem'],
    endpoints: (builder) => ({
        getAllMeals: builder.query<GetAllMeals['response'], GetAllMeals['request']>({
            query: (params) => ({
                url: config.api.endpoints.meal,
                params,
                method: 'GET',
            }),
            providesTags: ['Meal'],
        }),
        getOneMeal: builder.query<GetOneMeal['response'], GetOneMeal['request']>({
            query: (params) => ({
                url: `${config.api.endpoints.meal}/${params.id}`,
                params,
                method: 'GET',
            }),
            providesTags: (_, error, arg) => [{ type: 'MealItem', id: arg.id }],
        }),
        postMeal: builder.mutation<PostMeal['response'], PostMeal['request']>({
            query: (body) => ({
                url: config.api.endpoints.meal,
                body,
                method: 'POST',
            }),
            invalidatesTags: (_, error) => (error ? [] : ['Meal']),
        }),
        putMeal: builder.mutation<PutMeal['response'], PutMeal['request']>({
            query: ({ id, data }) => ({
                url: `${config.api.endpoints.meal}/${id}`,
                body: { data },
                method: 'PUT',
            }),
            invalidatesTags: (_, error, arg) => (error ? [] : ['Meal', { type: 'MealItem', id: arg.id }]),
        }),
    }),
});

export const { useGetAllMealsQuery, useGetOneMealQuery, usePostMealMutation, usePutMealMutation } = mealApi;
