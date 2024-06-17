import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, CardHeader, Grid, IconButton } from '@mui/material';
import { IMealCategory } from 'modules/mealCategories/types';
import { useNavigate } from 'react-router-dom';
import { config } from 'config';
import { Edit } from '@mui/icons-material';

interface MealCategoryCardProps {
    data: IMealCategory;
}

export const MealCategoryCard: React.FC<MealCategoryCardProps> = ({ data: { mealCategory_id, name, description } }) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={3}>
            <Card sx={{ maxWidth: 345 }}>
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
