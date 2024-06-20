import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import { CardActionArea, CardActions, CardHeader, Grid, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { config } from 'config';
import { IMealCategory } from 'modules/mealCategories/types';

interface MealCategoryCardProps {
    data: IMealCategory;
}

export const MealCategoryCard: React.FC<MealCategoryCardProps> = ({ data: { mealCategory_id, name, description } }) => {
    const navigate = useNavigate();
    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card>
                <CardHeader
                    title={name}
                    action={
                        <IconButton
                            size="medium"
                            onClick={() => navigate(config.routes.mealCategory.detail.replace(':id', mealCategory_id))}
                            color="inherit"
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                    }
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
