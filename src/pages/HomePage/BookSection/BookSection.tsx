import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { IconLineDecoration } from 'assets/icons';
import { Typography } from 'modules/ui';

import { config } from '../../../config';

import styles from './BookSection.module.scss';

export const BookSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box className={styles.bookSectionContainer}>
            <Box className={styles.content}>
                <Typography variant="h3" fontFamily="inder" className={styles.title}>
                    {t('home.book.title')}
                </Typography>
                <Typography variant="h4" fontFamily="inder" className={styles.text}>
                    {t('home.visit.text')}
                </Typography>
                <Button
                    onClick={() => navigate(config.routes.reservation.page)}
                    className={styles.reservationBtn}
                    variant="contained"
                >
                    <Typography variant="h4" fontFamily="inder" color="white">
                        {t('home.reservation')}
                    </Typography>
                </Button>
            </Box>
        </Box>
    );
};
