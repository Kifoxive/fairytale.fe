import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../core/application/hooks/useDocumentTitle';
import { CarouselSection } from './CarouselSection';
import { HeroSection } from './HeroSection';
import { VisitSection } from './VisitSection';
import { WelcomeSection } from './WelcomeSection';

import styles from './HomePage.module.scss';

export const HomePage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.home'));

    return (
        <PageContent>
            <HeroSection />
            <WelcomeSection />
            <CarouselSection />
            {/* <VisitSection /> */}
        </PageContent>
    );
};
