import { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';
import { useLocalStorage } from '@uidotdev/usehooks';
import classNames from 'classnames';
import { useQuery } from 'hooks';
import { Select, Spinner, Typography } from 'modules/ui';

import { DEFAULT_PAGE_SIZE, FIRST_PAGE_INDEX, PAGE_SIZES } from '../../constants';
import { PaginationInput } from './PaginationInput';

import styles from './TablePagination.module.scss';

export const TablePagination = ({
    table,
    paginateByQuery = true,
    isLoading,
    pageSizes,
    tableName,
}: {
    table: Table<any>;
    paginateByQuery: boolean;
    isLoading?: boolean;
    pageSizes?: number[];
    tableName: string;
}) => {
    const { t } = useTranslation();
    const currentPageIndex = table.getState().pagination.pageIndex;
    const currentPageSize = table.getState().pagination.pageSize;
    const lastPageIndex = table.getPageCount() - 1;
    const query = useQuery();

    const [pageSize, setPageSize] = useLocalStorage(`tablePageSize-${tableName}`, DEFAULT_PAGE_SIZE);

    useLayoutEffect(() => {
        table.setPageSize(pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize]);

    useEffect(() => {
        paginateByQuery && table.setPageIndex(Number(query.get(tableName + '-page') || 1) - 1);
    }, [query.get(tableName + '-page')]);

    const getPageButtonProps = (index: number, className = '') => ({
        onClick: () => {
            query.set(`${tableName}-page`, String(index + 1));
            paginateByQuery ? navigate(`?${query.toString()}`) : table.setPageIndex(index);
        },
        className: classNames(styles['page-button'], className),
    });

    const navigate = useNavigate();

    return (
        <div className={styles.pagination}>
            <div className={styles['page-select']}>
                <div className={styles.controls}>
                    {/* Left arrow button to navigate to the previous page. */}
                    <button
                        className={styles['icon-button']}
                        onClick={() => {
                            query.set(`${tableName}-page`, String(currentPageIndex));
                            paginateByQuery ? navigate(`?${query.toString()}`) : table.previousPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                        type="button"
                    >
                        <ChevronLeftIcon />
                    </button>
                    {/* Button to navigate to the first page. */}
                    {currentPageIndex - 2 > FIRST_PAGE_INDEX && (
                        <>
                            <button {...getPageButtonProps(0)} type="button">
                                1
                            </button>
                            <div>...</div>
                        </>
                    )}
                    {/* Button for navigating to the previous two pages. */}
                    {[currentPageIndex - 2, currentPageIndex - 1]
                        .filter((page) => page >= FIRST_PAGE_INDEX)
                        .map((page) => (
                            <button key={page} {...getPageButtonProps(page)} type="button">
                                {page + 1}
                            </button>
                        ))}
                    {/* Current active page. */}
                    <button {...getPageButtonProps(currentPageIndex, styles.current)} type="button">
                        {currentPageIndex + 1}
                    </button>
                    {/* Button for navigating to the following two pages. */}
                    {[currentPageIndex + 1, currentPageIndex + 2]
                        .filter((page) => page <= lastPageIndex)
                        .map((page) => (
                            <button key={page} {...getPageButtonProps(page)} type="button">
                                {page + 1}
                            </button>
                        ))}
                    {/* Button to navigate to the last page. */}
                    {currentPageIndex + 2 < lastPageIndex && (
                        <>
                            <div>...</div>
                            <button {...getPageButtonProps(lastPageIndex)} type="button">
                                {lastPageIndex + 1}
                            </button>
                        </>
                    )}
                    {/* Right arrow button to navigate to the next page. */}
                    <button
                        className={styles['icon-button']}
                        onClick={() => {
                            query.set(`${tableName}-page`, String(currentPageIndex + 2));
                            paginateByQuery ? navigate(`?${query.toString()}`) : table.nextPage();
                        }}
                        disabled={!table.getCanNextPage()}
                        type="button"
                    >
                        <ChevronRightIcon />
                    </button>
                </div>
                {/* Information about the total count of data and the number of data currently being displayed. */}
                <Typography variant="p" className={styles.info} color="black">
                    {t('table.recordsShown', {
                        showing: table.getPrePaginationRowModel().rows.length,
                        total: table.options.meta?.filtered.length || table.options.meta?.totalCount,
                    })}
                </Typography>
            </div>
            <div className={styles['input-controls']}>
                {isLoading && <Spinner className={styles.spinner} />}
                <Typography variant="p" className={styles.info}>
                    {t('table.pageSize')}
                </Typography>
                <Select
                    defaultValue={String(pageSize)}
                    value={String(currentPageSize)}
                    onValueChange={(value) => {
                        setPageSize(Number(value));
                        query.set(`${tableName}-page`, '1');
                        paginateByQuery ? navigate(`?${query.toString()}`) : table.setPageIndex(0);
                    }}
                    className={styles.select}
                    options={pageSizes?.map((size) => String(size)) || PAGE_SIZES.map((size) => String(size))}
                />
                <Typography variant="p" className={styles.info}>
                    {t('table.currentPage')}
                </Typography>
                <div className={styles['input-wrapper']}>
                    <PaginationInput
                        min={1}
                        max={lastPageIndex + 1}
                        current={currentPageIndex + 1}
                        setCurrent={(value) => {
                            query.set(`${tableName}-page`, String(value));
                            paginateByQuery ? navigate(`?${query.toString()}`) : table.setPageIndex(value - 1);
                        }}
                        name="currentPage"
                    />
                </div>
            </div>
        </div>
    );
};
