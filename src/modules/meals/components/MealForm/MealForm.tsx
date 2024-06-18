import React, { useRef, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, InputAdornment, Paper } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { SelectField, TextField } from 'modules/form';
import { useGetMealCategoryListQuery } from 'modules/mealCategories';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { IMeal, IMealForm, mealFormSchema } from '../../types';

import styles from './MealForm.module.scss';

interface MealFormProps {
    fetchedData?: IMeal;
    onSubmitData: (newData: IMealForm, img?: File) => void;
}
export const MealForm: React.FC<MealFormProps> = ({ fetchedData, onSubmitData }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment

    const context = fetchedData ? 'detail' : 'new';

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [imgFile, setImgFile] = useState<File>();
    // const [filePreviewSrc, setFilePreviewSrc] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            setImgFile(e.target.files[0]);
            // const url = URL.createObjectURL(e.target.files[0])
            // setFilePreviewSrc(url);
        }

        e.target.value = '';
    };

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
    const { control, handleSubmit, formState } = methods;

    globalThis.addEventListener('beforeunload', (event) => {
        if (formState.isDirty || imgFile) {
            event.returnValue = 'You have unfinished changes!';
        }
    });

    const { name } = useWatch({ control });

    const onSubmit = async (formData: IMealForm) => {
        onSubmitData(formData, imgFile);
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
                                <Grid item xs={3}>
                                    <TextField name="weight" label={t('meal.form.weight')} fullWidth />
                                </Grid>
                                <Grid item xs={3}>
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
                                <Grid item xs={6}>
                                    <TextField
                                        name="allergens"
                                        label={t('meal.form.allergens')}
                                        // type="number"
                                        fullWidth
                                        type="array"
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
                                        height: '245px',
                                        width: '100%',
                                    }}
                                >
                                    <img
                                        className={styles.previewImg}
                                        src={
                                            (imgFile && URL.createObjectURL(imgFile)) ||
                                            fetchedData?.imgUrl ||
                                            '/src/assets/images/showcase-missing-image.webp'
                                        }
                                        alt={name}
                                    />

                                    {/* <img className={styles.previewImg} src={filePreviewSrc || imgUrl} alt={name} /> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Grid item>
                                <Button onClick={() => fileInputRef.current?.click()} variant="outlined">
                                    {t('meal.form.updatePreview')}
                                </Button>
                                <input
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    type="file"
                                    className={styles.hidden}
                                    accept="image/png, image/webp, image/jpeg, image/jpg"
                                />
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
