import type { T } from 'core/translation/types';
import z from 'zod';

import { passwordMinLength } from '../config';

const minLength = passwordMinLength;

export const signupSchema = (t: T) =>
    z
        .object({
            first_name: z.string().min(1, { message: t('auth.first_name.error.required') }),
            last_name: z.string().min(1, { message: t('auth.last_name.error.required') }),
            email: z
                .string()
                .min(1, { message: t('auth.email.error.required') })
                .email({
                    message: t('auth.email.error.validEmail'),
                }),
            password: z.string().min(minLength, { message: t('auth.password.error.length', { minLength }) }),
            confirmPassword: z.string().min(1, { message: t('auth.confirmPassword.error.required') }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: t('auth.confirmPassword.error.dontMatch'),
        });

export type SignupSchema = z.infer<ReturnType<typeof signupSchema>>;
