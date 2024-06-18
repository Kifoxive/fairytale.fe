import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { DatePickerField, FormGrid, MultiSelectField, SelectField, TextField } from 'modules/form';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { useGetMealCategoryListQuery, usePostMealCategoryMutation } from '../../api';
import { IMealCategory, IMealCategoryForm, mealCategoryFormSchema } from '../../types';

interface MealCategoryFormProps {
    fetchedData?: IMealCategory;
    onSubmitData: (newData: IMealCategoryForm) => void;
}

export const MealCategoryForm: React.FC<MealCategoryFormProps> = ({ fetchedData, onSubmitData }) => {
    const { t } = useTranslation();

    const context = fetchedData ? 'detail' : 'new';

    const { data: response } = useGetMealCategoryListQuery(undefined);
    const mealCategoryList = response?.data.filter(({ value }) => value !== fetchedData?.mealCategory_id) || [];

    const formDefaultValues = {
        name: undefined,
        subMealCategoriesId: [],
        description: undefined,
    };

    const methods = useForm<IMealCategoryForm>({
        defaultValues: (fetchedData && transformIncomingData(fetchedData)) || formDefaultValues,
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: zodResolver(mealCategoryFormSchema(t)),
    });
    const { handleSubmit, formState } = methods;

    globalThis.addEventListener('beforeunload', (event) => {
        if (formState.isDirty) {
            event.returnValue = 'You have unfinished changes!';
        }
    });

    const onSubmit = async (formData: IMealCategoryForm) => {
        onSubmitData(formData);
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
                                            options={mealCategoryList}
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
                                            {t('mealCategory.form.submit', { context })}
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

function transformIncomingData(fetchedData: IMealCategory): IMealCategoryForm | null {
    return mealCategoryFormSchema(t).safeParse(fetchedData).data || null;
}
