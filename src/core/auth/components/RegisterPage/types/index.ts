import { T } from 'core/translation/types';
import { z } from 'zod';

import { IUser } from '../../../types/index';

export const registerFormSchema = (t: T) =>
    z.object({
        // first name
        firstName: z.string({
            invalid_type_error: t('form.errors.stringFormat'),
            required_error: t('form.errors.required'),
        }),
        // optional last name
        lastName: z.string({
            invalid_type_error: t('form.errors.stringFormat'),
            required_error: t('form.errors.required'),
        }),
        // email of user
        email: z.string().email({
            message: t('form.errors.emailFormat'),
        }),
        password: z.string().min(8, { message: t('auth.password.error.length', { minLength: 8 }) }),
    });

export type PostRegister = {
    request: {
        data: RegisterForm;
    };
    response: {
        accessToken: string;
        user: IUser;
    };
};

export type RegisterForm = z.infer<ReturnType<typeof registerFormSchema>>;
