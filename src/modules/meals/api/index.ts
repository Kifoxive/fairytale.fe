import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { baseQuery } from 'core/api/baseQuery';

import { GetAllMeals, GetOneMeal, PostFile, PostMeal, PutMeal } from '../types';

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
            providesTags: (_, error, arg) => (error ? [] : [{ type: 'MealItem', id: arg.id }]),
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
        postFile: builder.query<PostFile['response'], PostFile['request']>({
            query: ({ file, directory, id }) => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('directory', directory);
                formData.append('id', id);
                return {
                    url: config.api.endpoints.mealFile,
                    body: formData,
                    method: 'POST',
                    formData: true,
                };
            },
        }),
    }),
});

export const {
    useGetAllMealsQuery,
    useGetOneMealQuery,
    usePostMealMutation,
    usePutMealMutation,
    useLazyPostFileQuery,
} = mealApi;
