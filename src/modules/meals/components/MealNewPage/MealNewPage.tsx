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
import { IMealForm, mealFormSchema } from '../../types';

import { useGetOneMealQuery, usePostMealMutation, usePutMealMutation } from 'modules/meals/api';
import { MealForm } from '../MealForm';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'modules/ui';
import { config } from 'config';

export const MealNewPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useDocumentTitle(t('nav.meal.new'));
    const navigate = useNavigate();

    const [postMeal] = usePostMealMutation();

    const onSubmit = async (formData: IMealForm) => {
        try {
            await postMeal({ data: formData }).unwrap();
            toast.success(t('meal.form.success', { context: 'new' }));
            navigate(config.routes.menu.table);
        } catch (error) {
            toast.error(t('meal.form.error', { context: 'new' }));
        }
    };

    return (
        <PageContent>
            <Container component="main" maxWidth="lg">
                <MealForm onSubmitData={onSubmit} />
            </Container>
        </PageContent>
    );
};
