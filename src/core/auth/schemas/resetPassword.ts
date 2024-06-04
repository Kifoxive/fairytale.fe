import type { T } from 'core/translation/types';
import z from 'zod';

import { passwordMinLength } from '../config';

const minLength = passwordMinLength;

export const requestResetPasswordSchema = (t: T) =>
    z.object({
        email: z
            .string()
            .min(1, { message: t('auth.email.error.required') })
            .email({
                message: t('auth.email.error.validEmail'),
            }),
    });

export const resetPasswordSchema = (t: T) =>
    z
        .object({
            password: z.string().min(minLength, { message: t('auth.password.error.length', { minLength }) }),
            confirmPassword: z.string().min(1, { message: t('auth.confirmPassword.error.required') }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            path: ['confirmPassword'],
            message: t('auth.confirmPassword.error.dontMatch'),
        });

export type RequestResetPasswordSchema = z.infer<ReturnType<typeof requestResetPasswordSchema>>;
export type ResetPasswordSchema = z.infer<ReturnType<typeof resetPasswordSchema>>;
