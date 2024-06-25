import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardHeader, CardMedia, Grid, Paper } from '@mui/material';
import { IMeal } from 'modules/meals';
import { Typography } from 'modules/ui';

import styles from './MenuCard.module.scss';

interface IMenuCardProps {
    data: IMeal;
    onViewClick: (data: IMeal) => void;
}

export const MenuCard: React.FC<IMenuCardProps> = ({ data, onViewClick }) => {
    const { t } = useTranslation();
    const { name, weight, price, imgUrl } = data;

    return (
        <Grid item md={4} sm={6} xs={12}>
            <Card className={styles.container}>
                {/* <img src={data.imgUrl || undefined} alt={data.name} className={styles.previewImg} /> */}
                <CardMedia
                    component="img"
                    height="194"
                    // src="/src/assets/images/showcase-missing-image.webp"
                    image={imgUrl || '/src/assets/images/showcase-missing-image.webp'}
                    alt={name}
                />
                <div className={styles.content}>
                    <Typography variant="h4" fontFamily="inder" fontWeight="bold" className={styles.title}>
                        {name}
                    </Typography>
                    <Grid container className={styles.actions}>
                        <Grid item xs={4}>
                            <Typography variant="p" fontFamily="inder" fontWeight="bold" className={styles.text}>
                                {weight}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={() => onViewClick(data)} className={styles.viewBtn} variant="contained">
                                <Typography variant="p" fontFamily="inder" color="white">
                                    {t('menu.meals.view')}
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="p" fontFamily="inder" fontWeight="bold" className={styles.text}>
                                {price}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </Grid>
    );
};
