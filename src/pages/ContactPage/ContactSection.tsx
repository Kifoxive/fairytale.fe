import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../core/application/hooks/useDocumentTitle';

export const ContactPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.contact'));

    return (
        <PageContent>
            <div>Contact Page</div>
        </PageContent>
    );
};
