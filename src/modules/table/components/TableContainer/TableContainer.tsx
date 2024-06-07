import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import styles from './TableContainer.module.scss';
export interface TableContainerProps extends React.ComponentProps<'div'> {
    limit?: boolean;
}
export const TableContainer = ({ children, className, limit = false }: TableContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [wrapperHeight, setWrapperHeight] = useState('100%');
    useEffect(() => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setWrapperHeight(`calc(100vh - ${rect.top}px)`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef.current]);
    return (
        <div
            ref={containerRef}
            className={classNames(styles.container, className)}
            style={limit ? { height: wrapperHeight, display: 'flex', flexDirection: 'column' } : {}}
        >
            {children}
        </div>
    );
};
