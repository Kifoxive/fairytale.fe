import React from 'react';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/material';

import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { IMealForm, mealFormSchema } from '../../types';

import { useGetOneMealQuery, usePostMealMutation, usePutMealMutation } from 'modules/meals/api';
import { MealForm } from '../MealForm';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../../../../config/index';
import { Spinner } from 'modules/ui';

export const MealDetailPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useDocumentTitle(t('nav.meal.new'));
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: response } = useGetOneMealQuery({ id: id || '' }, { skip: !id });
    const [putMeal] = usePutMealMutation();

    const onSubmit = async (formData: IMealForm) => {
        if (!id) return;
        try {
            await putMeal({ id, data: formData }).unwrap();
            toast.success(t('meal.form.success', { context: 'detail' }));
            navigate(config.routes.menu.table);
        } catch (error) {
            toast.error(t('meal.form.error', { context: 'detail' }));
        }
    };

    if (!response) return <Spinner />;

    return (
        <PageContent>
            <Container component="main" maxWidth="lg">
                <MealForm fetchedData={response.data} onSubmitData={onSubmit} />
            </Container>
        </PageContent>
    );
};
