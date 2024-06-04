import { Toast } from 'modules/ui';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header';

import styles from './Page.module.scss';

export type PageProps = {
    children: React.ReactNode;
};

export const Page = ({ children }: PageProps) => {
    return (
        <>
            <div className={styles.page}>
                <Header />
                {children}
                <Footer />
            </div>
            <Toast />
        </>
    );
};
