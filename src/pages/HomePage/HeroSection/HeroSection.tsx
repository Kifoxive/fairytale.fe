import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import { Typography } from 'modules/ui';

import styles from './HeroSection.module.scss';

export const HeroSection = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.heroContainer}>
            <div className={styles.heroCircle}>
                <div className={styles.heroCircleContent}>
                    <Typography variant="h1" fontFamily="inder" className={styles.title}>
                        {t('home.hero.title')}
                    </Typography>
                    <div className={styles.subtitle}>
                        <Typography variant="h4" fontFamily="inder">
                            {t('home.hero.subtitle')}
                        </Typography>
                    </div>
                    <Button className={styles.reservationBtn} variant="contained">
                        <Typography variant="h4" fontFamily="inder" color="white">
                            {t('home.reservation')}
                        </Typography>
                    </Button>
                    <div className={styles.quote}>
                        <Typography variant="h4" fontFamily="inder">
                            {t('home.hero.quote')}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};
