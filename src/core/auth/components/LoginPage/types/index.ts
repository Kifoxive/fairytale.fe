import { IUser } from 'core/auth/types';
import { T } from 'core/translation/types';
import { z } from 'zod';

export const loginFormSchema = (t: T) =>
    z.object({
        // email of user
        email: z.string().email({
            message: t('form.errors.emailFormat'),
        }),
        // password of user
        password: z.string().min(8, { message: t('auth.password.error.length', { minLength: 8 }) }),
    });

export type LoginForm = z.infer<ReturnType<typeof loginFormSchema>>;

export type PostLogin = {
    request: {
        data: LoginForm;
    };
    response: {
        accessToken: string;
        user: IUser;
    };
};
