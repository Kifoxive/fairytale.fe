import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from '@mui/icons-material';
import { Box, Button, Container, Paper } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { DatePickerField, SelectField, TextField } from 'modules/form';
import { PageContent } from 'modules/layout';
import { generateTimeIntervals } from 'utils';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { ReservationForm, reservationFormSchema } from '../../types';
import { usePostReservationMutation } from '.';

import styles from './ReservationPage.module.scss';

export const ReservationPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
            <Container component="main" maxWidth="sm">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
                        <Box
                            sx={{
                                marginY: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                {t('reservation.form.title')}
                            </Typography>
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="name" label={t('reservation.form.name')} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name="email" label={t('register.form.email')} fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField name="phone" label={t('reservation.form.phone')} fullWidth />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            type="number"
                                            name="personCount"
                                            label={t('reservation.form.personCount')}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DatePickerField name="date" label={t('reservation.form.date')} />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <SelectField
                                            name="time"
                                            label={t('reservation.form.time')}
                                            options={timeToVisitOptions}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <SelectField
                                            name="duration"
                                            label={t('reservation.form.duration')}
                                            options={durationOptions}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            multiline
                                            minRows={3}
                                            maxRows={3}
                                            name="note"
                                            label={t('reservation.form.note')}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginY: 2,
                                        gap: 1,
                                        padding: 1,
                                        backgroundColor: '#ffdd84',
                                    }}
                                >
                                    <Info />
                                    <Typography variant="subtitle2" fontWeight="medium">
                                        {t('reservation.form.weConfirmReservation')}
                                    </Typography>
                                </Paper>
                                <Button type="submit" variant="contained" fullWidth>
                                    {t('reservation.form.submit')}
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </FormProvider>
            </Container>
        </PageContent>
    );
};
