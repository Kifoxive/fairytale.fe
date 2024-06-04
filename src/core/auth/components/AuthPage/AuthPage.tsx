import { LogoIcon } from 'assets/icons';
import { AnonymousLayout } from 'modules/layout';

import styles from './AuthPage.module.scss';

interface AuthPageProps {
    children: React.ReactNode;
}

export const AuthPage = ({ children }: AuthPageProps) => {
    return (
        <AnonymousLayout>
            <div className={styles.container}>
                <div className={styles.card}>
                    <LogoIcon />
                    <div>{children}</div>
                </div>
            </div>
        </AnonymousLayout>
    );
};
