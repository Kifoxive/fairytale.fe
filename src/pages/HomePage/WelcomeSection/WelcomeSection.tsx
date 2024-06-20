import { Box, Divider } from '@mui/material';
import { IconLineDecoration } from 'assets/icons';
import { Typography } from 'modules/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WelcomeSection.module.scss';

export const WelcomeSection = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '10%',
                marginBottom: '8%',
                // paddingX: 3,
            }}
        >
            <Box>
                <Typography variant="h1" fontFamily="inder" component="p" className={styles.title}>
                    {t('home.welcome.title')}
                </Typography>
                <Typography variant="h4" fontFamily="inder" className={styles.subtitle}>
                    {t('home.welcome.subtitle1')}
                </Typography>
                <Typography variant="h4" fontFamily="inder" className={styles.subtitle}>
                    {t('home.welcome.subtitle2')}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '1660px', width: '100%', gap: 10 }}>
                {/* <Divider> */}
                <div className={styles.divider} />
                <IconLineDecoration />
                <div className={styles.divider} />
                {/* </Divider> */}
            </Box>
        </Box>
    );
};
