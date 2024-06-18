import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { config } from 'config';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { usePostMealCategoryMutation } from '../../api';
import { IMealCategoryForm } from '../../types';
import { MealCategoryForm } from '../MealCategoryForm';

export const MealCategoryNewPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useDocumentTitle(t('nav.mealCategory.new'));
    const navigate = useNavigate();

    const [postMealCategory] = usePostMealCategoryMutation();

    const onSubmit = async (formData: IMealCategoryForm) => {
        try {
            await postMealCategory({ data: formData }).unwrap();
            toast.success(t('mealCategory.form.success', { context: 'new' }));
            navigate(config.routes.menu.table);
        } catch (error) {
            toast.error(t('mealCategory.form.error', { context: 'new' }));
        }
    };

    return (
        <PageContent>
            <Container component="main" maxWidth="md">
                <MealCategoryForm onSubmitData={onSubmit} />
            </Container>
        </PageContent>
    );
};
