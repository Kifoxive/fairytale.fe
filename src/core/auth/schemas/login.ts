import type { T } from 'core/translation/types';
import z from 'zod';

import { passwordMinLength } from '../config';

const minLength = passwordMinLength;

export const loginSchema = (t: T) =>
    z.object({
        email: z
            .string()
            .min(1, { message: t('auth.email.error.required') })
            .email({
                message: t('auth.email.error.validEmail'),
            }),
        password: z.string().min(minLength, { message: t('auth.password.error.length', { minLength }) }),
    });

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;
