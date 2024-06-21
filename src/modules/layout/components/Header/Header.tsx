import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { LogoSquareIcon } from 'assets/icons';
import classNames from 'classnames';
import { config } from 'config';
import { useAuth } from 'core/auth';
import { AUTH_ROLE } from 'core/auth/types';
import { useNonTypedTranslation } from 'core/translation';
import { DropdownMenu, LanguageSwitch, Modal, UserInfo } from 'modules/ui';

import { useLogout } from '../../../../core/auth/hooks/useLogout';

import styles from './Header.module.scss';

export const Header = () => {
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
                    [config.nav.menu.table, config.routes.menu.table],
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
            {/* shows on desktop */}
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
                {/* show on mobile */}
                <DropdownMenu
                    user={user}
                    availableRoutes={getAvailableRoutes(user?.role)}
                    onLogout={() => setShowLogoutConfirmationPopup(true)}
                />
                {/* shows on desktop */}
                <UserInfo user={user} onLogout={() => setShowLogoutConfirmationPopup(true)} />
            </div>
            <Modal
                show={showLogoutConfirmationPopup}
                onClick={() => setShowLogoutConfirmationPopup(false)}
                label={t('logout.label')}
                cancelComponent={
                    <Button variant="outlined" onClick={() => setShowLogoutConfirmationPopup(false)}>
                        {t('logout.cancel')}
                    </Button>
                }
                approveComponent={
                    <Button
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
