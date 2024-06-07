import { AllRowsSelected, RowSelection } from '../types';

export type SelectionParams = ReturnType<typeof getSelectionParams>;

// Takes selected rows and returns the selection parameters in the following formats:
// 1. No selection - undefined
// 2. All selected - {}
// 3. All selected with exceptions - { omit: "1,2,3" }
// 4. Only some selected - { selected: "1,2,3" }
export const getSelectionParams = (selection: RowSelection, allSelected: AllRowsSelected) => {
    const pick: string[] = []; // Manually picked/selected records by the user.
    const omit: string[] = []; //Manually deselected/omitted records by the user (after selecting all).
    Object.entries(selection).forEach(([key, value]) => (value ? pick.push(key) : omit.push(key)));

    if (allSelected === false && !pick.length) {
        // No records were picked/selected and there is no request to get all records.
        return undefined;
    } else {
        return {
            ...(omit.length && { omit: omit.join(',') }),
            ...(pick.length && { selected: pick.join(',') }),
        };
    }
};
