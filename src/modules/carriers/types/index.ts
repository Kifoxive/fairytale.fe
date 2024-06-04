import type { T } from 'core/translation/types';
import z from 'zod';

export const postOnboardingEmailSchema = () =>
    z.object({
        to: z.array(
            z.object({
                email: z.string(),
                lang: z.string(),
                dispatcher_id: z.number().optional(),
            }),
        ),
        carrier_id: z.number(),
        dispatcher: z.object({
            email: z.string(),
            name: z.string(),
            phone: z.string(),
            surname: z.string(),
        }),
    });

export type PostOnboardingEmailSchema = z.infer<ReturnType<typeof postOnboardingEmailSchema>>;
