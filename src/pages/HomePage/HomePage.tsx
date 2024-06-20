import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContent } from 'modules/layout';
import styles from './HomePage.module.scss';

import { useDocumentTitle } from '../../core/application/hooks/useDocumentTitle';
import { Typography } from 'modules/ui';
import { Button } from '@mui/material';
import { HeroSection } from './HeroSection';
import { WelcomeSection } from './WelcomeSection';

export const HomePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.home'));

    return (
        <PageContent>
            <HeroSection />
            <WelcomeSection />
        </PageContent>
    );
};

// export const ClassicButton = () => {

// }
