import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { IconLineDecoration } from 'assets/icons';
import { Typography } from 'modules/ui';

import styles from './VisitSection.module.scss';

export const VisitSection = () => {
    const { t } = useTranslation();

    return (
        <Box className={styles.visitSectionContainer}>
            <Typography variant="h4" fontFamily="inder" component="p" className={styles.text}>
                {t('home.visit.text')}
            </Typography>
            <Button className={styles.reservationBtn} variant="contained">
                <Typography variant="h4" fontFamily="inder" color="white">
                    {t('home.reservation')}
                </Typography>
            </Button>
            <Box className={styles.dividerContainer}>
                <div className={styles.divider} />
                <IconLineDecoration />
                <div className={styles.divider} />
            </Box>
            <Typography variant="h3" fontFamily="inder" className={styles.title}>
                {t('home.visit.kitchenTitle')}
            </Typography>
            <Typography variant="h4" fontFamily="inder" className={styles.subtitle}>
                {t('home.visit.kitchenText')}
            </Typography>
        </Box>
    );
};
