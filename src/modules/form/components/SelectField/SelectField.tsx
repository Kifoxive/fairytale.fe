import { Controller } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { BaseFieldProps } from '../../types';

interface SelectFieldProps extends BaseFieldProps {
    options: { label: string; value: string | number }[];
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, options }) => {
    return (
        <Controller
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                    <FormControl>
                        <InputLabel id={name + '-label'}>{label}</InputLabel>
                        <Select
                            labelId={name + '-label'}
                            id={name}
                            value={value || null}
                            label={label}
                            onChange={onChange}
                            error={Boolean(error?.message)}
                        >
                            {options.map(({ label, value }) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            }}
        />
    );
};
