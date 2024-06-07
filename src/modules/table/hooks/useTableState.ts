import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import {
    type ColumnFiltersState,
    ColumnSort,
    type PaginationState,
    type Row,
    type SortingState,
} from '@tanstack/react-table';
import { useLocalStorage } from '@uidotdev/usehooks';
import { PaginationParams, QueryParams } from 'types/query-params';

import { DEFAULT_LAST_ROW_SELECTED, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SORT_NUMBER_BY } from '../constants';
import { AllRowsSelected, IsShiftHeld, LastRowSelected, RowSelection } from '../types';
import { getColumnFiltersParams, getGlobalFilterParams, getSortingParams } from '../utils';

export const useTableState = <TSchema extends Record<string, unknown>>(options: {
    rowIdKey: keyof TSchema;
    defaultPageSize?: number;
    getCellStyles?: ({ row, column }: { row: Row<TSchema>; column: { id: keyof TSchema } }) => string[];
    onRowClick?: (row: Row<TSchema>) => void;
    getIsRowSelectionDisabled?: (row: Row<TSchema>) => boolean;
    defaultSorting?: ColumnSort;
    tableName: string;
}) => {
    const { rowIdKey, defaultSorting, tableName, ...otherOptions } = options;

    const [savedPageSize] = useLocalStorage(`tablePageSize-${tableName}`, DEFAULT_PAGE_SIZE);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: DEFAULT_PAGE_INDEX,
        pageSize: options.defaultPageSize ? options.defaultPageSize : savedPageSize ? savedPageSize : DEFAULT_PAGE_SIZE,
    });
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>(defaultSorting ? [defaultSorting] : []);
    const [allRowsSelected, setAllRowsSelected] = useState<AllRowsSelected>(false);
    const [rowSelection, setRowSelection] = useState<RowSelection>({});
    const lastRowSelected = useRef<LastRowSelected>(DEFAULT_LAST_ROW_SELECTED);
    const isShiftHeld = useRef<IsShiftHeld>(false);
    const paginationParams: PaginationParams = {
        limit: pageSize,
        offset: pageIndex * pageSize,
    };

    const queryParams: QueryParams<TSchema> = {
        ...getGlobalFilterParams(globalFilter),
        ...getColumnFiltersParams<TSchema>(columnFilters),
        ...getSortingParams(sorting.length ? sorting : [DEFAULT_SORT_NUMBER_BY]),
    };

    useEffect(() => {
        lastRowSelected.current = DEFAULT_LAST_ROW_SELECTED;
    }, [pageIndex]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Shift') {
                isShiftHeld.current = event.shiftKey;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key === 'Shift') {
                isShiftHeld.current = false;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Reset the pagination index to 0 when invoking the setter (e.g., for filtering or sorting), displaying the first page
    // Reset the row selection (and all rows selection)
    const withResets = <TState>(setter: Dispatch<SetStateAction<TState>>) => {
        return (arg: SetStateAction<TState>) => {
            setter(arg);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            setAllRowsSelected(false);
            setRowSelection({});
        };
    };

    const getRowId = (originalRow: TSchema) => {
        return `${originalRow[rowIdKey]}`;
    };

    return {
        tableProps: {
            pageSize,
            pageIndex,
            setPagination,
            globalFilter,
            columnFilters,
            sorting,
            setSorting: withResets(setSorting),
            setGlobalFilter: withResets(setGlobalFilter),
            setColumnFilters: withResets(setColumnFilters),
            rowSelection,
            setRowSelection,
            getRowId,
            allRowsSelected,
            setAllRowsSelected,
            lastRowSelected,
            isShiftHeld,
            tableName,
            ...otherOptions,
        },
        queryParams,
        paginationParams,
    };
};
