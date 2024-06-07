import { Header } from '@tanstack/react-table';
import { SortIcon } from 'assets/icons';
import { SortDownIcon } from 'assets/icons';
import { SortUpIcon } from 'assets/icons';

import styles from './Sorting.module.scss';

export const Sorting = ({ header, children }: { header: Header<any, unknown>; children: React.ReactNode }) => {
    if (header.isPlaceholder || !header.column.getCanSort()) {
        return <div className={styles.placeholder}>{children}</div>;
    }

    const sortDirection = header.column.getIsSorted();

    const handleChangeSortingDirection = () => {
        const next = {
            asc: true,
            desc: undefined,
            false: false,
        };
        const currentSorting = header.column.getIsSorted();
        if (next[currentSorting.toString() as keyof typeof next] === undefined) header.column.clearSorting();
        else header.column.toggleSorting(next[currentSorting.toString() as keyof typeof next]);
    };

    return (
        <button className={styles['sort-button']} type="button" onClick={handleChangeSortingDirection}>
            {children}
            <div className={styles['sort-icons']}>
                {!sortDirection && <SortIcon />}
                {sortDirection === 'asc' && <SortUpIcon />}
                {sortDirection === 'desc' && <SortDownIcon />}
            </div>
        </button>
    );
};
