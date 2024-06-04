import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../core/application/hooks/useDocumentTitle';

export const DeliveryPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.delivery'));

    return (
        <PageContent>
            <div>Delivery Page</div>
        </PageContent>
    );
};
