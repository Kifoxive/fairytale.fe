import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'core/application/hooks';
import { PageContent } from 'modules/layout';

export const CarrierDetailPage: React.FC = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.carriers'));

    return <PageContent>Carrier detail page</PageContent>;
};
