import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardHeader, CardMedia, Grid, IconButton, Paper } from '@mui/material';
import { IMeal } from 'modules/meals';
import { Typography } from 'modules/ui';

import { CrossClassicIcon } from '../../../assets/icons/crossClassic';

import styles from './SelectedMealCard.module.scss';

interface ISelectedMealCardProps {
    data: IMeal;
    onClose: () => void;
}

export const SelectedMealCard: React.FC<ISelectedMealCardProps> = ({ data, onClose }) => {
    const { t } = useTranslation();
    const { name, weight, price, imgUrl, allergens, description } = data;

    return (
        <div className={styles.modal} onClick={onClose}>
            <Card className={styles.container} onClick={(e) => e.stopPropagation()}>
                <IconButton size="medium" className={styles.closeIcon}>
                    <CrossClassicIcon />
                </IconButton>
                <CardMedia
                    component="img"
                    height="194"
                    // src="/src/assets/images/showcase-missing-image.webp"
                    image={imgUrl || '/src/assets/images/showcase-missing-image.webp'}
                    alt={name}
                />
                <div className={styles.content}>
                    <div className={styles.cardHeader}>
                        <Typography variant="h3" fontFamily="inder" fontWeight="bold">
                            {name}
                        </Typography>
                        <Typography variant="p" fontFamily="inder" fontWeight="bold">
                            {allergens.join(', ')}
                        </Typography>
                    </div>
                    <div className={styles.description}>
                        <Typography variant="p" fontFamily="inder" fontWeight="bold">
                            {description}
                        </Typography>
                    </div>
                    <Grid container className={styles.actions}>
                        <Grid item xs={4}>
                            <Typography variant="p" fontFamily="inder" fontWeight="bold" className={styles.text}>
                                {weight}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button onClick={() => onClose()} className={styles.viewBtn} variant="contained">
                                <Typography variant="p" fontFamily="inder" color="white">
                                    {t('menu.meals.close')}
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
        </div>
    );
};
