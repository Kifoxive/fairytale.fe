import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { IconLineDecoration } from 'assets/icons';
import { Typography } from 'modules/ui';

import styles from './BookSection.module.scss';

export const BookSection = () => {
    const { t } = useTranslation();

    return (
        <Box className={styles.bookSectionContainer}>
            <Box className={styles.content}>
                <Typography variant="h3" fontFamily="inder" className={styles.title}>
                    {t('home.book.title')}
                </Typography>
                <Typography variant="h4" fontFamily="inder" className={styles.text}>
                    {t('home.visit.text')}
                </Typography>
                <Button className={styles.reservationBtn} variant="contained">
                    <Typography variant="h4" fontFamily="inder" color="white">
                        {t('home.reservation')}
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};
