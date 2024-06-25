import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { PageContent } from 'modules/layout';
import { useGetMenuQuery } from 'modules/mealCategories';
import { Spinner } from 'modules/ui';

import { useDocumentTitle } from '../../core/application/hooks/useDocumentTitle';
import { MenuCategorySection } from './MenuCategorySection';

import styles from './MenuPage.module.scss';

export const MenuPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.menu.page'));

    const { data: response } = useGetMenuQuery(undefined);

    if (!response) return <Spinner fullScreen />;

    console.log(response.data);

    return (
        <PageContent>
            <Box className={styles.container}>
                {response.data.map((mealCategory) => (
                    <MenuCategorySection data={mealCategory} key={mealCategory.mealCategory_id} />
                ))}
            </Box>
        </PageContent>
    );
};
