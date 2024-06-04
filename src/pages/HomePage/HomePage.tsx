import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../core/application/hooks/useDocumentTitle';

export const HomePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.home'));

    return (
        <PageContent>
            <div>Home Page</div>
        </PageContent>
    );
};
