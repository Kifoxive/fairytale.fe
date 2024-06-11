import { Logout } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import styles from './UserInfo.module.scss';

type UserInfoProps = {
    email: string;
    firstName: string;
    lastName: string;
    imgSrc?: string;
    onLogout: () => void;
};

export const UserInfo: React.FC<UserInfoProps> = ({ firstName, lastName, onLogout }) => {
    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <p className={styles.name}>{`${firstName} ${lastName}`}</p>
                {/* <p className={styles.email}>{email}</p> */}
            </div>
            <IconButton size="medium" onClick={onLogout} color="inherit">
                <Logout />
            </IconButton>
        </div>
    );
};
