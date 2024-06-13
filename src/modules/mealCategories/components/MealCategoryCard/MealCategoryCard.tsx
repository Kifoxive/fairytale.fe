import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { IMealCategory } from 'modules/mealCategories/types';
import { Link } from 'react-router-dom';
import { config } from 'config';

interface MealCategoryCardProps {
    data: IMealCategory;
}

export const MealCategoryCard: React.FC<MealCategoryCardProps> = ({ data: { mealCategory_id, name, description } }) => {
    return (
        <Grid item xs={3}>
            <Link to={config.routes.mealCategory.detail.replace(':id', mealCategory_id)}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        {/* <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    );
};
