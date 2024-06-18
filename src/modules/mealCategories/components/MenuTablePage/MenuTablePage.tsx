import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { config } from 'config';
import { useDocumentTitle } from 'core/application/hooks';
import { SelectField, TextField } from 'modules/form';
import { PageContent } from 'modules/layout';
import { useGetAllMealCategoriesQuery } from 'modules/mealCategories/api';
import { MealCard, useGetAllMealsQuery } from 'modules/meals';

import { MealCategoryCard } from '../MealCategoryCard';

import styles from './MenuTablePage.module.scss';

export const MenuTablePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.menu.table'));

    const { data: responseMealCategory } = useGetAllMealCategoriesQuery({ limit: 40, offset: 0 });
    const { data: responseMeal } = useGetAllMealsQuery({ limit: 40, offset: 0 });

    const mealCategoryList = responseMealCategory?.data || [];
    const mealList = responseMeal?.data || [];

    return (
        <PageContent>
            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        marginY: 5,
                        gap: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Typography component="h1" variant="h5">
                                {t('menu.categories.title')}
                            </Typography>
                            <Link to={config.routes.mealCategory.new}>
                                <Typography paragraph color="darkblue">
                                    {t('menu.categories.addCategory')}
                                </Typography>
                            </Link>
                        </Box>
                        <Grid container spacing={2}>
                            {mealCategoryList.map((item) => (
                                <MealCategoryCard data={item} key={item.mealCategory_id} />
                            ))}
                        </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <Typography component="h1" variant="h5">
                                {t('menu.meals.title')}
                            </Typography>
                            <Link to={config.routes.meal.new}>
                                <Typography paragraph color="darkblue">
                                    {t('menu.meals.addCategory')}
                                </Typography>
                            </Link>
                        </Box>
                        <Grid container spacing={2}>
                            {mealList.map((item) => (
                                <MealCard data={item} key={item.meal_id} />
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </PageContent>
    );
};
