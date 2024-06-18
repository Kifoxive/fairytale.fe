import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { config } from 'config';
import { useAppDispatch } from 'hooks';
import { PageContent } from 'modules/layout';
import { mealApi,useLazyPostFileQuery, usePostMealMutation } from 'modules/meals/api';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { IMealForm, mealFormSchema } from '../../types';
import { MealForm } from '../MealForm';

export const MealNewPage = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { t } = useTranslation(); // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useDocumentTitle(t('nav.meal.new'));
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [postMeal] = usePostMealMutation();
    const [postFile] = useLazyPostFileQuery();

    const onSubmit = async (formData: IMealForm, imgFile?: File) => {
        try {
            const { data } = await postMeal({ data: formData }).unwrap();

            if (imgFile) await postFile({ file: imgFile, directory: '/meal', id: data.meal_id });

            dispatch(mealApi.util.invalidateTags(['Meal']));

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
