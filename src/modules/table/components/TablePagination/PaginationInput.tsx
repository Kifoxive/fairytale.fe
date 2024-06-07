import { useState } from 'react';
import { Input, InputProps } from 'modules/ui';

// Allows users to clear the input value (''), otherwise uses the "current" value.
// The table's state management requires the input value to be a number and does not allow
// setting it to an empty string ('') by default.
// Used to change current page index.
// Can also be used to change page size.

type PaginationInputProps = {
    current: number;
    setCurrent: (value: number) => void;
    min: number;
    max: number;
} & Pick<InputProps, 'id' | 'name'>;

export const PaginationInput = ({ current, setCurrent, min, max, ...props }: PaginationInputProps) => {
    const [noValue, setNoValue] = useState(false);

    const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.valueAsNumber;
        if (Number.isNaN(input)) {
            setNoValue(true);
        } else if (min <= input && input <= max) {
            setCurrent(input);
            setNoValue(false);
        }
    };

    return (
        <Input
            min={min}
            max={max}
            type="number"
            value={noValue ? '' : current}
            onChange={handleValueChange}
            {...props}
        />
    );
};
