import { Controller } from 'react-hook-form';
import { BaseTextFieldProps, TextField as MuiTextField } from '@mui/material';

import { BaseFieldProps } from '../../types';

type TextFieldProps = {
    type?: 'text' | 'number';
} & BaseTextFieldProps &
    BaseFieldProps;

export const TextField: React.FC<TextFieldProps> = ({ name, label, type = 'text', ...props }) => {
    return (
        <Controller
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                    <MuiTextField
                        {...props}
                        type={type}
                        id={name}
                        label={label}
                        value={value}
                        onChange={(e) => onChange(type === 'number' ? e.target.value && Number(e.target.value) : e)}
                        name={name}
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                    />
                );
            }}
        />
    );
};
