import { ColumnDef, ColumnHelper, Row } from '@tanstack/react-table';

import { SelectAllRowsCheckbox, SelectRowCheckbox } from '../components';

/**
 * Creates a select column to allow users to select individual or all records in a table.
 *
 * Usage:
 * const columnHelper = createColumnHelper<TableSchema>();
 * columns = [
 *    ...
 *    createSelectColumn(columnHelper),
 *    ...
 * ];
 */
export const createSelectColumn = <T,>(
    columnHelper: ColumnHelper<T>,
    overrides?: ColumnDef<T, unknown>,
    defaultHeaderText?: string,
    allRowsIds?: number[],
    onRowSelect?: (rows: Row<any>[]) => void,
    onRowDeselect?: (rows: Row<any>[]) => void,
) =>
    columnHelper.display({
        id: 'select-column',
        header: ({ table }) => {
            return defaultHeaderText || <SelectAllRowsCheckbox onRowDeselect={onRowDeselect} onRowSelect={onRowSelect} table={table} allRowsIds={allRowsIds} />;
        },
        cell: ({ row, table }) => <SelectRowCheckbox onRowDeselect={onRowDeselect} onRowSelect={onRowSelect} row={row} table={table} />,
        meta: {
            align: 'center',
            disableRowClick: true,
            centerHeader: true,
        },
        enableSorting: false,
        enableColumnFilter: false,
        ...overrides,
    });
