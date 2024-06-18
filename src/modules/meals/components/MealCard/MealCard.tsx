import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';
import {
    // CardActionArea,
    // CardActions,
    CardHeader,
    CardMedia,
    // Collapse,
    Grid,
    IconButton,
    IconButtonProps,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { config } from 'config';

import { IMeal } from '../../types';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

interface MealCardProps {
    data: IMeal;
}

export const MealCard: React.FC<MealCardProps> = ({ data: { meal_id, name, description, imgUrl, price, weight } }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item xs={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="194"
                    // src="/src/assets/images/showcase-missing-image.webp"
                    image={imgUrl || '/src/assets/images/showcase-missing-image.webp'}
                    alt={name}
                />
                <CardHeader
                    title={name}
                    action={
                        <IconButton
                            size="medium"
                            onClick={() => navigate(config.routes.meal.detail.replace(':id', meal_id))}
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
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">
                                {/* <LocalOfferOutlined /> */}
                                {price} {t('common.currencies.eur')}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">{weight}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                {/* <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{description}</Typography>
                    </CardContent>
                </Collapse> */}
            </Card>
        </Grid>
    );
};
