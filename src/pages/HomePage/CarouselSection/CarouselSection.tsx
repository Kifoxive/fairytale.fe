import 'react-multi-carousel/lib/styles.css';

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';
import { Box } from '@mui/material';
import { carouselImage1 } from 'assets/images';

import styles from './CarouselSection.module.scss';

function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
}

// interface ICustomRightArrowProps {
//     carouselState: { currentSlide: number; deviceType: string };
//     onClick: () => void;
//     onMove: () => void;
// }
// const CustomRightArrow: React.FC<ICustomRightArrowProps> = ({ onClick, ...rest }) => {
//     const {
//         onMove,
//         carouselState: { currentSlide, deviceType },
//     } = rest;
//     // onMove means if dragging or swiping in progress.
//     return <button onClick={() => onClick()}>hello</button>;
// };

export const CarouselSection = () => {
    const { t } = useTranslation();

    const [windowSize, setWindowSize] = useState(getWindowSize());

    const carouselItems = [carouselImage1, carouselImage1, carouselImage1, carouselImage1];

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Box
            // sx={{
            //     display: 'flex',
            //     flexDirection: 'column',
            //     alignItems: 'center',
            //     marginTop: '10%',
            //     marginBottom: '8%',
            //     paddingX: 3,
            // }}
            className={styles.carouselContainer}
        >
            <Carousel
                centerMode={windowSize.innerWidth > 640}
                // customRightArrow={<CustomRightArrow />}
                infinite={true}
                responsive={responsive}
                // autoPlay={true}
                // autoPlaySpeed={4000}
                className={styles.carousel}
            >
                {carouselItems.map((item, index) => (
                    <div className={styles.carouselItem} key={index}>
                        <img src={item} />
                    </div>
                ))}
            </Carousel>
        </Box>
    );
};
