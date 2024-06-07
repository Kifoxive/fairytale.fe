import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetMeQuery } from 'core/api';
import { useAuth } from 'core/auth';
import { Toast } from 'modules/ui';

import { DEFAULT_REDIRECTS } from '../../../../utils/index';

import styles from './AnonymousLayout.module.scss';

export interface AnonymousLayoutProps {
    children: ReactNode;
}

export const AnonymousLayout = ({ children }: AnonymousLayoutProps) => {
    useGetMeQuery(null);
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated === true && user?.role) return <Navigate to={DEFAULT_REDIRECTS[user.role]} replace={true} />;

    return (
        <main className={styles.layout}>
            {children}
            <Toast />
        </main>
    );
};
