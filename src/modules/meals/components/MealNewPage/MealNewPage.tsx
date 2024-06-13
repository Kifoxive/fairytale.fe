import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from '@mui/icons-material';
import { Box, Button, Container, InputAdornment, Paper } from '@mui/material';
import { DatePickerField, FormGrid, SelectField, TextField } from 'modules/form';
import { PageContent } from 'modules/layout';
import { generateTimeIntervals } from 'utils';
import { Grid, Typography } from '@mui/material';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { MealForm, mealFormSchema } from '../../types';
// import { usePostReservationMutation } from '.';

import styles from './MealNewPage.module.scss';

export const MealNewPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useDocumentTitle(t('nav.meal.new'));

    // const [postReservation] = usePostReservationMutation();

    const formDefaultValues = {
        name: 'Borsch',
        mealCategory_id: undefined,
        weight: '400g',
        price: 150,
        description: 'Ukrainian national food',
        imgUrl: 'https://i.pinimg.com/originals/f9/a1/91/f9a191092a91109fe4f6a07aa43e8d9f.jpg',
    };

    const methods = useForm<MealForm>({
        defaultValues: formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(mealFormSchema(t)),
    });
    const { control, handleSubmit } = methods;

    const { name, imgUrl } = useWatch({ control });

    const onSubmit = async (formData: MealForm) => {
        try {
            // await postReservation({ data: formData }).unwrap();
            toast.success(t('reservation.success'));
        } catch (error) {
            toast.error(t('reservation.error'));
        }
    };

    return (
        <PageContent>
            <Container component="main" maxWidth="lg">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
                        <Box
                            sx={{
                                marginY: 5,
                                gap: 2,
                                // display: 'flex',
                                // flexDirection: 'column',
                                // alignItems: 'center',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography component="h1" variant="h5">
                                        {t('meal.form.title')}
                                    </Typography>
                                </Box>
                                <Grid container sx={{ gap: 2 }}>
                                    {/* left side (form) */}
                                    <Grid xs={6} container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField name="name" label={t('meal.form.name')} fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <SelectField
                                                name="mealCategory_id"
                                                label={t('meal.form.mealCategory_id')}
                                                options={[{ label: 'First meal', value: '123' }]}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField name="weight" label={t('meal.form.weight')} fullWidth />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="price"
                                                label={t('meal.form.price')}
                                                type="number"
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            {t('common.currencies.eur')}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                multiline
                                                minRows={3}
                                                maxRows={3}
                                                name="description"
                                                label={t('meal.form.description')}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* right side (img) */}
                                    <Grid xs={6} container sx={{ gap: 1 }}>
                                        <Grid
                                            item
                                            component={Paper}
                                            sx={{
                                                height: '250px',
                                                // height: '100%',
                                                width: '100%',
                                                // overflow: 'hidden',
                                            }}
                                        >
                                            {imgUrl ? (
                                                <img className={styles.previewImg} src={imgUrl} alt={name} />
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item xs={12}> */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Grid item>
                                        <Button variant="outlined"> {t('meal.form.updatePreview')}</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained">
                                            {t('meal.form.submit')}
                                        </Button>
                                    </Grid>
                                </Box>
                                {/* </Grid> */}
                            </Box>
                        </Box>
                    </form>
                </FormProvider>
            </Container>
        </PageContent>
    );
};
