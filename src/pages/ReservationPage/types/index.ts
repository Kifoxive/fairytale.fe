import { T } from 'core/translation/types';
import { t } from 'i18next';
import { phoneRegex } from 'utils';
import { z } from 'zod';

export const reservationFormSchema = (t: T) =>
    z.object({
        // can be first name, second name or full name
        name: z.string({
            invalid_type_error: t('form.errors.stringFormat'),
            required_error: t('form.errors.required'),
        }),
        // phone to contact, if email is not specified
        phone: z.string().regex(phoneRegex, t('form.errors.phoneFormat')).or(z.literal('')).nullable(),
        // email to contact, if phone is not specified
        email: z.string().email({
            message: t('form.errors.emailFormat'),
        }),
        // date to visit
        date: z.number(),
        // time to visit
        time: z.string(),
        // duration of visit
        duration: z.number(),
        // number of persons
        personCount: z.number().nullable(),
        // notes or special requests
        note: z.string(),
    });

const postReservationRequestSchema = () =>
    z.object({
        data: reservationFormSchema(t),
    });

const postReservationResponseSchema = () =>
    z.object({
        data: reservationFormSchema(t),
    });

export type ReservationForm = z.infer<ReturnType<typeof reservationFormSchema>>;
export type PostReservationRequest = z.infer<ReturnType<typeof postReservationRequestSchema>>;
export type PostReservationResponse = z.infer<ReturnType<typeof postReservationResponseSchema>>;
