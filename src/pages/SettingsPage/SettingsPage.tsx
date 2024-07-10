import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageContent } from 'modules/layout';

import { useDocumentTitle } from '../../core/application/hooks/useDocumentTitle';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import styles from './SettingsPage.module.scss';
import { mailImage } from 'assets/images';
import { useConfirmEmailQuery } from 'core/api';
import { Spinner } from 'modules/ui';

export const SettingsPage = () => {
    const { t } = useTranslation();
    useDocumentTitle(t('nav.contact'));

    const { linkId } = useParams();

    const { data, isLoading } = useConfirmEmailQuery({ linkId: linkId || '' }, { skip: !linkId });

    return (
        <PageContent>
            {/* <div>Confirm Email Page</div> */}
            <Box className={styles.container}>
                <Box className={styles.content}>
                    <img src={mailImage} alt="Mail" className={styles.mailImg} />
                    <Typography variant="h5">{t('confirmEmail.title')}</Typography>
                    <Box className={styles.status}>
                        {isLoading ? (
                            <Spinner fullScreen />
                        ) : data?.success ? (
                            <Typography variant="subtitle2" color="green">
                                {t('confirmEmail.confirmed')}
                            </Typography>
                        ) : (
                            <Typography variant="subtitle2" color="red">
                                {t('confirmEmail.error')}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Box>
        </PageContent>
    );
};
