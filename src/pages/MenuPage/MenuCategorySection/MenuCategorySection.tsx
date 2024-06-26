import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { IMealCategory } from 'modules/mealCategories/types';
import { IMeal } from 'modules/meals';
import { Typography } from 'modules/ui';

import { MenuCard } from '../MenuCard';
import { SelectedMealCard } from '../SelectedMealCard/SelectedMealCard';

import styles from './MenuCategorySection.module.scss';

interface IMenuCategorySectionProps {
    data: IMealCategory & { meals: IMeal[] };
}

export const MenuCategorySection: React.FC<IMenuCategorySectionProps> = ({ data }) => {
    const [selectedMeal, setSelectedMeal] = useState<IMeal | null>(null);

    return (
        <div>
            <Typography variant="h3" fontFamily="inder" className={styles.title}>
                {data.name}
            </Typography>
            <Grid container spacing={5}>
                {...data.meals.map((meal) => <MenuCard data={meal} onViewClick={setSelectedMeal} key={meal.meal_id} />)}
            </Grid>
            {selectedMeal && <SelectedMealCard data={selectedMeal} onClose={() => setSelectedMeal(null)} />}
        </div>
    );
};
