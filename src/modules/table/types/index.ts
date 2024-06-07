import { CheckboxState } from 'modules/ui';

export type RowSelection = Record<string, boolean>;
export type AllRowsSelected = CheckboxState;
export type LastRowSelected = {
    id: string;
    index: number;
};
export type IsShiftHeld = boolean;
