import '@tanstack/react-table';

import React, { type Dispatch, type SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CellContext,
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type PaginationState,
    type Row,
    type RowData,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { LoaderTableIcon } from 'assets/icons';
import classNames, { Argument } from 'classnames';
import { Filtering, FilteringType, Sorting, TablePagination } from 'modules/table';
import { type IsShiftHeld, type LastRowSelected } from 'modules/table/types';
import { CheckboxState, type RadioGroupOptions, Typography } from 'modules/ui';

import styles from './Table.module.scss';

// Custom cell styles (per view) – assigned to the Table component as: Table.Cell{Property} = Cell{Property}
const CellColor = {
    Primary: styles['cell-bgColor-primary'],
    DarkGray: styles['cell-bgColor-dark-gray'],
    LightGray: styles['cell-bgColor-light-gray'],
    Green: styles['cell-bgColor-green'],
    LightGreen: styles['cell-bgColor-light-green'],
    LightOrange: styles['cell-bgColor-light-orange'],
    LightYellow: styles['cell-bgColor-light-yellow'],
};
const CellTextColor = {
    White: styles['cell-color-white'],
    Primary: styles['cell-color-primary'],
};
const CellTextFormat = {
    Bold: styles['cell-text-format-bold'],
    SemiBold: styles['cell-text-format-semi-bold'],
    Italics: styles['cell-text-format-italics'],
    LineThrough: styles['cell-cell-format-line-through'],
};

// Meta properties of table columns.
declare module '@tanstack/table-core' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filter?: {
            type: FilteringType;
            options?: RadioGroupOptions;
        };
        align?: React.ComponentProps<'td'>['align'];
        // The onRowClick callback will not be triggered when a cell is clicked (e.g., to prevent accidental clicks on action cells)
        disableRowClick?: boolean;
        getCellContext?: (context: CellContext<TData, TValue>) => { className: string } | undefined;
        centerHeader?: boolean;
    }
}
// Meta properties of the table.
declare module '@tanstack/table-core' {
    interface TableMeta<TData extends RowData> {
        totalCount: number;
        filtered: TData[];
        allRowsSelected: CheckboxState;
        setAllRowsSelected: Dispatch<SetStateAction<CheckboxState>>;
        rowSelection: Record<string, boolean>;
        setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
        getIsRowSelectionDisabled?: (row: Row<any>) => boolean;
        lastRowSelected: React.MutableRefObject<LastRowSelected>;
        isShiftHeld: React.MutableRefObject<IsShiftHeld>;
    }
}

export type TableProps = {
    // Column definitions
    columns: ColumnDef<any, any>[];
    // Data that has been filtered or paginated, displaying only the visible subset.
    data: any;
    filtered?: any[];
    // The index of the currently displayed page (0-based, e.g., page 1 in UI corresponds to pageIndex 0).
    pageIndex: number;
    // The number of records to display per page (10, 20, 30...).
    pageSize: number;
    // Total count of data (including all records, not just the visible ones).
    totalCount: number;
    // Callback function called whenever a row is clicked, unless disableRowClick is set to true in ColumnMeta.
    onRowClick?: (data: any) => void;
    // Callback function to apply column and row styles. Returns an array of class names
    // (e.g., predefined classes like CellTextColor, CellBackgroundColor, CellTextFormat, etc.).
    getCellStyles?: ({ row, column }: { row: Row<any>; column: { id: any } }) => string[];
    // Used to identify the column that should be used as the unique identifier for each row.
    // This value should correspond to a unique identifier from the database, such as Invoice ID for invoices or Carrier ID for carriers.
    getRowId: (originalRow: any) => string;
    // Get the selected rows IDs
    setPagination: Dispatch<SetStateAction<PaginationState>>;
    globalFilter: string;
    setGlobalFilter: Dispatch<SetStateAction<string>>;
    columnFilters: ColumnFiltersState;
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
    rowSelection: Record<string, any>;
    setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
    sorting: SortingState;
    setSorting: Dispatch<SetStateAction<SortingState>>;
    allRowsSelected: CheckboxState;
    setAllRowsSelected: Dispatch<SetStateAction<CheckboxState>>;
    getIsRowSelectionDisabled?: (row: Row<any>) => boolean;
    isLoading?: boolean;
    lastRowSelected: React.MutableRefObject<LastRowSelected>;
    isShiftHeld: React.MutableRefObject<IsShiftHeld>;
    // handle click on form (item)
    onClick?: () => void;
    // use query parameters to store current page
    paginateByQuery?: boolean;
    // if the table contains all data (outside the pagination), set all rows in other pages as well
    selectAllRows?: boolean;
    isFetching?: boolean;
    hidePaginationPanel?: boolean;
    hideBorders?: boolean;
    bordered?: boolean;
    hideResizing?: boolean;
    maxHeight?: number;
    // when we need to use the cards (components) instead of rows
    renderRowCard?: (rowInfo: any) => React.ReactElement;
    // use the the unique name, to store column size in localStorage
    tableName: string;
    // custom page sizes
    pageSizes?: number[];
};

