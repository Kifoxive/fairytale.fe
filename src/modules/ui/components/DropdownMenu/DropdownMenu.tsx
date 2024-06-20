import React, { useState } from 'react';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './DropdownMenu.module.scss';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { AUTH_ROLE, IUser } from 'core/auth/types';
import { config } from 'config';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNonTypedTranslation } from 'core/translation';

type DropdownMenuProps = {
    // email: string;
    // firstName: string;
    // lastName: string;
    // imgSrc?: string;
    user: IUser | null;
    availableRoutes: [string, string][];
    onLogout: () => void;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ user, availableRoutes, onLogout }) => {
    const { t } = useTranslation();
    const { tnt } = useNonTypedTranslation();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const availableRoutesElements = availableRoutes.map(([title, path]) => (
        <MenuItem
            onClick={() => {
                navigate(path);
                handleClose;
            }}
        >
            {tnt(`nav.${title}`)}
        </MenuItem>
    ));

    const getAvailableMenuItems = (role?: AUTH_ROLE): React.ReactElement[] => {
        switch (role) {
            case AUTH_ROLE['admin']:
                return [
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <p className={styles.name}>{`${user?.firstName} ${user?.lastName}`}</p>
                    </MenuItem>,
                    <Divider />,
                    ...availableRoutesElements,
                    <Divider />,
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        {t('header.settings')}
                    </MenuItem>,
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            onLogout();
                        }}
                    >
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {t('header.logout')}
                    </MenuItem>,
                ];
            case AUTH_ROLE['guest']:
                return [
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        <p className={styles.name}>{`${user?.firstName} ${user?.lastName}`}</p>
                    </MenuItem>,
                    <Divider />,
                    ...availableRoutesElements,
                    <Divider />,
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        {t('header.settings')}
                    </MenuItem>,
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            onLogout();
                        }}
                    >
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        {t('header.logout')}
                    </MenuItem>,
                ];
            default:
                return [
                    <MenuItem
                        onClick={() => {
                            navigate(config.routes.login);
                            handleClose();
                        }}
                    >
                        <ListItemIcon>
                            <AccountCircle />
                        </ListItemIcon>
                        {t('nav.login')}
                    </MenuItem>,
                    <Divider />,
                    ...availableRoutesElements,
                ];
        }
    };

    return (
        <div className={styles.container}>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="medium"
            >
                <MenuIcon fontSize="medium" sx={{ color: 'black' }} />
            </IconButton>
            {/* {isAuthenticated ? (
                    <UserInfo
                        firstName={user?.firstName || ''}
                        lastName={user?.lastName || ''}
                        email={user?.email || ''}
                        //     imgSrc="https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8
                        // &auto=format&fit=crop&w=2776&q=80"
                        onLogout={() => setShowLogoutConfirmationPopup(true)}
                    />
                ) : (
                    <IconButton size="medium" onClick={() => navigate(config.routes.login)} color="inherit">
                        <AccountCircle fontSize="medium" />
                    </IconButton>
                )} */}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/*     <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}

                {getAvailableMenuItems(user?.role).map((item, index) => item)}
            </Menu>
        </div>
    );
};
