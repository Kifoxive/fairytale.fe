import { Link, NavLink } from 'react-router-dom';
import { LogoSquareIcon } from 'assets/icons';
import classNames from 'classnames';
import { config } from 'config';
import { useAuth } from 'core/auth';
import { AUTH_ROLE } from 'core/auth/types';
import { useNonTypedTranslation } from 'core/translation';
import { LanguageSwitch } from 'modules/ui';

import styles from './Header.module.scss';

export interface HeaderProps extends React.ComponentProps<'header'> {}

export const Header = ({}: HeaderProps) => {
    const { tnt } = useNonTypedTranslation();

    const { user } = useAuth();

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
            <LanguageSwitch />
        </header>
    );
};
