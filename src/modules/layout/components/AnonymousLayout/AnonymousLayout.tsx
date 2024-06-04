import type { ReactNode } from 'react';
import { Toast } from 'modules/ui';

import styles from './AnonymousLayout.module.scss';

export interface AnonymousLayoutProps {
    children: ReactNode;
}

export const AnonymousLayout = ({ children }: AnonymousLayoutProps) => {
    return (
        <main className={styles.layout}>
            {children}
            <Toast />
        </main>
    );
};
