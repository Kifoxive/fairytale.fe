import { CheckedState } from '@radix-ui/react-checkbox';
import { Row, Table } from '@tanstack/react-table';
import { Checkbox } from 'modules/ui';

export interface ISelectRowCheckboxProps<T> {
    row: Row<any>;
    table: Table<any>;
    onRowSelect?: (rows: Row<any>[]) => void;
    onRowDeselect?: (rows: Row<any>[]) => void;
}
export const SelectRowCheckbox = <T,>({ row, table, onRowDeselect, onRowSelect }: ISelectRowCheckboxProps<T>) => {
    const meta = table.options.meta;
    if (!meta) {
        return null;
    }
    const { allRowsSelected, setAllRowsSelected, rowSelection, setRowSelection, getIsRowSelectionDisabled } = meta;
    const selectionDisabled = getIsRowSelectionDisabled && getIsRowSelectionDisabled(row);

    const onCheckedChange = (value: CheckedState) => {
        const previousRow = meta.lastRowSelected.current;
        const isShiftHeld = meta.isShiftHeld.current;

        // Update the last selected row to the current row
        meta.lastRowSelected.current = { id: row.id, index: row.index };

        // Perform multi-select
        if (isShiftHeld) {
            // Determine the range of rows to be selected based on the current and previous row
            const [start, end] =
                row.index > previousRow.index ? [previousRow.index, row.index] : [row.index, previousRow.index];

            const rowsToSelect: Row<any>[] = [];
            const multiSelection = table
                .getSortedRowModel()
                .rows.slice(start, end + 1)
                .reduce<Record<string, boolean>>((acc, curr) => {
                    rowsToSelect.push(curr);
                    // Set the value to match the previously selected row
                    acc[curr.id] = rowSelection[previousRow.id];
                    return acc;
                }, {});
            setRowSelection((prev) => ({ ...prev, ...multiSelection }));
            onRowSelect && onRowSelect(rowsToSelect);
        } else {
            // Perform single-select
            if (value === true) {
                setRowSelection((prev) => ({ ...prev, [row.id]: true }));
                if (
                    allRowsSelected === 'indeterminate' &&
                    // Check if all rows were previously selected
                    // Exclude the current value which is currently being set
                    Object.entries(rowSelection).every(([id, isSelected]) => isSelected || id === row.id)
                ) {
                    setAllRowsSelected(true);
                }
                onRowSelect && onRowSelect([row]);
            } else {
                setRowSelection((prev) => ({ ...prev, [row.id]: false }));
                if (allRowsSelected === true) {
                    setAllRowsSelected('indeterminate');
                }
                onRowDeselect && onRowDeselect([row]);
            }
        }
    };

    return (
        <Checkbox
            id={`select-row-${row.id}`}
            checked={
                rowSelection[row.id] !== undefined
                    ? // Use the row selection if it is set
                      // (either manually selected or unselected from all selection)
                      rowSelection[row.id] || allRowsSelected === true
                    : // If row selection is not set, use the all row selection
                      // (either allRowsSelected equals true or 'indeterminate')
                      allRowsSelected !== false
            }
            onCheckedChange={onCheckedChange}
            disabled={selectionDisabled}
        />
    );
};
