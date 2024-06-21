import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Logout, Settings } from '@mui/icons-material';
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { config } from 'config';
import { IUser } from 'core/auth/types';

import styles from './UserInfo.module.scss';

type UserInfoProps = {
    user: IUser | null;
    onLogout: () => void;
};

export const UserInfo: React.FC<UserInfoProps> = ({ user, onLogout }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        if (!user) return navigate(config.routes.login);
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenuClick = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.container}>
            {user && (
                <div className={styles.details}>
                    <p className={styles.name}>{`${user.firstName} ${user.lastName}`}</p>
                </div>
            )}
            <Tooltip title={t('header.accountSettings')}>
                <IconButton
                    onClick={handleOpenMenuClick}
                    size="medium"
                    sx={{ ml: 1 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <AccountCircle sx={{ color: 'black' }} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleCloseMenuClick}
                onClick={handleCloseMenuClick}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleCloseMenuClick}>
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <p className={styles.name}>{`${user?.firstName} ${user?.lastName}`}</p>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseMenuClick}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    {t('header.settings')}
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleCloseMenuClick();
                        onLogout();
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    {t('header.logout')}
                </MenuItem>
            </Menu>
        </div>
    );
};
