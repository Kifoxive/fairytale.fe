import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AccountCircle, Logout } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { LogoSquareIcon } from 'assets/icons';
import classNames from 'classnames';
import { config } from 'config';
import { useAuth } from 'core/auth';
import { AUTH_ROLE } from 'core/auth/types';
import { useNonTypedTranslation } from 'core/translation';
import { LanguageSwitch, Modal, Typography, UserInfo } from 'modules/ui';

import { useLogout } from '../../../../core/auth/hooks/useLogout';

import styles from './Header.module.scss';

export interface HeaderProps extends React.ComponentProps<'header'> {}

export const Header = ({}: HeaderProps) => {
    const { t } = useTranslation();
    const { tnt } = useNonTypedTranslation();
    const logout = useLogout();
    const { isAuthenticated, user } = useAuth();
    const [showLogoutConfirmationPopup, setShowLogoutConfirmationPopup] = useState(false);
    const navigate = useNavigate();

    const getAvailableRoutes = (role?: AUTH_ROLE): [string, string][] => {
        switch (role) {
            case AUTH_ROLE['admin']:
                return [
                    [config.nav.reservation.table, config.routes.reservation.table],
                    [config.nav.delivery.table, config.routes.delivery.table],
                ];
            case AUTH_ROLE['guest']:
                return [
                    [config.nav.reservation.table, config.routes.reservation.table],
                    [config.nav.delivery.table, config.routes.delivery.table],
                ];
            default:
                return [
                    [config.nav.home, config.routes.home],
                    [config.nav.reservation.page, config.routes.reservation.page],
                    [config.nav.delivery.page, config.routes.delivery.page],
                    [config.nav.contact, config.routes.contact],
                ];
        }
    };

    return (
        <header className={styles.header}>
            <Link to={config.routes.home} className={styles.logo}>
                <LogoSquareIcon />
            </Link>
            <nav className={styles.nav}>
                <ul className={styles['nav-list']}>
                    {getAvailableRoutes(user?.role).map(([title, path]) => (
                        <li className={styles['nav-list-item']} key={path}>
                            <NavLink
                                className={({ isActive, isPending }) =>
                                    classNames(styles['nav-link'], {
                                        [styles['active']]: isActive || isPending,
                                    })
                                }
                                to={path}
                            >
                                {tnt(`nav.${title}`)}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={styles.actions}>
                <LanguageSwitch />
                {isAuthenticated ? (
                    <>
                        {/* <Typography variant="p" fontWeight="medium">
                            {user?.firstName} {user?.lastName}
                        </Typography>
                        <IconButton size="medium" onClick={() => setShowLogoutConfirmationPopup(true)} color="inherit">
                            <Logout />
                        </IconButton> */}
                        <UserInfo
                            firstName={user?.firstName || ''}
                            lastName={user?.lastName || ''}
                            email={user?.email || ''}
                            //     imgSrc="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8
                            // &auto=format&fit=crop&w=2776&q=80"
                            onLogout={() => setShowLogoutConfirmationPopup(true)}
                        />
                    </>
                ) : (
                    <IconButton size="medium" onClick={() => navigate(config.routes.login)} color="inherit">
                        <AccountCircle />
                    </IconButton>
                )}
            </div>
            <Modal
                show={showLogoutConfirmationPopup}
                onClick={() => setShowLogoutConfirmationPopup(false)}
                label={t('logout.label')}
                cancelComponent={
                    <Button type="button" variant="outlined" onClick={() => setShowLogoutConfirmationPopup(false)}>
                        {t('logout.cancel')}
                    </Button>
                }
                approveComponent={
                    <Button
                        type="button"
                        danger
                        variant="contained"
                        onClick={() => {
                            logout();
                            setShowLogoutConfirmationPopup(false);
                        }}
                    >
                        {t('logout.approve')}
                    </Button>
                }
            />
        </header>
    );
};
