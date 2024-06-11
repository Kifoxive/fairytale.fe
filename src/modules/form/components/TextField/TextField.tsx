import { Controller } from 'react-hook-form';
import { BaseTextFieldProps, CircularProgress, InputAdornment, TextField as MuiTextField } from '@mui/material';

import { BaseFieldProps } from '../../types';

type TextFieldProps = {
    type?: 'text' | 'number';
    isLoading?: boolean;
} & BaseTextFieldProps &
    BaseFieldProps;

export const TextField: React.FC<TextFieldProps> = ({ name, label, type = 'text', isLoading = false, ...props }) => {
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
                        margin="normal"
                        error={Boolean(error?.message)}
                        helperText={error?.message}
                        InputProps={{
                            endAdornment: isLoading && (
                                <InputAdornment position="end">
                                    <CircularProgress size={20} />
                                </InputAdornment>
                            ),
                        }}
                    />
                );
            }}
        />
    );
};
