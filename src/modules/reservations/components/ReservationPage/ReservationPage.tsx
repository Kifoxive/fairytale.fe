import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from '@mui/icons-material';
import { Button } from '@mui/material';
import { DatePickerField, FormGrid, SelectField, TextField } from 'modules/form';
import { PageContent } from 'modules/layout';
import { Typography } from 'modules/ui';
import { generateTimeIntervals } from 'utils';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { usePostReservationMutation } from '../../api';
import { ReservationForm, reservationFormSchema } from '../../types/index';

import styles from './ReservationPage.module.scss';

export const ReservationPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.reservation.page'));

    const [postReservation] = usePostReservationMutation();

    const formDefaultValues = {
        name: 'Yuriy Pereginyak',
        phone: null,
        email: 'palianycia@seznam.cz',
        date: new Date().getTime() + 1000 * 60 * 60 * 24,
        time: '11:00',
        duration: 1,
        personCount: null,
        note: '',
    };

    const methods = useForm<ReservationForm>({
        defaultValues: formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(reservationFormSchema(t)),
    });
    const { handleSubmit } = methods;

    const timeToVisitOptions = generateTimeIntervals('11:00', '19:00', 15);

    const durationOptions = [
        { label: t('common.dates.minutes', { defaultValue: '30', number: 30 }), value: 0.5 },
    ].concat(
        [...Array(8).keys()].map((number) => ({
            label: t('common.dates.hours', { defaultValue: String(number), number: number + 1 }),
            value: number + 1,
        })),
    );

    const onSubmit = async (formData: ReservationForm) => {
        try {
            await postReservation({ data: formData }).unwrap();
            toast.success(t('reservation.success'));
        } catch (error) {
            toast.error(t('reservation.error'));
        }
    };

    return (
        <PageContent>
            <div className={styles.container}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
                        <div className={styles.form}>
                            <Typography className={styles.title} variant="h4" fontWeight="medium">
                                {t('reservation.form.title')}
                            </Typography>
                            <FormGrid>
                                <FormGrid columns={2}>
                                    <TextField name="name" label={t('reservation.form.name')} />
                                    <TextField name="phone" label={t('reservation.form.phone')} />
                                    <TextField name="email" label={t('reservation.form.email')} />
                                    <TextField
                                        type="number"
                                        name="personCount"
                                        label={t('reservation.form.personCount')}
                                    />
                                    <DatePickerField name="date" label={t('reservation.form.date')} />
                                    <FormGrid columns={2}>
                                        <SelectField
                                            name="time"
                                            label={t('reservation.form.time')}
                                            options={timeToVisitOptions}
                                        />
                                        <SelectField
                                            name="duration"
                                            label={t('reservation.form.duration')}
                                            options={durationOptions}
                                        />
                                    </FormGrid>
                                </FormGrid>
                                <TextField
                                    multiline
                                    minRows={3}
                                    maxRows={3}
                                    name="note"
                                    label={t('reservation.form.note')}
                                />
                                <div className={styles.confirmReservation}>
                                    <Info />
                                    <Typography variant="p" fontWeight="medium">
                                        {t('reservation.form.weConfirmReservation')}
                                    </Typography>
                                </div>
                                <Button type="submit" variant="contained">
                                    {t('reservation.form.submit')}
                                </Button>
                            </FormGrid>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </PageContent>
    );
};
