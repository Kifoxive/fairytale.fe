import { T } from 'core/translation/types';
import { phoneRegex } from 'utils';
import { z } from 'zod';

export const mealFormSchema = (t: T) =>
    z.object({
        // name of the meal
        name: z.string({
            invalid_type_error: t('form.errors.stringFormat'),
            required_error: t('form.errors.required'),
        }),
        // description of the meal
        description: z.string(),
        // price of the meal
        price: z.number({
            invalid_type_error: t('form.errors.numberFormat'),
            required_error: t('form.errors.required'),
        }),
        // weight of the food (grams, litres)
        weight: z.string({
            invalid_type_error: t('form.errors.stringFormat'),
            required_error: t('form.errors.required'),
        }),
        // list of allergies
        allergens: z.array(
            z.string({
                invalid_type_error: t('form.errors.stringFormat'),
                required_error: t('form.errors.required'),
            }),
        ),
        // ID of meal category
        mealCategory_id: z.string({
            invalid_type_error: t('form.errors.stringFormat'),
            required_error: t('form.errors.required'),
        }),
        // URL of preview image
        imgUrl: z
            .string({
                invalid_type_error: t('form.errors.stringFormat'),
                required_error: t('form.errors.required'),
            })
            .nullable(),
        // order of item in the category list
        // order: z.number({
        //     invalid_type_error: t('form.errors.numberFormat'),
        //     required_error: t('form.errors.required'),
        // }),
        // whether hide the item or no
        // show: z.boolean(),
    });

export type MealForm = z.infer<ReturnType<typeof mealFormSchema>>;

export type IMeal = {
    meal_id: string;
    name: string;
    description: string | null;
    price: number;
    weight: string;
    allergens: string[];
    mealCategory_id: string;
    imgUrl: string | null;
};

export type PostMeal = {
    request: {
        data: MealForm;
    };
    response: {
        data: IMeal;
    };
};
