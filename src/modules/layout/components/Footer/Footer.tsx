import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { config } from 'config';
import { Typography } from 'modules/ui';

import styles from './Footer.module.scss';

// type of fixed social media icons list
type ISocialNetwork = {
    name: 'youtube' | 'facebook' | 'instagram';
    label: string;
    icon: React.ReactElement;
};

export const Footer = () => {
    const { t } = useTranslation();

    const timetable = [
        {
            dayOfWeek: t('common.daysOfWeek.monday'),
            timeFrom: '11:00',
            timeTo: '22:00',
        },
        { dayOfWeek: t('common.daysOfWeek.tuesday'), timeFrom: '11:00', timeTo: '22:00' },
        { dayOfWeek: t('common.daysOfWeek.wednesday'), timeFrom: '11:00', timeTo: '22:00' },
        { dayOfWeek: t('common.daysOfWeek.thursday'), timeFrom: '11:00', timeTo: '22:00' },
        { dayOfWeek: t('common.daysOfWeek.friday'), timeFrom: '11:00', timeTo: '22:00' },
        { dayOfWeek: t('common.daysOfWeek.saturday'), timeFrom: '11:00', timeTo: '22:00' },
        { dayOfWeek: t('common.daysOfWeek.sunday'), timeFrom: '11:00', timeTo: '22:00' },
    ];
    const todayDay = new Date().getDay() - 1;

    // fixed list to get the icons from
    const socialNetworks: Record<ISocialNetwork['name'], ISocialNetwork> = {
        youtube: {
            name: 'youtube',
            label: 'YouTube',
            icon: <YouTube color="inherit" />,
        },
        facebook: {
            name: 'facebook',
            label: 'Facebook',
            icon: <Facebook color="inherit" />,
        },
        instagram: {
            name: 'instagram',
            label: 'Instagram',
            icon: <Instagram color="inherit" />,
        },
    };

    // mocked data
    const selectedSocialNetworks: { name: ISocialNetwork['name']; link: string }[] = [
        { name: 'youtube', link: 'https://www.youtube.com' },
        { name: 'facebook', link: 'https://www.facebook.com' },
        { name: 'instagram', link: 'https://www.instagram.com' },
    ];

    return (
        <footer className={styles.footer}>
            <Grid container spacing={4} className={styles.info}>
                <Grid item xs={12} sm={4} className={styles.infoSection}>
                    <Box>
                        <Typography className={styles.title} variant="h4" color="white" fontWeight="semibold">
                            {t('footer.contactInfo.title')}
                        </Typography>
                        <Typography variant="p" color="white">
                            {t('footer.contactInfo.address')}
                        </Typography>
                        <a href={`tel:${t('footer.contactInfo.phoneNumber')}`}>
                            <Typography variant="p" color="white">
                                {t('footer.contactInfo.phoneNumber')}
                            </Typography>
                        </a>
                        <a href={`mailto:${t('footer.contactInfo.email')}`}>
                            <Typography variant="p" color="white">
                                {t('footer.contactInfo.email')}
                            </Typography>
                        </a>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} className={styles.infoSection}>
                    <Box>
                        <Typography className={styles.title} variant="h4" color="white" fontWeight="semibold">
                            {t('footer.timetable.title')}
                        </Typography>
                        <ul className={styles.timetable}>
                            {timetable.map((day, index) => (
                                <li className={styles.day} key={day.dayOfWeek}>
                                    <Typography
                                        variant="p"
                                        color="white"
                                        fontWeight={todayDay === index ? 'semibold' : 'normal'}
                                    >
                                        {day.dayOfWeek}
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        color="white"
                                        fontWeight={todayDay === index ? 'semibold' : 'normal'}
                                    >
                                        {day.timeFrom} - {day.timeTo}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4} className={styles.infoSection}>
                    <Box>
                        <Typography className={styles.title} variant="h4" color="white" fontWeight="semibold">
                            {t('footer.socialMedia.title')}
                        </Typography>
                        <ul className={styles.socialMedia}>
                            {selectedSocialNetworks.map((item) => (
                                <li key={item.name}>
                                    <Link to={item.link} target="_blank" className={styles.socialMedia_item}>
                                        {socialNetworks[item.name].icon}
                                        <Typography variant="p" color="white">
                                            {socialNetworks[item.name].label}
                                        </Typography>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Box>
                </Grid>
            </Grid>
            <section>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1617.3212271021412!2d25.04008563384411!3d48.5273429993549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4736d2859adf7931%3A0xb449e7cd07060928!2sVyacheslav%20Chornovil%20Ave%2C%2024%2C%20Kolomyia%2C%20Ivano-Frankivs&#39;ka%20oblast%2C%20Ukraine%2C%2078200!5e0!3m2!1sen!2scz!4v1716495819495!5m2!1sen!2scz"
                    width="100%"
                    height="200px"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>
            <section className={styles.copyright}>
                <Typography variant="p" color="white" fontWeight="normal">
                    {t('footer.copyright.author')}
                </Typography>
                <Link to={config.routes.privacy}>
                    <Typography variant="p" color="white" fontWeight="normal" link underline>
                        {t('footer.copyright.privacy')}
                    </Typography>
                </Link>
            </section>
        </footer>
    );
};
