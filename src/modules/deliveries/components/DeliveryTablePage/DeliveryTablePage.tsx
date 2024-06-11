import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../../../core/application/hooks/useDocumentTitle';

export const DeliveryTablePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.delivery.table'));

    return (
        <PageContent>
            <div>Delivery Table Page</div>
        </PageContent>
    );
};
