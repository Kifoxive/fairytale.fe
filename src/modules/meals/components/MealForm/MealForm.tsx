import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, InputAdornment, Paper } from '@mui/material';
import { SelectField, TextField } from 'modules/form';
import { Grid, Typography } from '@mui/material';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { IMealForm, IMeal, mealFormSchema } from '../../types';

import styles from './MealForm.module.scss';
import { useGetMealCategoryListQuery } from 'modules/mealCategories';
import { t } from 'i18next';

interface MealFormProps {
    fetchedData?: IMeal;
    onSubmitData: (newData: IMealForm) => void;
}
export const MealForm: React.FC<MealFormProps> = ({ fetchedData, onSubmitData }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment

    const context = fetchedData ? 'detail' : 'new';

    const { data: response } = useGetMealCategoryListQuery(undefined);
    const mealCategoryList = response?.data || [];

    const formDefaultValues = {
        name: undefined,
        mealCategory_id: undefined,
        allergens: [],
        weight: undefined,
        price: undefined,
        description: null,
        imgUrl: null,
    };

    const methods = useForm<IMealForm>({
        defaultValues: (fetchedData && transformIncomingData(fetchedData)) || formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(mealFormSchema(t)),
    });
    const { control, handleSubmit } = methods;

    const { name, imgUrl } = useWatch({ control });

    const onSubmit = async (formData: IMealForm) => {
        onSubmitData(formData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
                <Box
                    sx={{
                        marginY: 5,
                        gap: 2,
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
                                        options={mealCategoryList}
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
                                        width: '100%',
                                    }}
                                >
                                    {imgUrl ? <img className={styles.previewImg} src={imgUrl} alt={name} /> : null}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Grid item>
                                <Button variant="outlined"> {t('meal.form.updatePreview')}</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained">
                                    {t('meal.form.submit', { context })}
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </form>
        </FormProvider>
    );
};

function transformIncomingData(fetchedData: IMeal): IMealForm | null {
    return mealFormSchema(t).safeParse(fetchedData).data || null;
}
