import { useEffect, useRef, useState } from 'react';

import styles from './PageContent.module.scss';

export type PageContentProps = {
    children: React.ReactNode;
};

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
    return (
        <>
            <main className={styles.main}>{children}</main>
        </>
    );
};