export const Table = ({
    columns,
    data,
    pageIndex,
    pageSize,
    totalCount,
    setPagination,
    globalFilter,
    setGlobalFilter,
    filtered = [],
    columnFilters,
    setColumnFilters,
    rowSelection,
    setRowSelection,
    sorting,
    setSorting,
    onRowClick,
    getCellStyles,
    getRowId,
    allRowsSelected,
    getIsRowSelectionDisabled,
    setAllRowsSelected,
    isLoading,
    lastRowSelected,
    isShiftHeld,
    onClick,
    paginateByQuery = true,
    isFetching,
    hidePaginationPanel,
    hideBorders,
    hideResizing,
    renderRowCard,
    maxHeight,
    bordered = false,
    tableName,
    pageSizes,
}: TableProps) => {
    // on first  render, set the pageSize stored in localStorage
    useEffect(() => {
        const storedPageSize = localStorage.getItem(`pageSize-${tableName}`);
        if (!storedPageSize) return;
        setPagination({ pageSize: storedPageSize ? Number(storedPageSize) : pageSize, pageIndex });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { t } = useTranslation();
    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize],
    );

    // Set column widths initially on page 1 to prevent resizing on subsequent pages
    const [columnWidths, setColumnWidths] = useState<number[]>(
        localStorage
            .getItem(`columnWidths-${tableName}`)
            ?.split(',')
            .map((columnWidth) => +columnWidth) || [],
    );

    const tableMeasuredRef = useCallback((node: HTMLTableElement | null) => {
        if (node !== null && !hideResizing) {
            const headerCells = node.querySelectorAll('th');
            // set a new column width to the localStorage
            headerCells.forEach((cell: HTMLTableCellElement) => {
                cell.onmouseup = () => {
                    localStorage.setItem(
                        `columnWidths-${tableName}`,
                        String([...headerCells].map((cell) => cell.offsetWidth)),
                    );
                };
            });

            setColumnWidths([...headerCells].map((cell) => cell.offsetWidth));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Func to provide props to table row
    const getRowProps = (context: Row<any>): Argument => {
        const rowStyles = [];
        if (context.original?.state === 0) {
            rowStyles.push(styles.unsolved);
        }
        if (rowSelection?.[context.id] === true) {
            rowStyles.push(styles.selected);
        }

        return rowStyles;
    };

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        pageCount: Math.ceil((filtered?.length || totalCount) / pageSize),
        getRowId,
        state: {
            pagination,
            globalFilter,
            columnFilters,
            sorting,
        },
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        columnResizeMode: 'onChange',
        meta: {
            totalCount,
            filtered,
            allRowsSelected,
            setAllRowsSelected,
            rowSelection,
            setRowSelection,
            getIsRowSelectionDisabled,
            lastRowSelected,
            isShiftHeld,
        },
    });

    if (!data.length && !globalFilter && !columnFilters) {
        return (
            <div className={styles['empty-message']}>
                <p>{t('table.noData')}</p>
            </div>
        );
    }
    return (
        <>
            {renderRowCard ? (
                // show cards instead rows
                <div className={styles.cardContainer}>
                    {data.map((rowData: Record<string, any>) => renderRowCard(rowData))}
                </div>
            ) : (
                // show classic table with rows
                <div
                    className={styles['table-wrapper']}
                    data-bordered={bordered}
                    style={{ maxHeight: maxHeight ? maxHeight : 'auto' }}
                >
                    <table
                        onClick={onClick}
                        className={styles.table}
                        style={{ tableLayout: columnWidths.length ? 'fixed' : 'auto' }}
                        ref={tableMeasuredRef}
                    >
                        <thead className={styles.thead}>
                            {
                                // Loop over the header rows
                                table.getHeaderGroups().map((headerGroup) => (
                                    <tr
                                        key={headerGroup.id}
                                        className={classNames(styles.tr, { [styles.hideBorders]: hideBorders })}
                                    >
                                        {
                                            // Loop over the headers in each row
                                            headerGroup.headers.map((header, index) => {
                                                // Set default size for column definition
                                                header.column.columnDef.size = columnWidths[index];
                                                return (
                                                    // Apply the header cell props
                                                    <th
                                                        key={header.id}
                                                        className={classNames(styles.th, {
                                                            [styles.hideBorders]: hideBorders,
                                                        })}
                                                        style={{ width: `${header.getSize()}px` }}
                                                    >
                                                        <div className={styles['th-container']}>
                                                            <Sorting header={header}>
                                                                <Typography
                                                                    // variant="h6"
                                                                    variant="p"
                                                                    color="black"
                                                                    className={classNames({
                                                                        [styles.centerHeader]:
                                                                            header.column.columnDef.meta?.centerHeader,
                                                                    })}
                                                                >
                                                                    {flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext(),
                                                                    )}
                                                                </Typography>
                                                            </Sorting>
                                                            <Filtering column={header.column} />
                                                        </div>
                                                        {!hideResizing && (
                                                            <div
                                                                className={classNames(styles.resizer)}
                                                                style={{
                                                                    backgroundColor: header.column.getIsResizing()
                                                                        ? '#1770ff'
                                                                        : undefined,
                                                                }}
                                                                onDoubleClick={() => header.column.resetSize()}
                                                                onMouseDown={header.getResizeHandler()}
                                                                onTouchStart={header.getResizeHandler()}
                                                            />
                                                        )}
                                                    </th>
                                                );
                                            })
                                        }
                                    </tr>
                                ))
                            }
                        </thead>
                        <tbody className={styles.tbody}>
                            {
                                // Loop over the table rows
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={classNames(
                                            styles.tr,
                                            styles['tr-body'],
                                            { [styles.hideBorders]: hideBorders },
                                            getRowProps(row),
                                        )}
                                    >
                                        {
                                            // Loop over the rows cells
                                            row.getVisibleCells().map((cell) => {
                                                const hasMeta = cell.getContext().cell.column.columnDef.meta;

                                                return (
                                                    // Apply the cell props
                                                    <td
                                                        key={cell.id}
                                                        className={classNames(
                                                            styles.td,
                                                            { [styles.hideBorders]: hideBorders },
                                                            // Apply a custom cell color
                                                            hasMeta?.getCellContext
                                                                ? hasMeta.getCellContext(cell.getContext())?.className
                                                                : '',
                                                            ...(getCellStyles
                                                                ? getCellStyles({
                                                                      row: cell.row,
                                                                      column: {
                                                                          id: cell.column.id,
                                                                      },
                                                                  })
                                                                : []),
                                                        )}
                                                        align={cell.column.columnDef.meta?.align}
                                                        onClick={() =>
                                                            onRowClick &&
                                                            !cell.column.columnDef.meta?.disableRowClick &&
                                                            onRowClick(row)
                                                        }
                                                    >
                                                        {
                                                            // Render the cell contents
                                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                                        }
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    {isLoading && (
                        <div className={styles.loading}>
                            <div>
                                <LoaderTableIcon />
                            </div>
                        </div>
                    )}
                </div>
            )}
            {/* show pagination */}
            {data.length ? (
                !hidePaginationPanel && (
                    <TablePagination
                        table={table}
                        paginateByQuery={paginateByQuery}
                        isLoading={isFetching}
                        pageSizes={pageSizes}
                        tableName={tableName}
                    />
                )
            ) : (
                <div className={styles['empty-message']}>
                    <p>{t('table.noData')}</p>
                </div>
            )}
        </>
    );
};

Table.CellColor = CellColor;
Table.CellTextFormat = CellTextFormat;
Table.CellTextColor = CellTextColor;
