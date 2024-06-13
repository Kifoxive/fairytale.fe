import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';

import { config } from 'config';
import { useDocumentTitle } from 'core/application/hooks';
import { PageContent } from 'modules/layout';

import styles from './MenuTablePage.module.scss';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { SelectField, TextField } from 'modules/form';
import { useGetAllMealCategoriesQuery } from 'modules/mealCategories/api';
import { MealCategoryCard } from '../MealCategoryCard';
import { Link } from 'react-router-dom';

export const MenuTablePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.menu.table'));

    const { data: response } = useGetAllMealCategoriesQuery({ limit: 40, offset: 0 });

    const mealCategoryList = response?.data || [];

    return (
        <PageContent>
            <Container component="main" maxWidth="lg">
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Typography component="h1" variant="h5">
                                {t('menu.categories.title')}
                            </Typography>

                            <Link to={config.routes.mealCategory.new}>
                                <Typography paragraph color="darkblue">
                                    {t('mealCategory.new')}
                                </Typography>
                            </Link>
                        </Box>

                        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {mealCategoryList.map((item) => (
                                <MealCategoryCard data={item} key={item.mealCategory_id} />
                            ))}
                        </Box> */}
                        <Grid container spacing={2}>
                            {mealCategoryList.map((item) => (
                                <MealCategoryCard data={item} key={item.mealCategory_id} />
                            ))}
                        </Grid>

                        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Grid item>
                                <Button variant="outlined"> {t('meal.form.updatePreview')}</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained">
                                    {t('meal.form.submit')}
                                </Button>
                            </Grid>
                        </Box> */}
                    </Box>
                </Box>
            </Container>
        </PageContent>
    );
};
