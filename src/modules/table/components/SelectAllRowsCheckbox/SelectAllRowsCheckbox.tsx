import { Row, Table } from '@tanstack/react-table';
import { RowSelection } from 'modules/table/types';
import { Checkbox } from 'modules/ui';

export interface ISelectAllRowsCheckboxProps {
    table: Table<any>;
    allRowsIds?: number[];
    onRowSelect?: (rows: Row<any>[]) => void;
    onRowDeselect?: (rows: Row<any>[]) => void;
}
// allRowsIds cam receive all rows ids, even outside the pagination to select app of them
export const SelectAllRowsCheckbox = ({
    table,
    allRowsIds,
    onRowDeselect,
    onRowSelect,
}: ISelectAllRowsCheckboxProps) => {
    const meta = table.options.meta;
    if (!meta) {
        return null;
    }
    const { allRowsSelected, setAllRowsSelected, setRowSelection } = meta;

    return (
        <Checkbox
            id="select-all-rows"
            checked={allRowsSelected}
            onCheckedChange={(value) => {
                const selectAllRows: RowSelection = {};
                if (allRowsIds) {
                    allRowsIds.forEach((id) => (selectAllRows[id] = true));
                } else {
                    table.getPreSelectedRowModel().rows.forEach(({ id, original }) => {
                        if (!original?.exported) selectAllRows[id] = true;
                    });
                }
                if (value === true && allRowsSelected !== 'indeterminate') {
                    setRowSelection(selectAllRows);
                    setAllRowsSelected(true);
                    onRowSelect && onRowSelect(table.getPreSelectedRowModel().rows);
                } else {
                    setRowSelection({});
                    setAllRowsSelected(false);
                    onRowDeselect && onRowDeselect(table.getPreSelectedRowModel().rows);
                }
            }}
        />
    );
};
