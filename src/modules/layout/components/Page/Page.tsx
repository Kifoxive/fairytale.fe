import { useAuth } from 'core/auth';
import { AUTH_ROLE } from 'core/auth/types';
import { Toast } from 'modules/ui';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header';

import styles from './Page.module.scss';

export type PageProps = {
    children: React.ReactNode;
};

export const Page = ({ children }: PageProps) => {
    const { user } = useAuth();
    return (
        <>
            <div className={styles.page}>
                <Header />
                {children}
                {user?.role !== AUTH_ROLE['admin'] && <Footer />}
            </div>
            <Toast />
        </>
    );
};
