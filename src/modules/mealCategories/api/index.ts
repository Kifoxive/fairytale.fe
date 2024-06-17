import { createApi } from '@reduxjs/toolkit/query/react';
import { config } from 'config';
import { baseQuery } from 'core/api/baseQuery';

import {
    GetAllMealCategories,
    GetMealCategoriesList,
    GetOneMealCategory,
    PostMealCategory,
    PutMealCategory,
} from '../types';

export const mealCategoryApi = createApi({
    reducerPath: 'mealCategoryApi',
    baseQuery,
    tagTypes: ['MealCategory', 'MealCategoryItem'],
    endpoints: (builder) => ({
        getAllMealCategories: builder.query<GetAllMealCategories['response'], GetAllMealCategories['request']>({
            query: (params) => ({
                url: config.api.endpoints.mealCategory,
                params,
                method: 'GET',
            }),
            providesTags: ['MealCategory'],
        }),
        getMealCategoryList: builder.query<GetMealCategoriesList['response'], GetMealCategoriesList['request']>({
            query: () => ({
                url: config.api.endpoints.mealCategoryList,
                method: 'GET',
            }),
            providesTags: ['MealCategory'],
        }),
        getOneMealCategory: builder.query<GetOneMealCategory['response'], GetOneMealCategory['request']>({
            query: (params) => ({
                url: `${config.api.endpoints.mealCategory}/${params.id}`,
                params,
                method: 'GET',
            }),
            // providesTags: (_result, _error, arg) => [{ type: 'MealCategoryItem', id: arg.id }],
        }),
        postMealCategory: builder.mutation<PostMealCategory['response'], PostMealCategory['request']>({
            query: (body) => ({
                url: config.api.endpoints.mealCategory,
                body,
                method: 'POST',
            }),
            invalidatesTags: (_, error) => (error ? [] : ['MealCategory']),
        }),
        putMealCategory: builder.mutation<PutMealCategory['response'], PutMealCategory['request']>({
            query: ({ id, data }) => ({
                url: `${config.api.endpoints.mealCategory}/${id}`,
                body: { data },
                method: 'PUT',
            }),
            invalidatesTags: (_, error, arg) =>
                error ? [] : ['MealCategory', { type: 'MealCategoryItem', id: arg.id }],
        }),
    }),
});

export const {
    useGetAllMealCategoriesQuery,
    useGetMealCategoryListQuery,
    useGetOneMealCategoryQuery,
    usePostMealCategoryMutation,
    usePutMealCategoryMutation,
} = mealCategoryApi;
