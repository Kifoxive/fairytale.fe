import { T } from 'core/translation/types';
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

export type ReservationForm = z.infer<ReturnType<typeof reservationFormSchema>>;

export type IReservation = {
    name: string;
    date: number;
    phone: string | null;
    email: string;
    time: string;
    duration: number;
    personCount: number | null;
    note: string | null;
    createdAt: number;
    updatedAt: number;
    reservation_id: string;
};

export type GetAllReservations = {
    request: {
        limit: number;
        offset: number;
    };
    response: {
        data: IReservation[];
        totalCount: number;
    };
};

export type PostReservation = {
    request: {
        data: ReservationForm;
    };
    response: {
        data: IReservation;
    };
};
