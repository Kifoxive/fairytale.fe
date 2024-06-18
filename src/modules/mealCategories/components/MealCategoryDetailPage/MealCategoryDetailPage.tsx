import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { config } from 'config';
import { PageContent } from 'modules/layout';
import { Spinner } from 'modules/ui';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { useGetOneMealCategoryQuery, usePostMealCategoryMutation, usePutMealCategoryMutation } from '../../api';
import { IMealCategoryForm } from '../../types';
import { MealCategoryForm } from '../MealCategoryForm';

export const MealCategoryDetailPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useDocumentTitle(t('nav.mealCategory.detail'));
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: response } = useGetOneMealCategoryQuery({ id: id || '' }, { skip: !id });
    const [putMealCategory] = usePutMealCategoryMutation();

    const onSubmit = async (formData: IMealCategoryForm) => {
        if (!id) return;
        try {
            await putMealCategory({ id, data: formData }).unwrap();
            toast.success(t('mealCategory.form.success', { context: 'detail' }));
            navigate(config.routes.menu.table);
        } catch (error) {
            toast.error(t('mealCategory.form.error', { context: 'detail' }));
        }
    };

    if (!response) return <Spinner fullScreen />;

    return (
        <PageContent>
            <Container component="main" maxWidth="md">
                <MealCategoryForm fetchedData={response?.data} onSubmitData={onSubmit} />
            </Container>
        </PageContent>
    );
};
