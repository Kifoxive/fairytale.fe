import { Link, NavLink } from 'react-router-dom';
import { LogoSquareIcon } from 'assets/icons';
import classNames from 'classnames';
import { config } from 'config';
import { useAuth } from 'core/auth';
import { AuthRole } from 'core/auth/types';
import { useNonTypedTranslation } from 'core/translation';
import { LanguageSwitch } from 'modules/ui';

import styles from './Header.module.scss';

export interface HeaderProps extends React.ComponentProps<'header'> {}

export const Header = ({}: HeaderProps) => {
    const { tnt } = useNonTypedTranslation();

    const { user } = useAuth();

    const getAvailableRoutes = () => {
        return [
            [config.nav.home, config.routes.home],
            [config.nav.reservation, config.routes.reservation],
            [config.nav.delivery, config.routes.delivery],
            [config.nav.contact, config.routes.contact],
        ];
    };

    return (
        <header className={styles.header}>
            <Link to={config.routes.home} className={styles.logo}>
                <LogoSquareIcon />
            </Link>
            <nav className={styles.nav}>
                <ul className={styles['nav-list']}>
                    {getAvailableRoutes().map(([title, path]) => (
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
