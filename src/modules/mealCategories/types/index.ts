import { T } from 'core/translation/types';

import { z } from 'zod';

export const mealCategoryFormSchema = (t: T) =>
    z.object({
        // name of the meal category
        name: z.string({
            invalid_type_error: t('form.errors.stringFormat'),
            required_error: t('form.errors.required'),
        }),
        // description of the meal category
        description: z.string(),
        // ID of sub categories category
        subMealCategoriesId: z.array(
            z.string({
                invalid_type_error: t('form.errors.stringFormat'),
                required_error: t('form.errors.required'),
            }),
        ),
    });

export type MealCategoryForm = z.infer<ReturnType<typeof mealCategoryFormSchema>>;

export type IMealCategory = {
    mealCategory_id: string;
    name: string;
    description: string | null;
    subMealCategoriesId: string[];
    show: boolean;
    order: number | null;
};

export type GetAllMealCategories = {
    request: {
        limit: number;
        offset: number;
    };
    response: {
        data: IMealCategory[];
        totalCount: number;
    };
};

export type PostMealCategory = {
    request: {
        data: MealCategoryForm;
    };
    response: {
        data: IMealCategory;
    };
};
