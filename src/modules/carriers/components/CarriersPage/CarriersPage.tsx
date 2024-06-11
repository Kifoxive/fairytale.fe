import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'core/application/hooks';
import { PageContent } from 'modules/layout';

export const CarriersPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.carriers'));

    return <PageContent>Carriers page</PageContent>;
};
