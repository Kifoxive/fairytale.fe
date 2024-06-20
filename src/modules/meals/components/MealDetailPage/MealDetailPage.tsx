import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { PageContent } from 'modules/layout';
import { useGetOneMealQuery, useLazyPostFileQuery, usePutMealMutation } from 'modules/meals/api';
import { Spinner } from 'modules/ui';

import { config } from '../../../../config/index';
import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';
import { IMealForm, mealFormSchema } from '../../types';
import { MealForm } from '../MealForm';

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
    const [postFile] = useLazyPostFileQuery();

    const onSubmit = async (formData: IMealForm, imgFile?: File) => {
        if (!id) return;
        try {
            if (imgFile) {
                await postFile({ file: imgFile, directory: '/meal', id });
            }
            await putMeal({ id, data: { ...formData } }).unwrap();

            toast.success(t('meal.form.success', { context: 'detail' }));
            navigate(config.routes.menu.table);
        } catch (error) {
            toast.error(t('meal.form.error', { context: 'detail' }));
        }
    };

    if (!response) return <Spinner fullScreen />;

    return (
        <PageContent>
            <Container component="main" maxWidth="lg">
                <MealForm fetchedData={response.data} onSubmitData={onSubmit} />
            </Container>
        </PageContent>
    );
};
