import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Info } from '@mui/icons-material';
import { Box, Button, Container, InputAdornment, Paper } from '@mui/material';
import { DatePickerField, FormGrid, MultiSelectField, SelectField, TextField } from 'modules/form';
import { PageContent } from 'modules/layout';
import { generateTimeIntervals } from 'utils';
import { Grid, Typography } from '@mui/material';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { MealCategoryForm, mealCategoryFormSchema } from '../../types';
import { usePostMealCategoryMutation } from '../../api';

import styles from './MealCategoryNewPage.module.scss';

export const MealCategoryNewPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useDocumentTitle(t('nav.mealCategory.new'));
    const isNew = true;
    const context = isNew ? 'new' : 'detail';
    const [postMealCategory] = usePostMealCategoryMutation();

    const formDefaultValues = {
        name: 'First meal',
        subMealCategoriesId: [],
        description: 'First meal',
    };

    const methods = useForm<MealCategoryForm>({
        defaultValues: formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(mealCategoryFormSchema(t)),
    });
    const { handleSubmit } = methods;

    const onSubmit = async (formData: MealCategoryForm) => {
        try {
            await postMealCategory({ data: formData }).unwrap();

            toast.success(t('meal.form.success', { context }));
        } catch (error) {
            toast.error(t('meal.form.error', { context }));
        }
    };

    return (
        <PageContent>
            <Container component="main" maxWidth="md">
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
                                        {t('mealCategory.form.title')}
                                    </Typography>
                                </Box>
                                <Grid xs={12} container item spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField name="name" label={t('mealCategory.form.name')} fullWidth />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MultiSelectField
                                            name="subMealCategoriesId"
                                            label={t('mealCategory.form.subMealCategoriesId')}
                                            options={[
                                                { label: 'First meal', value: '1' },
                                                { label: 'Drink', value: '2' },
                                                { label: 'First meal', value: '3' },
                                                { label: 'Drink', value: '4' },
                                                { label: 'First meal', value: '5' },
                                                { label: 'Drink', value: '6' },
                                                { label: 'First meal', value: '7' },
                                                { label: 'Drink', value: '8' },
                                            ]}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            multiline
                                            minRows={3}
                                            maxRows={3}
                                            name="description"
                                            label={t('mealCategory.form.description')}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                {/* <Grid item xs={12}> */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                    <Grid item>
                                        <Button type="submit" variant="contained">
                                            {t('meal.form.submit', { context })}
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
